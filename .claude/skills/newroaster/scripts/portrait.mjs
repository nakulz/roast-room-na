#!/usr/bin/env node
// Make a new seat's cartoon portrait the same way the original seven were made: a real photo
// of the person plus a style reference (one of the existing cartoons) go to Seedream 5 Pro
// image-to-image, which returns a 3D animated-film bust on a green screen. Then three edits of
// the chosen bust give the talking frames (mouth open, mouth "oh", eyes closed).
// build_portraits.py turns those into the room's aligned, keyed frames.
//
//   node .claude/skills/newroaster/scripts/portrait.mjs photo  <dir> <image url or file>
//   node .claude/skills/newroaster/scripts/portrait.mjs base   <dir> "<who and what they wear>" [--n 2]
//   node .claude/skills/newroaster/scripts/portrait.mjs pick   <dir> <candidate number>
//   node .claude/skills/newroaster/scripts/portrait.mjs frames <dir>
//   node .claude/skills/newroaster/scripts/portrait.mjs probe
//
// <dir> is the seat's portrait folder, <build>/portrait/. It holds photo.jpg, cand1.png...,
// base.png, open.png, mid.png, and blink.png. Needs KIE_AI_API_KEY and KIE_AI_BASE_URL.
// KIE_AI_BASE_URL must be loopback (localhost, 127.0.0.1, or ::1). kie.ai and
// kieai.redpandaai.co are refused. A base candidate or edit costs a few credits there.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const STYLE_REF = path.join(HERE, "..", "assets", "style-reference.jpg");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function loopbackHost(hostname) {
  const host = String(hostname || "").toLowerCase().replace(/^\[|\]$/g, "");
  return LOOPBACK_HOSTS.has(host);
}

function policyError(message) {
  const err = new Error(message);
  err.policy = true;
  return err;
}

function assertLoopbackUrl(raw, what) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw policyError(`${what}: invalid URL`);
  }
  if ((url.protocol !== "http:" && url.protocol !== "https:") || !loopbackHost(url.hostname)) {
    const shown = url.hostname || url.protocol;
    throw policyError(`${what}: refusing non-local host "${shown}". Only localhost, 127.0.0.1, and ::1 are allowed.`);
  }
  return url;
}

