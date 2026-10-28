// Reads the session research folder into the packet the room shows.
// The Chair does not write a separate research.json. These files are the source.
import fs from "node:fs";
import path from "node:path";

const readText = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };
const readJson = (p) => { const t = readText(p); if (!t) return null; try { return JSON.parse(t); } catch { return null; } };

const FIELD_RE = /^(Kind|Changes|Retrievals|Asked|Found|Still unknown|Unknown|Opened|Result|Seat|Window|GAP|RAISED BY|WOULD CHANGE|ASK)\s*:\s*(.*)$/i;
const FIELD_KEY = {
  kind: "kind", changes: "changes", retrievals: "retrievals", asked: "asked", found: "found",
  "still unknown": "unknown", unknown: "unknown", opened: "opened", result: "result", seat: "seat",
  window: "window", gap: "gap", "raised by": "raisedBy", "would change": "wouldChange", ask: "ask",
};

function parseFields(text) {
  const fields = {};
  let current = null;
  for (const line of String(text || "").split("\n")) {
    const m = line.match(FIELD_RE);
    if (m) {
      current = FIELD_KEY[m[1].toLowerCase()];
      fields[current] = m[2];
    } else if (current) {
      fields[current] += "\n" + line;
    }
  }
  for (const k of Object.keys(fields)) fields[k] = fields[k].trim();
  return fields;
}

