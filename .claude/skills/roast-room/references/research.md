# Research

Current facts for a council live in the session packet. Brains are not updated. Seat tools stay Read, Grep, and Glob. The Chair dispatches every retrieval. A seat does not browse, and a seat does not spawn a researcher.

The packet is `research/agenda.json`, `research/sources.json`, and `research/briefing.md`, plus `research/requests.md` and `research/followups/` once those exist. It sits inside the session folder. The room reads this folder and can show it before `council.json`. Round 1 on the table starts when `council.json` is written. Round 2 starts when `cruxes.json` is written. Do not write `research.json`. The watcher turns these files into the research beat in `live-room.md`.

Retrieval is a Chair step or a researcher step. It does not go through the portrait script or the council API. Those stay loopback-only.

A consult has no packet and no trip. Quick mode has a shared packet only if the user asks, and it has no seat trips. Skipping research is not permission to invent a current fact.

## Budgets

Record these numbers in `agenda.json` when the user approves the agenda. They are the caps. They are not a starting point, and they are not raised at approval or mid-run. Fewer agenda items is allowed. A seventh retrieval is not.

- Six retrieval operations per item or trip. Each search, each failed fetch, each retry, and each document read counts as one. A failed open counts. A document you actually read counts once for that open, not a second time as a fetch of the same bytes.
- 400 words of finding per item or trip, checked against the written note. Count the words in the `Found` section that you save. Cut the note before saving it if it is over 400. Excerpts live in `sources.json` and are not a second finding.
- A turn cap of 10, only when a separate researcher agent exists. Tell that agent to stop at 10 turns. The sequential fallback has no researcher turns to cap. There the counters and the phase cutoff are the limit.
- 20 minutes for the shared pass, and 10 minutes for intake plus follow-ups across both windows below. These are the user's own watch. Nothing in this repo measures wall-clock. Do not claim the other caps guarantee elapsed time. The minutes stay a target. They are not raised, and the debate window does not get its own 10 minutes.

An unused minute does not buy a retrieval, and an unused retrieval does not buy a minute. A minute left after the baseline window does not buy a second trip. Late results are rejected. Neither window is reset. Publishing `council.json` closes the baseline window. Publishing `cruxes.json` closes the debate window. Intake, the request replies and the gate, counts against the 10 minutes, and that clock starts at the baseline request pass.

## Agenda

Draft at most five questions from the decision. Each question names the option or score it can change, and whether it is an observation or a forecast. Every option in the brief is covered by at least one question. A topic that cannot change an option or a score is out.

Show the list and the budgets above. Wait for approval. Write `research/agenda.json` before any retrieval, and do not edit the budgets again.

```json
{
  "budgets": {
    "retrievals_per_item_or_trip": 6,
    "finding_words": 400,
    "researcher_turns": 10,
    "shared_pass_minutes": 20,
    "intake_and_followups_minutes": 10,
    "minutes_are": "the user's watch; this repo does not measure wall-clock"
  },
  "items": [
    {
      "id": "Q1",
      "question": "What does the named system do today?",
      "changes": "the score on option A",
      "kind": "observation",
      "options": ["A", "C"]
    }
  ]
}
```

`kind` is `observation` or `forecast`. An observation can be frozen as a finding. A forecast is scenarios, assumptions, and a range. It is not stored as something that already happened.

If the user approves no items, write no packet. Publish `council.json` and run the rounds. Seats still do not invent a current fact.

## Shared packet

One researcher per approved item, in parallel, or the Chair does the item when no sub-agent can be spawned. One item does not spawn further agents.

The researcher gets one item, the six retrievals, the 400 words, and the turn cap when it is a separate agent. It returns a note. It does not return a new question list. It does not edit a brain, `council.json`, or `cruxes.json`.

Write the three files before Round 1:

- `research/agenda.json` as approved.
- `research/sources.json`, the only ledger of research ids.
- `research/briefing.md`, one section per item.

Opened records are the only citable ids. `R###` is a shared-packet id. `F###` is a follow-up id. Both live in the same ledger. Mentioned and fetch-failed records have no id.

```json
{
  "records": [
    {
      "id": "R001",
      "status": "opened",
      "kind": "observation",
      "item": "Q1",
      "title": "Page title",
      "locator": "https://example.com/report#section",
      "excerpt": "The verbatim passage that was read.",
      "claim": "What this passage is used for.",
      "limits": "What this passage does not show."
    },
    {
      "status": "mentioned-only",
      "title": "Search hit that was not opened",
      "locator": "https://example.com/other",
      "note": "Seen on a results page. Not opened."
    },
    {
      "status": "fetch-failed",
      "title": "Page that did not open",
      "locator": "https://example.com/missing",
      "note": "Failed open. The fact stays unknown."
    }
  ]
}
```