function bare(value) {
  const v = String(value || "").trim();
  if (v.length >= 2 && ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'")))) return v.slice(1, -1).trim();
  return v;
}

function fromEnv(name) {
  if (process.env[name] && process.env[name].trim()) return process.env[name].trim();
  const re = new RegExp(`^\\s*${name}\\s*=\\s*["']?([^"'\\r\\n]+)`, "m");
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    const p = path.join(dir, ".env");
    if (fs.existsSync(p)) {
      const m = fs.readFileSync(p, "utf8").match(re);
      if (m && m[1].trim()) return m[1].trim();
    }
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  return "";
}

async function loopbackFetch(raw, options = {}, what = "request") {
  let current = assertLoopbackUrl(raw, what);
  let init = { ...options };
  for (let hop = 0; ; hop++) {
    const res = await globalThis.fetch(current.href, { ...init, redirect: "manual" });
    if (res.status < 300 || res.status >= 400) return res;
    if (hop >= 4) throw policyError(`${what}: too many redirects`);
    const loc = res.headers.get("location");
    if (res.body && typeof res.body.cancel === "function") {
      try { await res.body.cancel(); } catch { /* ignore */ }
    }
    if (!loc) throw policyError(`${what}: redirect missing Location`);
    current = assertLoopbackUrl(new URL(loc, current).href, `${what} redirect`);
    if (res.status !== 307 && res.status !== 308) {
      init = { ...init, method: "GET" };
      delete init.body;
    }
  }
}

let cachedBase;
function kieBase() {
  if (cachedBase) return cachedBase;
  const raw = bare(fromEnv("KIE_AI_BASE_URL"));
  if (!raw) {
    throw policyError("KIE_AI_BASE_URL is not set. Portrait upload, jobs, the credit probe, and result downloads only talk to a loopback URL (http://127.0.0.1:<port>, http://localhost:<port>, or http://[::1]:<port>). kie.ai and kieai.redpandaai.co are refused. There is no public fallback.");
  }
  try {
    cachedBase = assertLoopbackUrl(raw, "KIE_AI_BASE_URL");
  } catch (err) {
    throw policyError(`${err.message} kie.ai and kieai.redpandaai.co are refused. There is no public fallback.`);
  }
  return cachedBase;
}

function kieUrl(suffix) {
  const base = new URL(kieBase().href);
  const q = suffix.indexOf("?");
  const pathPart = q === -1 ? suffix : suffix.slice(0, q);
  const search = q === -1 ? "" : suffix.slice(q);
  const rel = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  base.pathname = `${base.pathname.replace(/\/+$/, "")}${rel}`;
  base.search = search;
  base.hash = "";
  return assertLoopbackUrl(base.href, "KIE_AI_BASE_URL").href;
}

// The exact prompts the original seven were built with. Change them and new seats stop matching.
const STYLE = "Turn the real person in the first image into a stylized 3D animated-film cartoon caricature drawn in exactly the same art style, rendering, lighting, and framing as the cartoon in the second image: head and upper chest bust, facing the camera straight on, centered, eyes looking at the viewer, mouth closed in a relaxed friendly smile. Keep the real person's likeness from the first image exactly: face shape, nose, eyes, eyebrows, hairline, and facial hair. Plain flat solid pure green (#00ff00) background, nothing else in the frame, no text except on the clothing.";
const KEEP = "Keep everything else exactly identical: same character, same face, same head position and size, same pose, same clothes, same lighting, same framing, same green background.";
const EDITS = {
  open: `Edit this image: the character is mid-sentence talking, mouth open wide in an 'ah' shape, teeth and tongue visible. ${KEEP} Only the mouth changes.`,
  mid: `Edit this image: the character is talking, mouth half open saying 'oh', lips slightly rounded. ${KEEP} Only the mouth changes.`,
  blink: `Edit this image: the character blinks, both eyes fully closed with relaxed eyelids. ${KEEP} Only the eyes change.`,
};

function key() {
  const k = bare(fromEnv("KIE_AI_API_KEY"));
  if (k) return k;
  console.error("portrait: no KIE_AI_API_KEY. Add KIE_AI_API_KEY to the project .env. It is sent only to the loopback KIE_AI_BASE_URL.");
  process.exit(3);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let H;

async function upload(file) {
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
  const r = await loopbackFetch(kieUrl("/api/file-base64-upload"), {
    method: "POST", headers: H,
    body: JSON.stringify({ base64Data: `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`, uploadPath: "roast-room", fileName: path.basename(file) }),
  }, "upload");
  const j = await r.json();
  const rawUrl = j?.data?.downloadUrl || j?.data?.fileUrl || j?.data?.url;
  if (!rawUrl) throw new Error("upload failed: " + JSON.stringify(j));
  const absolute = new URL(rawUrl, kieBase().href);
  assertLoopbackUrl(absolute.href, "upload response");
  return absolute.href;
}

/** One Seedream 5 Pro image-to-image job, saved to `out`. */
async function still(prompt, refs, out) {
  const image_urls = await Promise.all(refs.map(upload));
  const r = await loopbackFetch(kieUrl("/api/v1/jobs/createTask"), {
    method: "POST", headers: H,
    body: JSON.stringify({ model: "seedream/5-pro-image-to-image", input: { prompt, image_urls, aspect_ratio: "1:1", quality: "high", output_format: "png", nsfw_checker: false } }),
  }, "create task");
  const j = await r.json();
  const id = j?.data?.taskId;
  if (!id) throw new Error(`createTask: ${JSON.stringify(j)}`);
  const t0 = Date.now();
  for (let delay = 4000; ; delay = Math.min(delay * 1.25, 15000)) {
    if (Date.now() - t0 > 15 * 60 * 1000) throw new Error(`${path.basename(out)}: timed out`);
    await sleep(delay);
    const d = (await (await loopbackFetch(kieUrl(`/api/v1/jobs/recordInfo?taskId=${id}`), { headers: H }, "record poll")).json())?.data || {};
    const state = d.state || d.status;
    if (state === "fail" || state === "failed") throw new Error(`${path.basename(out)}: ${d.failMsg || d.failCode || "failed"}`);
    if (state !== "success") continue;
    let res = d.resultJson;
    if (typeof res === "string") res = JSON.parse(res);
    const raw = (res?.resultUrls || res?.urls || [])[0];
    if (!raw) throw new Error(`${path.basename(out)}: no result url`);
    const absolute = new URL(raw, kieBase().href);
    const img = await loopbackFetch(absolute.href, {}, `${path.basename(out)} result`);
    fs.writeFileSync(out, Buffer.from(await img.arrayBuffer()));
    return out;
  }
}

/** Run jobs in parallel; a failed job is retried once. */
async function all(jobs) {
  const results = await Promise.allSettled(jobs.map(async ([prompt, refs, out]) => {
    try { return await still(prompt, refs, out); } catch (e) {
      if (e.policy) throw e;
      console.error(`retrying ${path.basename(out)} (${e.message})`);
      return still(prompt, refs, out);
    }
  }));
  for (const r of results) console.log(r.status === "fulfilled" ? `ok     ${r.value}` : `fail   ${r.reason.message}`);
  if (results.some((r) => r.status === "rejected")) process.exitCode = 1;
}

const [cmd, dirArg, arg, ...rest] = process.argv.slice(2);
const dir = dirArg && path.resolve(dirArg);
const need = (f) => { if (!fs.existsSync(f)) { console.error(`portrait: missing ${f}`); process.exit(2); } return f; };

try {
  if (cmd === "photo") {
    if (!arg) throw new Error("usage: portrait.mjs photo <dir> <image url or file>");
    if (/^https?:/i.test(arg)) assertLoopbackUrl(arg, "photo download");
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, "photo.jpg");
    if (/^https?:/i.test(arg)) {
      const r = await loopbackFetch(arg, { headers: { "user-agent": UA } }, "photo download");
      if (!r.ok) throw new Error(`download ${r.status}`);
      fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
    } else fs.copyFileSync(arg, out);
    fs.writeFileSync(path.join(dir, "photo-source.txt"), arg + "\n");
    console.log(`saved ${out}. Look at it before going on: one real person, face clear and toward the camera.`);
  } else if (cmd === "probe") {
    const creditUrl = kieUrl("/api/v1/chat/credit");
    H = { "Content-Type": "application/json", Authorization: `Bearer ${key()}` };
    console.log("credit:", (await (await loopbackFetch(creditUrl, { headers: H }, "credit probe")).json()).data);
  } else if (cmd === "base") {
    if (!arg) throw new Error('usage: portrait.mjs base <dir> "<who and what they wear>" [--n 2]');
    kieBase();
    H = { "Content-Type": "application/json", Authorization: `Bearer ${key()}` };
    const n = Number(rest[rest.indexOf("--n") + 1]) || 2;
    const refs = [need(path.join(dir, "photo.jpg")), need(STYLE_REF)];
    await all(Array.from({ length: n }, (_, i) => [`${STYLE} Person: ${arg}`, refs, path.join(dir, `cand${i + 1}.png`)]));
  } else if (cmd === "pick") {
    fs.copyFileSync(need(path.join(dir, `cand${arg}.png`)), path.join(dir, "base.png"));
    console.log(`base.png = cand${arg}.png`);
  } else if (cmd === "frames") {
    kieBase();
    H = { "Content-Type": "application/json", Authorization: `Bearer ${key()}` };
    const base = need(path.join(dir, "base.png"));
    await all(Object.entries(EDITS).map(([shape, prompt]) => [prompt, [base], path.join(dir, `${shape}.png`)]));
  } else {
    console.error("usage: portrait.mjs photo|base|pick|frames <dir> ... | probe");
    process.exit(1);
  }
} catch (e) {
  if (e.policy) {
    console.error(`portrait: ${e.message}`);
    process.exit(3);
  }
  throw e;
}
