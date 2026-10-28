# Live room files

The Roast Room (a local web app on http://localhost:4730) watches the sessions folder and plays a council as its files appear: portraits talk one at a time, rebuttal arrows fly, votes land, and the verdict comes up. It reads the round files you already write, plus four small JSON files, plus the research folder. Write each JSON file at the moment listed, as plain JSON (no comments, no trailing commas). Seat names can be keys (`garyvee`) or display names (`Gary V`).

The room is optional. Write these files anyway; they cost a few lines and the council runs the same without the room.

## Order

| When | File |
|---|---|
| As soon as the agenda or the briefing is saved, and again as sources, requests, and follow-ups change. These files may appear before `council.json`. | `research/agenda.json`, `research/sources.json`, `research/briefing.md`, `research/requests.md`, `research/followups/`. The room plays a research beat from these files. Do not write `research.json`. |
| After the baseline window is closed (the shared packet plus any pre-Round-1 refinement that landed, or immediately when there is no packet). Publishing this file drops unfinished baseline trips and rejects a late baseline result. | `council.json` |
| Round 1 cards back, then the Chair notes in the same file | `round-1.md` (one `## <Seat>` heading per card, cards verbatim, `## Chair notes` last) |
| After the debate window closes. When no seat has a trip left, write this as soon as the Chair notes are in `round-1.md`. Publishing this file closes the debate window and starts the displayed Round 2. | `cruxes.json` |
| Round 2 cards back | `round-2.md` |
| With `draft-resolution.md` | `draft.json` (skip in quick mode when Round 3 is skipped) |
| Round 3 cards back | `round-3.md` |
| Last, after `verdict.md` and both checkers | `verdict.json` |

`council.json` is what starts the displayed Round 1. `cruxes.json` is what starts the displayed Round 2. Leave `cruxes.json` unwritten through the debate request pass and its follow-ups. A research file before `council.json` puts the room in "research in progress" instead of leaving it on Getting started. It does not start Round 1.

The Research tab shows the original packet, each request, and each shared refinement. While a round is on screen, the caption and the key points can show the finding that round is using. A debate refinement shows up for Rounds 2 and 3. It does not replay Round 1.

A `## <Seat>` heading or a `SEAT:` line inside a round file is a card, so a research request stays in `research/requests.md` and is not appended to `round-1.md`. The room reads `research/requests.md` as requests, not as speeches.

## Research beat

The watcher reads the research folder itself and emits one `research` event. It updates that same event in place as the files change, and a live room receives the new packet. The Chair does not write `research.json`.

The event looks like this:

```json
{
  "type": "research",
  "packet": {
    "status": "packet",
    "title": "What does the named system do today?",
    "items": [
      {
        "id": "Q1",
        "question": "What does the named system do today?",
        "kind": "observation",
        "changes": "the score on option A",
        "found": "The finding.",
        "unknown": "What a failed open left open.",
        "openedIds": ["R001"]
      }
    ],
    "sources": [],
    "requests": [
      { "seat": "Bezos", "window": "baseline", "gap": "The excerpt is dated 2022.", "raisedBy": "R001", "wouldChange": "the score on option A", "gate": "accepted" }
    ],
    "followups": [
      { "seat": "Bezos", "window": "baseline", "result": "corrected", "asked": "The date on R001.", "found": "The excerpt is dated 2022.", "unknown": "" }
    ],
    "corrections": "",
    "stillUnknown": ""
  }
}
```

`status` is `progress` while the agenda is in and the finding is not, `packet` once a finding is in, `requests` once a seat has replied, and `followups` once a refinement or a correction is in. `kind` is `observation` or `forecast`. `window` is `baseline` or `debate` when the file says so. `result` is `confirmed`, `corrected`, `unresolved`, `found`, or `dropped`. The original briefing sections stay in `items`. Appended corrections stay in `corrections` and in `followups`.

## council.json

```json
{
  "title": "Raise coaching price to $3,500",
  "decision": "Raise the price from $2,000 to $3,500, and for whom.",
  "mode": "full",
  "options": [
    { "id": "A", "label": "Raise to $3,500 for everyone now" },
    { "id": "B", "label": "Raise for new clients only" },
    { "id": "C", "label": "Keep $2,000" }
  ],
  "weights": {
    "hormozi": { "weight": 3, "reason": "Pricing is his pillar" },
    "buffett": { "weight": 2, "reason": "Cash risk of losing clients" }
  },
  "seats": ["bezos", "graham", "hormozi", "garyvee", "martell", "wickman", "buffett"],
  "brief": "Two or three sentences.",
  "assumptions": ["Close rate holds at 50% (assumed)"]
}
```

`mode` is `full` or `quick`. `seats` lists only the seats at the table. Give every seat at the table a weight (1 to 3). Option labels stay short: under 50 characters.

## cruxes.json

```json
{
  "cruxes": [
    {
      "question": "Is customer cash enough to fund the next two hires?",
      "sides": [
        { "position": "Yes, prepay covers it", "seats": ["Hormozi", "Martell"] },
        { "position": "No, prepay is pulled-forward revenue", "seats": ["Graham", "Bezos"] }
      ]
    }
  ],
  "unanimous": false,
  "note": "One plain sentence on what the room is fighting about."
}
```

One to three cruxes. Questions under 90 characters, positions under 50.

## draft.json

```json
{
  "option": "B",
  "label": "GO WITH CONDITIONS",
  "recommendation": "One or two sentences.",
  "conditions": ["Checkable condition"],
  "next_steps": ["Step with a date"],
  "cheapest_test": "One line.",
  "kill_criteria": "One line."
}
```

## verdict.json

```json
{
  "label": "GO WITH CONDITIONS",
  "call": "One or two sentences the founder can act on, naming the option.",
  "recommended": "B",
  "why": [
    { "point": "One line.", "seat": "Graham", "framework": "Startup = Growth" }
  ],
  "minority": { "seat": "Martell", "quote": "The seat's own words, copied from a card.", "would_have_to_be_true": "One line." },
  "next_steps": [ { "when": "This week", "action": "One line." } ],
  "kill_criteria": "One line.",
  "conditions": ["Checkable condition"],
  "fights": [ { "crux": "The question", "story": "Who was on each side, who moved, how it resolved." } ],
  "amendments": [ { "seat": "Buffett", "amendment": "One line.", "adopted": true, "reason": "One line." } ],
  "cheapest_test": "One line.",
  "revisit": "When and with what numbers.",
  "override_note": ""
}
```

`label` is one of GO, GO WITH CONDITIONS, RESHAPE, WAIT, DON'T DO IT. Put the three strongest arguments first in `why` and at most three `next_steps`; the room shows those up front and folds the rest under "Full detail". The room computes the option scores, confidence, and votes itself from the cards, so they are not in this file.