`status` is `opened`, `mentioned-only`, or `fetch-failed`. An opened record has an id, a verbatim `excerpt`, and a `kind` of `observation` or `forecast`. A mentioned-only or fetch-failed record has no `id`. A snippet, a search hit, or a failed fetch is not opened. Failed fetches stay unknown.

`briefing.md` uses this shape:

```markdown
# Shared briefing

## Q1. What does the named system do today?
Kind: observation
Changes: the score on option A
Retrievals: 4
Asked: the question as approved
Found:
The finding, at most 400 words. An opened observation is cited as (R001). A forecast is labeled a forecast and cites its record the same way.
Still unknown: what a failed open or an unread source left open
Opened: R001
```

The original sections stay as written. Baseline refinements are appended before `council.json`. Round 1 reads that freeze. Debate refinements are appended after Round 1, for Rounds 2 and 3. They do not replace the section and they do not reopen Round 1.

## Claim categories

Every current-world claim in a card, a follow-up, the draft, or the verdict is one of these:

- opened fact, cited with an `R###` or `F###` whose record is `opened` and whose `kind` is `observation`
- assumption
- inference
- forecast, including a cite of an opened record whose `kind` is `forecast`
- unknown
- user-supplied, meaning the brief said it

A brain `S###` cite is a line from that seat's public work. It does not prove a new fact about the world. It does not prove a new fact about CDF. A threshold the room proposes is not a measurement.

## Two freezes

One trip per seat, total. A seat may spend it in the baseline window or in the debate window, not both. The ceiling is unchanged: six retrievals, 400 words, and a turn cap of 10 when a separate researcher exists.

`watch.mjs` `splitCards()` treats a `## <Seat>` heading or a `SEAT:` line in a round file as a card. A request inside a round file would play as a phantom speech. Save requests in `research/requests.md`. The room reads that file as requests. It does not play them as speeches.

### Baseline, closed by council.json

After the shared packet is written, and before Round 1, each seat may question a finding, disagree without a search, or add one missing aspect, or none. Spawn one short reply per seat. Save it under `## Baseline` in `research/requests.md`.

The Chair accepts at most one item per seat. A disagreement with no search spends nothing. A named defect, or one missing aspect, can spend the trip. Reject a duplicate, an immaterial ask, bare distrust, and a challenge that cites a brain instead of `sources.json`. Immaterial means the packet already answers it, it cannot change a score or an objection, or the seat is only restating its pillar. Bare distrust is "I do not trust this" with no concrete defect. A rejected reply is not replaced. The trip is not spent until the Chair accepts it.

Run each accepted trip once, in parallel, under the same caps. No recursive delegation and no replacement trip. Write `research/followups/<seat-key>-<slug>.md` with `Window: baseline`. Append the result for every seat. The original briefing sections stay as written. Append under `## Corrections` only when a challenge ended `corrected`.

A challenge ends `confirmed`, `corrected`, or `unresolved`. Do not label every result a correction. A gap trip ends `found`, or leaves the gap unknown. `found` is not a correction. The note stays in `followups/`. New opened records still get an `F###`.

Publishing `council.json` closes this window. Before that file, log any accepted trip that has not come back as `dropped` and still unknown. A late result is rejected. Round 1 does not read it. Round 1 reads only the frozen packet: the original briefing, the baseline refinements that landed, and the ledger.

### Round 1

Publish `council.json` only after the baseline window is closed, or immediately when there is no packet. Then run Round 1. Every seat gets that same frozen packet. No seat gets a private source. This does not reopen the baseline window.

Save cards verbatim. Write the Chair notes, including the cruxes, at the bottom of `round-1.md`. Do not write `cruxes.json` yet. Do not put a request on a card.

Before a claim feeds the next round, read the cited excerpt and decide whether it supports the claim. Name an uncited current-world claim in the Chair notes. Leave the card as written. Do not invent a replacement score.

### Debate, closed by cruxes.json

A factual gap born from another seat's Round 1 card can still be fetched, and only by a seat that did not spend its trip on the baseline. This pass happens after the Chair notes name the cruxes, and before `cruxes.json`. The same gate applies: a named defect or one new aspect. Bare disagreement spends nothing. `RAISED BY` names the other seat's card.

Save those replies under `## Debate` in `research/requests.md`. Run an accepted trip the same way, with `Window: debate` on the note. Append the result for every seat. Round 2 and Round 3 read it. It does not reopen Round 1, and it does not rewrite the original briefing. Append under `## Corrections` only when the result is `corrected`.

