import { env } from "./env.mjs";

// Messages go only to a loopback ANTHROPIC_BASE_URL. https://api.anthropic.com is refused.
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const RETRY = new Set([429, 500, 502, 503, 529]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loopbackHost(hostname) {
  const host = String(hostname || "").toLowerCase().replace(/^\[|\]$/g, "");
  return LOOPBACK_HOSTS.has(host);
}

function assertLoopbackUrl(raw, what) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${what}: invalid URL`);
  }
  if ((url.protocol !== "http:" && url.protocol !== "https:") || !loopbackHost(url.hostname)) {
    const shown = url.hostname || url.protocol;
    throw new Error(`${what}: refusing non-local host "${shown}". Only localhost, 127.0.0.1, and ::1 are allowed.`);
  }
  return url;
}

function bare(value) {
  const v = String(value || "").trim();
  if (v.length >= 2 && ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'")))) return v.slice(1, -1).trim();
  return v;
}

function councilRunner() {
  return (process.env.COUNCIL_RUNNER || env("COUNCIL_RUNNER") || "viewer").toLowerCase() === "api" ? "api" : "viewer";
}

/** POST target: {ANTHROPIC_BASE_URL}/v1/messages, path prefix on the base kept. */
function messagesUrl() {
  const prefix = councilRunner() === "api" ? "COUNCIL_RUNNER=api: " : "";
  const base = bare(env("ANTHROPIC_BASE_URL"));
  if (!base) {
    throw new Error(`${prefix}ANTHROPIC_BASE_URL is not set. The messages API only talks to a loopback URL (http://127.0.0.1:<port>, http://localhost:<port>, or http://[::1]:<port>). https://api.anthropic.com is refused. There is no public fallback.`);
  }
  let root;
  try {
    root = assertLoopbackUrl(base, "ANTHROPIC_BASE_URL");
  } catch (err) {
    throw new Error(`${prefix}${err.message} https://api.anthropic.com is refused. There is no public fallback.`);
  }
  root.pathname = `${root.pathname.replace(/\/+$/, "")}/v1/messages`;
  root.search = "";
  root.hash = "";
  return root.href;
}

async function loopbackFetch(raw, options, what) {
  let current = assertLoopbackUrl(raw, what);
  let init = { ...options };
  for (let hop = 0; ; hop++) {
    const res = await globalThis.fetch(current.href, { ...init, redirect: "manual" });
    if (res.status < 300 || res.status >= 400) return res;
    if (hop >= 4) throw new Error(`${what}: too many redirects`);
    const loc = res.headers.get("location");
    if (res.body && typeof res.body.cancel === "function") {
      try { await res.body.cancel(); } catch { /* ignore */ }
    }
    if (!loc) throw new Error(`${what}: redirect missing Location`);
    try {
      current = assertLoopbackUrl(new URL(loc, current).href, `${what} redirect`);
    } catch (err) {
      throw new Error(`${err.message} https://api.anthropic.com is refused. There is no public fallback.`);
    }
    if (res.status !== 307 && res.status !== 308) {
      init = { ...init, method: "GET" };
      delete init.body;
    }
  }
}

// API mode fails closed at startup. Viewer does not call out from here.
if (councilRunner() === "api") messagesUrl();

function headers() {
  return {
    "x-api-key": env("ANTHROPIC_API_KEY"),
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  };
}

// Running token tally for the whole app, shown in the UI.
export const usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, calls: 0 };
function addUsage(u = {}) {
  usage.input += u.input_tokens || 0;
  usage.output += u.output_tokens || 0;
  usage.cacheRead += u.cache_read_input_tokens || 0;
  usage.cacheWrite += u.cache_creation_input_tokens || 0;
  usage.calls += 1;
}

/** Stream a message; calls onText(delta) as text arrives. Returns the full text. */
export async function stream({ model, system, messages, maxTokens = 2000, onText = () => {} }) {
  const endpoint = messagesUrl();
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await loopbackFetch(endpoint, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ model, system, messages, max_tokens: maxTokens, stream: true }),
    }, "messages API");
    if (RETRY.has(res.status)) { await sleep(Math.min(30000, 2000 * 2 ** attempt)); continue; }
    if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
    let text = "";
    let buf = "";
    const dec = new TextDecoder();
    const finalUsage = {};
    for await (const chunk of res.body) {
      buf += dec.decode(chunk, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (!line.startsWith("data:")) continue;
        let ev;
        try { ev = JSON.parse(line.slice(5)); } catch { continue; }
        if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
          text += ev.delta.text;
          onText(ev.delta.text);
        } else if (ev.type === "message_start") {
          Object.assign(finalUsage, ev.message?.usage || {});
        } else if (ev.type === "message_delta") {
          Object.assign(finalUsage, ev.usage || {});
        } else if (ev.type === "error") {
          throw new Error(`Anthropic stream error: ${JSON.stringify(ev.error).slice(0, 300)}`);
        }
      }
    }
    addUsage(finalUsage);
    return text;
  }
  throw new Error("Anthropic API kept refusing after retries");
}

/** One call with structured JSON output matching `schema`. */
export async function json({ model, system, prompt, schema, maxTokens = 4000 }) {
  const endpoint = messagesUrl();
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await loopbackFetch(endpoint, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        model, system, max_tokens: maxTokens,
        output_config: { format: { type: "json_schema", schema } },
        messages: [{ role: "user", content: prompt }],
      }),
    }, "messages API");
    if (RETRY.has(res.status)) { await sleep(Math.min(30000, 2000 * 2 ** attempt)); continue; }
    if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const j = await res.json();
    addUsage(j.usage);
    if (j.stop_reason === "max_tokens") throw new Error("Chair output hit max_tokens");
    return JSON.parse(j.content.map((b) => b.text || "").join(""));
  }
  throw new Error("Anthropic API kept refusing after retries");
}

// JSON schema helpers
export const S = {
  str: { type: "string" },
  num: { type: "number" },
  int: { type: "integer" },
  bool: { type: "boolean" },
  arr: (items) => ({ type: "array", items }),
  obj: (props) => ({ type: "object", properties: props, required: Object.keys(props), additionalProperties: false }),
  enum: (...v) => ({ type: "string", enum: v }),
};