function splitHeads(md, marks) {
  const re = marks === 3 ? /^(#{2,3})[ \t]+(.+)$/gm : /^(##)[ \t]+(.+)$/gm;
  const heads = [...String(md || "").matchAll(re)];
  return heads.map((h, i) => {
    const start = h.index + h[0].length;
    const end = i + 1 < heads.length ? heads[i + 1].index : md.length;
    return { title: h[2].trim(), body: md.slice(start, end).trim() };
  });
}

function idsIn(text) {
  return [...String(text || "").matchAll(/\b[RF]\d{3}\b/g)].map((m) => m[0]);
}

function windowName(text) {
  const t = String(text || "").trim().toLowerCase();
  if (t === "baseline" || t === "debate") return t;
  return "";
}

function kindName(text) {
  const t = String(text || "").trim().toLowerCase();
  if (t === "observation" || t === "forecast") return t;
  return t;
}

function newest(dir) {
  const times = [];
  const walk = (d, depth) => {
    let names;
    try { names = fs.readdirSync(d); } catch { return; }
    for (const n of names) {
      const p = path.join(d, n);
      let st;
      try { st = fs.statSync(p); } catch { continue; }
      times.push(st.mtimeMs);
      if (st.isDirectory() && depth < 2) walk(p, depth + 1);
    }
  };
  walk(dir, 0);
  return times.length ? Math.max(...times) : Date.now();
}

function parseBriefing(md) {
  const items = [];
  let corrections = "";
  let stillUnknown = "";
  if (!md) return { items, corrections, stillUnknown };
  const sections = splitHeads(md, 2);
  if (!sections.length && md.trim()) {
    items.push({ id: "", question: "Shared briefing", kind: "", changes: "", found: md.trim(), unknown: "", openedIds: idsIn(md), asked: "", retrievals: "" });
    return { items, corrections, stillUnknown };
  }
  for (const s of sections) {
    if (/^corrections$/i.test(s.title)) { corrections = s.body; continue; }
    if (/^still unknown$/i.test(s.title)) { stillUnknown = s.body; continue; }
    const idMatch = s.title.match(/^(Q\d+)\b\.?\s*(.*)$/i);
    const fields = parseFields(s.body);
    items.push({
      id: idMatch ? idMatch[1].toUpperCase() : "",
      question: (idMatch ? idMatch[2] : s.title).trim(),
      kind: kindName(fields.kind || ""),
      changes: fields.changes || "",
      found: fields.found || "",
      unknown: fields.unknown || "",
      openedIds: idsIn(fields.opened || ""),
      asked: fields.asked || "",
      retrievals: fields.retrievals || "",
    });
  }
  return { items, corrections, stillUnknown };
}

function agendaItems(agenda) {
  const list = Array.isArray(agenda?.items) ? agenda.items : [];
  return list.map((a) => ({
    id: String(a?.id || "").toUpperCase(),
    question: String(a?.question || "").trim(),
    kind: kindName(a?.kind || ""),
    changes: String(a?.changes || "").trim(),
    options: Array.isArray(a?.options) ? a.options.map((o) => String(o)) : [],
  }));
}

function mergeItems(fromAgenda, fromBrief) {
  const rows = new Map();
  const order = [];
  const put = (key, row) => {
    if (!rows.has(key)) order.push(key);
    rows.set(key, row);
  };
  fromAgenda.forEach((a, i) => {
    const key = a.id || `agenda-${i}`;
    put(key, { ...a, found: "", unknown: "", openedIds: [], asked: "", retrievals: "" });
  });
  fromBrief.forEach((b, i) => {
    const key = b.id && rows.has(b.id) ? b.id : (b.id || `brief-${i}`);
    const prev = rows.get(key);
    put(key, {
      id: b.id || prev?.id || "",
      question: b.question || prev?.question || "",
      kind: b.kind || prev?.kind || "",
      changes: b.changes || prev?.changes || "",
      options: prev?.options || [],
      found: b.found || "",
      unknown: b.unknown || "",
      openedIds: b.openedIds || [],
      asked: b.asked || "",
      retrievals: b.retrievals || "",
    });
  });
  return order.map((k) => rows.get(k));
}

function parseRequests(md) {
  if (!md) return [];
  const requests = [];
  const gates = [];
  let window = "";
  for (const s of splitHeads(md, 3)) {
    if (/^baseline$/i.test(s.title)) { window = "baseline"; continue; }
    if (/^debate$/i.test(s.title)) { window = "debate"; continue; }
    if (/^chair gate$/i.test(s.title)) {
      for (const line of s.body.split("\n")) {
        const t = line.replace(/^[-*]\s*/, "").trim();
        const m = t.match(/^([^:]+):\s*(accepted|rejected|none)\b\.?\s*(.*)$/i);
        if (m) gates.push({ window, seat: m[1].trim(), gate: m[2].toLowerCase(), note: (m[3] || "").trim() });
      }
      continue;
    }
    if (/^research requests$/i.test(s.title)) continue;
    const none = /^none\s*$/i.test(s.body.trim());
    const fields = none ? {} : parseFields(s.body);
    requests.push({
      seat: s.title,
      window,
      none,
      ask: none ? "none" : String(fields.ask || "").trim().toLowerCase(),
      gap: fields.gap || "",
      raisedBy: fields.raisedBy || "",
      wouldChange: fields.wouldChange || "",
      gate: none ? "none" : "",
      gateNote: "",
    });
  }
  for (const g of gates) {
    const sameWindow = requests.filter((r) => r.window === g.window && r.seat.toLowerCase() === g.seat.toLowerCase());
    const req = sameWindow[sameWindow.length - 1]
      || [...requests].reverse().find((r) => r.seat.toLowerCase() === g.seat.toLowerCase());
    if (req) { req.gate = g.gate; req.gateNote = g.note; }
  }
  return requests;
}

function parseFollowups(dir) {
  const folder = path.join(dir, "followups");
  let names = [];
  try { names = fs.readdirSync(folder).filter((n) => n.endsWith(".md")).sort(); } catch { return []; }
  return names.map((file) => {
    const fields = parseFields(readText(path.join(folder, file)) || "");
    return {
      file,
      seat: fields.seat || file.replace(/\.md$/i, "").split("-")[0],
      window: windowName(fields.window || ""),
      result: String(fields.result || "").trim().toLowerCase().split(/[^a-z]+/)[0] || "",
      asked: fields.asked || "",
      found: fields.found || "",
      unknown: fields.unknown || "",
      openedIds: idsIn(fields.opened || ""),
      retrievals: fields.retrievals || "",
    };
  });
}

function parseSources(dir) {
  const j = readJson(path.join(dir, "sources.json"));
  const records = Array.isArray(j?.records) ? j.records : (Array.isArray(j) ? j : []);
  return records.filter((r) => r && typeof r === "object").map((r) => ({
    id: r.id ? String(r.id) : "",
    status: String(r.status || ""),
    kind: kindName(r.kind || ""),
    item: String(r.item || ""),
    title: String(r.title || ""),
    locator: String(r.locator || ""),
    excerpt: String(r.excerpt || ""),
    claim: String(r.claim || ""),
    limits: String(r.limits || ""),
    note: String(r.note || ""),
  }));
}

/** The shared packet, or null when neither the agenda nor the briefing is on disk yet. */
export function readPacket(sessionDir) {
  const dir = path.join(sessionDir, "research");
  const hasAgenda = fs.existsSync(path.join(dir, "agenda.json"));
  const hasBriefing = fs.existsSync(path.join(dir, "briefing.md"));
  if (!hasAgenda && !hasBriefing) return null;
  const brief = parseBriefing(hasBriefing ? readText(path.join(dir, "briefing.md")) : "");
  const items = mergeItems(agendaItems(hasAgenda ? readJson(path.join(dir, "agenda.json")) : null), brief.items);
  const requests = parseRequests(readText(path.join(dir, "requests.md")));
  const followups = parseFollowups(dir);
  const sources = parseSources(dir);
  let status = "progress";
  if (items.some((it) => it.found)) status = "packet";
  if (requests.length) status = "requests";
  if (followups.length || brief.corrections) status = "followups";
  const title = (items.find((it) => it.question)?.question || "Research in progress").replace(/\s+/g, " ").trim().slice(0, 140);
  return {
    status, title, at: newest(dir), items, sources, requests, followups,
    corrections: brief.corrections, stillUnknown: brief.stillUnknown,
  };
}