The 10 minutes already started at the baseline request pass. It does not restart. A seat that spent its trip on the baseline does not get a second one. Quick mode accepts none in either window.

A challenge names an opened id and a concrete defect, and points at material already in the packet. No browsing before the gate. The defect list is not closed. It includes a misquote, a wrong date, a scope or version mismatch, a conclusion the cited passage does not support, and a contradiction with another opened record in this session's `research/sources.json`. Brain text is not a defect source. A line from a seat's brain cannot overturn a current finding.

A trip that times out, arrives late, or never finishes is `dropped`. Log it as still unknown. Do not append a correction. A late note is rejected. The window is not reset.

```markdown
# Research requests

## Baseline

## Bezos
ASK: challenge
GAP: R001 calls the figure current, and the excerpt is dated 2022.
RAISED BY: the opened record R001.
WOULD CHANGE: the score on option A.

## Graham
ASK: disagree
GAP: the finding treats a forecast as if it had already happened.
RAISED BY: Q1.
WOULD CHANGE: nothing until a fact moves it.

## Chair gate
- Bezos: accepted. One trip. Defect in R001, a wrong date, using the excerpt already in sources.json.
- Graham: none. Disagreement with no search. The trip is not spent.

## Debate

## Hormozi
ASK: aspect
GAP: whether the named buyer already pays for this.
RAISED BY: Bezos's Round 1 claim that the buyer will not pay.
WOULD CHANGE: the score on option A.

## Chair gate
- Hormozi: accepted. One trip. The gap comes from Bezos's card. Hormozi did not spend the baseline trip.
```

`ASK` is `challenge`, `aspect`, `disagree`, or `none`. Only `challenge` and `aspect` can be accepted. `disagree` and `none` spend nothing.

```markdown
# Follow-up

Seat: Bezos
Window: baseline
Retrievals: 2
Result: corrected
Asked: the gap or the challenged id and defect
Found:
At most 400 words.
Opened: F001
Still unknown: what this trip did not settle
```

`Window` is `baseline` or `debate`. A debate note uses the same shape.

```markdown
## Corrections

### R001, Bezos, corrected
The opened excerpt is dated 2022. The original section above is unchanged. (F001)

## Still unknown

- Ng's trip dropped. The gap is still unknown.
```

## After the debate window closes

Write `cruxes.json` only now. That publish closes the debate window and starts the displayed Round 2. Round 2, the draft, and Round 3 use the frozen baseline packet plus any debate refinements that landed. No research after this. Round 3 is still skipped when the Round 2 spread on the top option is 3 or less and no seat is at `RUIN RISK: likely`. Research does not add a round.

The draft points at that packet. A current-world claim in the draft uses the categories above.

## Checker

`scripts/check_research.py` checks three things. An `R###` or `F###` id exists in `research/sources.json`. That record's status is `opened`. Any quoted research text attributed to the id matches that record's `excerpt` under `norm` in `scripts/check_quotes.py` (the quote window is the same one that script already uses: 20 to 400 characters, at least 6 words after normalization).

That catches a missing id, a cite that is not opened, and a misquote. It does not return truth. It does not judge support. It does not flag an uncited sentence. It does not check a brain `S###` id. It does not treat a user-supplied line as an opened fact.

The Chair still checks that the passage supports the claim, and still names uncited current-world claims in the Chair notes. Cards are not rewritten to make a checker green. An invalid citation is a finding, not a failed council. Fix the verdict text before `verdict.json`. A finding that remains in a card stays in the card.

Run it after `verdict.md` exists:

```bash
python .claude/skills/roast-room/scripts/check_research.py <session folder>
```

`check_quotes.py` still checks `S###` against the brains. Do not point it at `sources.json`.

## Pilot

The first run of this layer is a new session and a new brief. Do not reuse `sessions/2026-10-26-cdf-next/`, and do not edit its cards. Options include no dedicated CDF, a narrower capability, and a broader platform.

Run it on the sequential fallback, so that path is the run rather than a side note. The run also shows one failed retrieval (a `fetch-failed` record with no id), one timeout or dropped trip logged as still unknown, and one debate-window request caused by another seat's Round 1 card (`RAISED BY` names that seat). That request comes from a seat that did not spend its one trip on the baseline. A different seat may spend its trip before Round 1. The same seat does not spend the trip in both windows.

The verdict says what CDF would still have to provide under the evidence. A different winner is not required. The checkers may report an expected finding on a planted bad cite. They must not be required to call the historical CDF cards clean.
