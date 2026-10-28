// Parser and watcher checks for the research beat. Run: node app/scripts/research-room.test.mjs
import fs from "node:fs";
import path from "node:path";
import { readPacket } from "../lib/research-packet.mjs";
import { getLive } from "../lib/watch.mjs";
import { SESSIONS_DIR } from "../lib/env.mjs";

let failed = 0;
function assert(cond, msg) {
  if (!cond) { failed += 1; console.error("FAIL", msg); }
}

const probe = path.join(SESSIONS_DIR, "2099-01-01-research-probe");
const plain = path.join(SESSIONS_DIR, "2099-01-02-plain-council");

function write(rel, text) {
  const p = path.join(probe, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text);
}

try {
  fs.rmSync(probe, { recursive: true, force: true });
  fs.rmSync(plain, { recursive: true, force: true });

  write("research/agenda.json", JSON.stringify({
    items: [{ id: "Q1", question: "What does the named system do today?", changes: "the score on option A", kind: "observation", options: ["A", "C"] }],
  }));
  let packet = readPacket(probe);
  assert(packet && packet.status === "progress", "agenda only is progress");
  assert(packet.items[0].kind === "observation", "agenda kind");
  assert(packet.items[0].found === "", "no finding yet");
  assert(packet.requests.length === 0 && packet.followups.length === 0, "no requests yet");

  let live = getLive("2099-01-01-research-probe");
  assert(live, "research folder is a live session before council.json");
  assert(live.events.some((e) => e.type === "phase" && e.phase === "research"), "research phase");
  assert(live.events.some((e) => e.type === "research"), "research event");
  assert(!live.events.some((e) => e.type === "round_start"), "Round 1 waits for council.json");
  assert(live.status === "running", "research session stays running");

  write("research/briefing.md", `# Shared briefing

## Q1. What does the named system do today?
Kind: observation
Changes: the score on option A
Retrievals: 4
Asked: the question as approved
Found:
Astra writes code for paying customers. The opened observation is (R001).
Still unknown: the price those customers pay
Opened: R001

## Corrections

### R001, Bezos, corrected
The opened excerpt is dated 2022. The original section above is unchanged. (F001)

## Still unknown

- Ng's trip dropped. The gap is still unknown.
`);
  write("research/sources.json", JSON.stringify({
    records: [
      { id: "R001", status: "opened", kind: "observation", item: "Q1", title: "Product page", locator: "https://example.com/report", excerpt: "Astra writes code for paying customers today.", claim: "What the product does.", limits: "Does not show the price." },
      { status: "fetch-failed", title: "Missing page", locator: "https://example.com/missing", note: "Failed open." },
    ],
  }));
  write("research/requests.md", `# Research requests

## Baseline

## Bezos
ASK: challenge
GAP: R001 calls the figure current, and the excerpt is dated 2022.
RAISED BY: the opened record R001.
WOULD CHANGE: the score on option A.

## Graham
none

## Chair gate
- Bezos: accepted. One trip. Defect in R001, a wrong date.
- Graham: none. Disagreement was not filed. The trip is not spent.

## Debate

## Hormozi
ASK: aspect
GAP: whether the named buyer already pays for this.
RAISED BY: Bezos's Round 1 claim that the buyer will not pay.
WOULD CHANGE: the score on option A.

## Chair gate
- Hormozi: accepted. One trip. The gap comes from Bezos's card.
`);
  write("research/followups/bezos-date.md", `# Follow-up

Seat: Bezos
Window: baseline
Retrievals: 2
Result: corrected
Asked: the date on R001
Found:
The opened excerpt is dated 2022.
Opened: F001
Still unknown: what this trip did not settle
`);
  write("research/followups/hormozi-buyer.md", `# Follow-up

Seat: Hormozi
Window: debate
Retrievals: 1
Result: found
Asked: whether the named buyer already pays
Found:
One named buyer pays an annual fee.
Opened: F002
Still unknown:
`);

  packet = readPacket(probe);
  assert(packet.status === "followups", "followups set the status");
  assert(packet.items.length === 1, "one question");
  assert(packet.items[0].kind === "observation", "briefing kind");
  assert(packet.items[0].found.includes("paying customers"), "found text");
  assert(!packet.items[0].found.includes("dated 2022"), "original section is not rewritten with the correction");
  assert(packet.items[0].openedIds.includes("R001"), "opened ids");
  assert(packet.items[0].unknown.includes("price"), "still unknown on the question");
  assert(packet.corrections.includes("dated 2022"), "corrections stay appended");
  assert(packet.stillUnknown.includes("Ng"), "session still unknown");
  const opened = packet.sources.filter((s) => s.status === "opened");
  assert(opened.length === 1 && opened[0].id === "R001", "opened source");
  assert(packet.sources.some((s) => s.status === "fetch-failed" && !s.id), "failed open has no id");
  const bezos = packet.requests.find((r) => r.seat === "Bezos");
  const graham = packet.requests.find((r) => r.seat === "Graham");
  const hormozi = packet.requests.find((r) => r.seat === "Hormozi");
  assert(bezos && bezos.window === "baseline" && bezos.gap.includes("2022") && bezos.gate === "accepted", "baseline request");
  assert(graham && graham.none && graham.gate === "none", "none request");
  assert(hormozi && hormozi.window === "debate" && hormozi.raisedBy.includes("Bezos") && hormozi.gate === "accepted", "debate request");
  const base = packet.followups.find((f) => f.window === "baseline");
  const debate = packet.followups.find((f) => f.window === "debate");
  assert(base && base.result === "corrected" && base.seat === "Bezos" && base.found.includes("2022"), "baseline refinement");
  assert(debate && debate.result === "found" && debate.seat === "Hormozi", "debate refinement");

  live = getLive("2099-01-01-research-probe");
  const researchEvents = live.events.filter((e) => e.type === "research");
  assert(researchEvents.length === 1, "one research event, updated in place");
  assert(researchEvents[0].packet.followups.length === 2, "live packet has both refinements");
  assert(!live.events.some((e) => e.type === "round_start"), "still no Round 1");

  write("council.json", JSON.stringify({
    title: "Probe", decision: "Probe the packet.", mode: "full",
    options: [{ id: "A", label: "Ship it" }, { id: "B", label: "Leave it" }],
    seats: ["bezos"], weights: { bezos: 1 },
  }));
  live = getLive("2099-01-01-research-probe");
  const types = live.events.map((e) => e.type);
  const researchAt = types.indexOf("research");
  const roundAt = types.indexOf("round_start");
  assert(researchAt >= 0 && roundAt > researchAt, "research plays before Round 1");
  assert(live.events.filter((e) => e.type === "round_start").every((e) => e.round === 1), "council.json starts Round 1 only");
  assert(!live.events.some((e) => e.type === "cruxes"), "cruxes.json still starts Round 2");
  assert(!live.events.some((e) => e.type === "seat_done"), "requests.md is not a speech");

  write("round-1.md", `## Bezos
SEAT: Bezos
STANCE: Yes
THE CALL: Ship it.
`);
  write("cruxes.json", JSON.stringify({
    cruxes: [{ question: "Does the buyer already pay?", sides: [{ position: "Yes", seats: ["Hormozi"] }, { position: "No", seats: ["Bezos"] }] }],
    unanimous: false, note: "The buyer.",
  }));
  live = getLive("2099-01-01-research-probe");
  assert(live.events.some((e) => e.type === "cruxes"), "cruxes event");
  assert(live.events.some((e) => e.type === "round_start" && e.round === 2), "cruxes.json starts Round 2");
  const spoken = live.events.filter((e) => e.type === "seat_done");
  assert(spoken.length === 1 && spoken[0].seat === "bezos", "only the round card is spoken");

  fs.mkdirSync(plain, { recursive: true });
  fs.writeFileSync(path.join(plain, "council.json"), JSON.stringify({
    title: "Plain", decision: "No research.", mode: "full",
    options: [{ id: "A", label: "Yes" }, { id: "B", label: "No" }],
    seats: ["bezos"], weights: { bezos: 1 },
  }));
  const plainLive = getLive("2099-01-02-plain-council");
  assert(plainLive && plainLive.events.some((e) => e.type === "round_start" && e.round === 1), "a council with no research still starts Round 1");
  assert(!plainLive.events.some((e) => e.type === "research"), "no research event without a packet");

  const oldDir = path.join(SESSIONS_DIR, "2099-01-03-old-requests");
  fs.rmSync(oldDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(oldDir, "research"), { recursive: true });
  fs.writeFileSync(path.join(oldDir, "research", "briefing.md"), "## Q2. Will buyers pay next year?\nKind: forecast\nFound:\nA forecast, not a measurement.\nStill unknown: the conversion rate\nOpened: R002\n");
  fs.writeFileSync(path.join(oldDir, "research", "requests.md"), "## Bezos\nGAP: the forecast has no range.\nRAISED BY: Graham's Round 1 claim.\nWOULD CHANGE: option B.\n\n## Chair gate\n- Bezos: rejected. Immaterial.\n");
  const old = readPacket(oldDir);
  assert(old.items[0].kind === "forecast", "forecast kind");
  assert(old.requests[0].window === "" && old.requests[0].gap.includes("range") && old.requests[0].gate === "rejected", "old request shape still parses");
  fs.rmSync(oldDir, { recursive: true, force: true });
} finally {
  fs.rmSync(probe, { recursive: true, force: true });
  fs.rmSync(plain, { recursive: true, force: true });
}

if (failed) {
  console.error(failed + " failed");
  process.exit(1);
}
console.log("research room checks passed");
