# Research

Current facts for a council live in the session packet. Brains are not updated. Seat tools stay Read, Grep, and Glob. The Chair dispatches every retrieval. A seat does not browse, and a seat does not spawn a researcher.

The packet is `research/agenda.json`, `research/sources.json`, and `research/briefing.md`, plus `research/requests.md` and `research/followups/` once those exist. It sits inside the session folder. The room does not read it. Do not write `research.json`. Do not change the watcher.

Retrieval is a Chair step or a researcher step. It does not go through the portrait script or the council API. Those stay loopback-only.

A consult has no packet and no trip. Quick mode has a shared packet only if the user asks, and it has no seat trips. Skipping research is not permission to invent a current fact.

## Budgets

Record these numbers in `agenda.json` when the user approves the agenda. They are the caps. They are not a starting point, and they are not raised at approval or mid-run. Fewer agenda items is allowed. A seventh retrieval is not.

- Six retrieval operations per item or trip. Each search, each failed fetch, each retry, and each document read counts as one. A failed open counts. A document you actually read counts once for that open, not a second time as a fetch of the same bytes.
- 400 words of finding per item or trip, checked against the written note. Count the words in the `Found` section that you save. Cut the note before saving it if it is over 400. Excerpts live in `sources.json` and are not a second finding.
- A turn cap of 10, only when a separate researcher agent exists. Tell that agent to stop at 10 turns. The sequential fallback has no researcher turns to cap. There the counters and the phase cutoff are the limit.
- 20 minutes for the shared pass, and 10 minutes for intake plus follow-ups. These are the user's own watch. Nothing in this repo measures wall-clock. Do not claim the other caps guarantee elapsed time.

An unused minute does not buy a retrieval, and an unused retrieval does not buy a minute. Late results are rejected. The window is not reset. Publishing `cruxes.json` closes the follow-up window. Intake, the request replies and the gate, counts against the 10 minutes.

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

Freeze means those original sections are not edited again. Round 1 reads this freeze. Later corrections are appended. They do not replace the section.

## Claim categories

Every current-world claim in a card, a follow-up, the draft, or the verdict is one of these:

- opened fact, cited with an `R###` or `F###` whose record is `opened` and whose `kind` is `observation`
- assumption
- inference
- forecast, including a cite of an opened record whose `kind` is `forecast`
- unknown
- user-supplied, meaning the brief said it

A brain `S###` cite is a line from that seat's public work. It does not prove a new fact about the world. It does not prove a new fact about CDF. A threshold the room proposes is not a measurement.

## Round 1

Publish `council.json` only after the packet is frozen, or immediately when there is no packet. Then run Round 1. Every seat gets the same packet. No seat gets a private source.

Save cards verbatim. Write the Chair notes, including the cruxes, at the bottom of `round-1.md`. Do not write `cruxes.json` yet. Do not put a request on a card.

Before a claim feeds the next round, read the cited excerpt and decide whether it supports the claim. Name an uncited current-world claim in the Chair notes. Leave the card as written. Do not invent a replacement score.

## Requests

When a full council has a packet, spawn one short reply per seat after `round-1.md` includes the Chair notes. The seat reads that file, including the Chair notes, and answers `GAP / RAISED BY / WOULD CHANGE` or `none`. Save the replies in `research/requests.md`. They are not a debate round and they do not rewrite a card.

`watch.mjs` `splitCards()` treats a `## <Seat>` heading or a `SEAT:` line in a round file as a card. A request inside `round-1.md` would play as a phantom speech. `research/requests.md` is ignored by the watcher. Do not append it to a round file.

```markdown
# Research requests

## Bezos
GAP: R001 calls the figure current, and the excerpt is dated 2022.
RAISED BY: Graham's Round 1 claim that the capability is already table stakes.
WOULD CHANGE: the score on option A.

## Graham
none

## Chair gate
- Bezos: accepted. One trip. Defect in R001, a wrong date, using the excerpt already in sources.json.
- Graham: none.
```

Reject a duplicate, an immaterial ask, bare distrust, and a challenge that cites a brain instead of `sources.json`. Immaterial means the packet already answers it, it cannot change a score or an objection, or the seat is only restating its pillar. Bare distrust is "I do not trust this" with no concrete defect. Each seat files one reply. A rejected reply is not replaced.

One accepted trip per seat. Quick mode accepts none.

A challenge spends that one trip. The seat names an opened id and a concrete defect, and points at material already in the packet. No browsing before the gate. The defect list is not closed. It includes a misquote, a wrong date, a scope or version mismatch, a conclusion the cited passage does not support, and a contradiction with another opened record in this session's `research/sources.json`. Brain text is not a defect source. A 2023 line from a seat's brain cannot overturn a current finding.

## Follow-ups

Run the accepted trips once, in parallel, under the same retrieval cap and the same word cap. No recursive delegation, no replacement trip, and no reset of the clock. A challenge trip re-checks the named records. It does not open a new topic. A gap trip looks up the gap the seat named. Neither trip returns a new question list.

Write `research/followups/<seat-key>-<slug>.md`:

```markdown
# Follow-up

Seat: Bezos
Retrievals: 2
Result: corrected
Asked: the gap or the challenged id and defect
Found:
At most 400 words.
Opened: F001
Still unknown: what this trip did not settle
```

A challenge ends `confirmed`, `corrected`, or `unresolved`. Do not label every result a correction. Append to `briefing.md` only when the result is `corrected`, under `## Corrections`, naming the seat, the original id, and any new `F###`. Leave the original section text as it was. There is no second pass on a correction.

A gap trip ends `found` or, if it established nothing, leaves the gap unknown. `found` is not a correction. The note stays in `followups/`. New opened records still get an `F###` in the ledger.

A trip that times out, arrives late, or never finishes is `dropped`. Log it as still unknown. Do not append a correction. A late note is rejected. The window is not reset.

```markdown
## Corrections

### R001, Bezos, corrected
The opened excerpt is dated 2022. The original section above is unchanged. (F001)

## Still unknown

- Ng's trip dropped. The gap is still unknown.
```

Every seat, including Round 3, then gets the same final packet: the original briefing, any corrections appended to it, `sources.json`, and every file in `research/followups/`.

## After the packet closes

Write `cruxes.json` only now. That publish closes the follow-up window. Round 2, the draft, and Round 3 use the final packet. No research after this. Round 3 is still skipped when the Round 2 spread on the top option is 3 or less and no seat is at `RUIN RISK: likely`. Research does not add a round.

The draft points at the packet. A current-world claim in the draft uses the categories above.

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

Run it on the sequential fallback, so that path is the run rather than a side note. The run also shows one failed retrieval (a `fetch-failed` record with no id), one timeout or dropped trip logged as still unknown, and one request caused by another seat's Round 1 card (`RAISED BY` names that seat).

The verdict says what CDF would still have to provide under the evidence. A different winner is not required. The checkers may report an expected finding on a planted bad cite. They must not be required to call the historical CDF cards clean.
