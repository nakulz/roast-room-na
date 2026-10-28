---
name: roast-room
description: Use when a founder wants a hard business decision debated by a council of world-class operators, says "roast room", "put this in the Roast Room", "founder council", "convene the council", "take this to the board", "what would Hormozi, Bezos, or Buffett say", "should I do X", or can't make up their mind on pricing, hiring, raising money, a new product, a partnership, a pivot, an event, or spending. A board of sub-agents, each built from one expert's public work (Bezos, Paul Graham, Hormozi, Gary Vaynerchuk, Dan Martell, Gino Wickman, and Buffett out of the box, plus any seat added with /newroaster), argue it over three rounds, then a Chair returns a scored verdict, the reasoning, the dissent, and next steps. Also does a one-seat consult ("ask the Hormozi seat"). Not /roast (generic personas, idea validation).
argument-hint: "[the decision] [--quick] [--all] [--seats hormozi,buffett,...] | ask <seat> [question] | board | wait-what"
---

## What this does

The Roast Room: runs a board meeting on one decision. A board of seats (seven out of the box), one per business pillar, each a sub-agent that reasons and talks the way its expert does, grounded in a brain compiled from that person's videos, essays, letters, talks, and books as they teach them in public. The seats argue across three rounds: open, debate, vote. You act as the **Chair**: you never argue a side, you run the room, keep the score, and write the verdict.

Read once before the first run: `roster.json` (every seat and the default board), `references/seats.md` (picking the board, weights, tensions), `references/research.md` (the shared packet, the one trip, and the citation rules), `references/round-prompts.md` (what each seat gets), `references/scoring.md` (math and overrides), `references/report-template.md` (output), `references/live-room.md` (the small JSON files the visual room plays). A finished example council lives in `sessions/2026-10-09-example-take-the-seed/`.

## Modes

- **Full council** (default): a board recommended for this decision and confirmed by the user (see "Pick the board"), three rounds. For decisions that are expensive or hard to undo.
- **Quick** (`--quick`): four seats, recommended per "Pick the board" and `seats.md`, Rounds 1 and 2. Round 3 is skipped when the Round 2 spread on the top option is 3 or less and no seat is at `RUIN RISK: likely`. Research does not add a round. A shared packet only if the user asks. No seat trips. Skipping research is not permission to invent a current fact. For reversible calls.
- **Named seats** (`--seats a,b,c`): only those seats, three rounds. Any seat in `roster.json` can be named, on the default board or not.
- **Everyone** (`--all`): every seat in `roster.json`, up to nine.
- **Consult** (`ask <seat> ...`): one seat, one answer, using the single-seat prompt. No scoring, no session folder, no research packet, and no trip. Works for any seat in the roster.
- **Board settings** (`board`): show and change who sits at the table by default. See "Board settings" below. No council runs.
- **Simple verdict** (`/wait-what`): after a verdict exists, rewrite `verdict.md` in short sentences. Not a council, and not part of the run. See "Simple verdict" below.

## Pick the board

Who sits at the table comes from `roster.json`, in this order:

1. `--seats a,b,c` or `--all` on this run wins. No question. `--quick` then picks four from those seats.
2. Otherwise `"board"` in `roster.json` decides:
   - `"ask"` (out of the box): recommend a board for this decision and ask the user to confirm it (below).
   - `"auto"`: recommend a board the same way and seat it without asking. Say who and why in one line.
   - `"default"`: seat the `"default"` list. No question.
3. Never seat more than nine. Every seat at the table must have an agent file (`.claude/agents/council-<key>.md`) and a brain folder; skip and name any that do not.

### Recommend a board

Read the decision, then pick from every seat in `roster.json`:

- Every seat whose pillar the decision lives in or materially affects (the seats that would get weight 2 or 3).
- One seat that guards the downside (Buffett, or the roster's money, capital, or risk seat), whether or not it is on the default board.
- The seat most likely to disagree with the rest, so the council argues instead of agreeing.
- Leave out seats whose pillar barely touches the decision. Two seats with close pillars (Martell and Leila Hormozi on people, Hormozi and Codie Sanchez on deals) sit together only when they would disagree.
- Five to seven seats for a full council, four for `--quick`.

### Ask

Show the recommendation in chat first, as a short list: each recommended seat with one plain line on why it fits this decision, then one line naming the seats left out. Then ask with one AskUserQuestion question (header "Board"):

1. **Recommended board (Recommended)**: the names, in the description.
2. **Default board**: the `"default"` list, by name.
3. **Everyone**: every seat in the roster (only when there are nine or fewer; otherwise skip this option).

The user can pick "Other" and type names to swap in or out ("recommended, but add Naval and drop Wickman"). Seat what they chose. When Step 1 also needs to ask about missing facts, put the board question in the same AskUserQuestion call so the user answers once. If the user said "just run it", seat the recommended board without asking.

Tell the user who is at the table in one line when the council starts. The council starts when `council.json` is written. That file closes the baseline window: the shared packet plus any pre-Round-1 refinements, the same packet for every seat. `--seats`, `--all`, or `/roast-room board` change who sits.

## Step 1: The brief

The council is only as good as the brief. Build it from what the user gave you. If any of the first four items is missing, ask for them in one batch (AskUserQuestion, at most four questions), then proceed. If the user says "just run it", fill gaps with stated assumptions.

1. **The decision** in one line, and the options on the table as A, B, C. Always include "don't do it" (or "keep doing what you do now") and any alternative the founder mentioned. If the founder brought one idea, add the obvious smaller version as an option.
2. **The business**: what it sells, to whom, stage, monthly revenue, margin if known, team size.
3. **The resources**: cash or runway, founder hours, deadline.
4. **What success looks like** and the time horizon.
5. **Which way the founder is leaning, and why** (the council tests the lean, it does not echo it).

Context lookup: if this project holds notes about the founder's business (a `CLAUDE.md`, a `business.md`, or similar), read them for real numbers before asking.

Keep the brief under 300 words. Mark every assumption as `(assumed)`.

Seat the board (see "Pick the board"). Set a relevance weight per seat at the table (1 to 3) with a one-line reason, per `seats.md`. Create the session folder: `sessions/YYYY-MM-DD-<decision-slug>/` at the project root. Save `brief.md` (the brief, the options, and the weights table). Do not write `council.json` yet. Once `research/agenda.json` or `research/briefing.md` is saved, the room can show research in progress. Round 1 on the table still waits for `council.json`.

Then frame the research, per `references/research.md`. At most five questions. Each names the option or score it can change, and whether it is an observation or a forecast. Every option is covered. Show that list and the exact budgets in `research.md`. Wait for the user to approve them. "Just run it" seats the board and fills a thin brief. It does not approve the budgets, and it does not raise them.

Quick mode: skip the list unless the user asked for a shared packet. A consult has no agenda.

## Step 2: Shared packet

Skip this step when the user approved no items, or when quick mode has no packet.

Write `research/agenda.json` first, with the approved items and the budgets as approved. Then dispatch one researcher per item, or do the item yourself when no sub-agent can be spawned. Follow `references/research.md` for the caps, the ledger, and the note. When the notes are in, write `research/sources.json` and `research/briefing.md`. Opened records are the only citable ids. Mentioned and fetch-failed records have none. Forecasts stay labeled as forecasts. Do not update a brain. Do not write `council.json` or `cruxes.json` in this step.

The budgets recorded at approval are the caps. Six retrievals and 400 words of finding per item. A separate researcher stops at 10 turns. The sequential path has no researcher turns to cap. Twenty minutes for this pass is the user's watch. Nothing in this repo measures wall-clock.

## Step 3: Baseline refinements

Skip this step in quick mode, when there is no packet, and on a consult.

Spawn one short reply per seat, in one message, with the baseline request prompt. Each seat reads the shared packet and answers `GAP / RAISED BY / WOULD CHANGE` or `none`. A seat may question a finding, disagree without a search, or add one missing aspect. Save the replies under `## Baseline` in `research/requests.md`. They are not a round and they do not go in a round file. A `## <Seat>` heading or a `SEAT:` line in a round file plays as a card.

Gate the replies per `references/research.md`. Accept at most one item per seat. A disagreement with no search spends nothing. A named defect or one missing aspect can spend the trip. Reject duplicates, immaterial asks, bare distrust, and challenges that cite a brain instead of `sources.json`. A rejected reply is not replaced. The trip is not spent until you accept it.

Run each accepted trip under the same six retrievals and 400 words. Notes go in `research/followups/` with `Window: baseline`. Keep the original briefing text. Append a correction only when a challenge ended `corrected`. Share every result with every seat. A challenge can also end `confirmed` or `unresolved`. A gap trip ends `found`, or leaves the gap unknown. Do not label every result a correction.

The 10 minutes for intake plus follow-ups starts at this request pass. It covers the debate window too. It does not restart. Do not write `council.json` until this window is ready to close.

## Step 4: Freeze, then Round 1

Write `council.json` now (`live-room.md`). That file closes the baseline window. Unfinished trips are dropped: log them as still unknown before the file, and reject a late result. Round 1 reads only this frozen packet. Tell the user once: "Research is on the room as the packet lands. Round 1 starts when council.json lands. Watch it live at http://localhost:4730" (the room is optional and the council runs the same without it).

Spawn every seat in **one message**, in parallel, foreground (`run_in_background: false`), `subagent_type: council-<seat>`, with the Round 1 prompt. If a `council-*` type is not registered in this session, use `general-purpose` with the fallback lines from `round-prompts.md`. Every seat gets the same frozen packet. If there is no packet, say so in the prompt, and still do not invent a current fact.

When the cards come back, save them verbatim to `round-1.md`, one `## <Seat>` heading per card (the seat's `short` name from `roster.json`: Bezos, Graham, Hormozi, Gary V, and so on), and write the file right away so the room can start playing. Check each card has every field; send a card back once if it is missing scores or a stance. Then add a `## Chair notes` section at the bottom of `round-1.md`:

- The **cruxes**: the one to three underlying disagreements that explain why seats split (a factual question, a numbers question, or a values question such as speed versus safety), with the seats on each side.
- The **unanimity check** (`scoring.md`): if Round 1 converged, make the strongest unargued alternative a crux and name which seats must argue it at full strength.
- Any card that broke format or misread the brief.
- Any current-world claim the cited excerpt does not support, and any current-world claim with no research id and no category from `research.md` (assumption, inference, forecast, unknown, or user-supplied). Leave the card verbatim.

Do not write `cruxes.json` yet. A request does not go on a card and does not go in this file.

## Step 5: Debate refinements

Skip this step in quick mode, when there is no packet, and when every seat already spent its trip.

After `round-1.md` includes the Chair notes, spawn one short reply for each seat that did not spend its trip, in one message, with the debate request prompt. The gap has to come from another seat's Round 1 card. The same gate applies: a named defect or one new aspect. Bare disagreement spends nothing. Save the replies under `## Debate` in `research/requests.md`. They are not appended to `round-1.md`.

Run each accepted trip the same way. Notes go in `research/followups/` with `Window: debate`. Append the result for every seat. Round 2 and Round 3 read it. It does not reopen Round 1. Keep the original briefing text. Append a correction only when a challenge ended `corrected`. A challenge can also end `confirmed` or `unresolved`. A gap trip ends `found`, or leaves the gap unknown. Do not label every result a correction.

The 10 minutes already started at the baseline request pass. It does not restart. No recursive delegation, no replacement trip, and no second trip for a seat that already spent one. A separate researcher stops at 10 turns. Log a dropped trip, including a timeout or a late note, as still unknown. Reject a late result. The window is not reset.

## Step 6: Round 2, the draft, Round 3

Write `cruxes.json` now (`live-room.md`). Publishing it closes the debate window and starts the displayed Round 2. No research after this.

Spawn every seat again, in one message, with the Round 2 prompt (it points them at `brief.md`, `round-1.md`, and the final packet). Save the cards to `round-2.md` (same `## <Seat>` headings, written as soon as the cards are back) with `## Chair notes`: who moved and why, which cruxes resolved, which numbers are still open, the interim option scores, and any current-world claim that is still unsupported or uncited. Leave the cards verbatim.

Write `draft-resolution.md`: the recommendation (named option and verdict label), the conditions the seats asked for (merge duplicates, keep them checkable, pick one number when seats differ and say whose), the next steps with dates, the cheapest test, and kill criteria. Point the draft at the final packet. A current-world claim uses a category from `research.md`. Weigh arguments, not headcount: a single seat with a decisive fact beats three seats with vibes. Apply the overrides. Also write `draft.json` (`live-room.md`).

Spawn every seat with the Round 3 prompt. The prompt points at the same final packet. Save to `round-3.md` (same headings, written as soon as the cards are back), and add a `## Chair` section listing each amendment and whether it was adopted, with the reason. Adopt an amendment when no seat objects or the argument for it went unanswered; when seats conflict, adopt the better-argued side and put the other in the minority report. Do not run a fourth round. Research does not add a round.

Quick mode skips this round when the Round 2 spread on the top option is 3 or less and no seat is at `RUIN RISK: likely`.

## Step 7: Verify, then verdict

The support check happens before the next round, in the Chair notes of that round. This step is the pass over the finished prose, and the order is deliberate: the checkers scan the verdict itself. `verdict.json` is not published until that pass is done.

Write `verdict.md` as a decision memo, from `report-template.md`, with this lens every time:

- Fidelity first. Do not invent evidence, owners, dates, metrics, or consensus. Label an inference, a forecast, an assumption, a user-supplied line, and an unknown. A research id is not stronger than the source it cites.
- Lead with the decision in one sentence, then at most three supports. Keep every condition that would change the action. Keep the dissent.
- Each next step has an action, an owner, and a time. If the evidence cannot support a call, say what is unknown.
- Put the depth in the file. The chat verdict stays under 200 words: the label, the call, the scores, three reasons, the strongest objection, and at most three next steps.
- Separate a proposed threshold from a measurement. The label and the scores still come from `scoring.md`.

Do not run `/wait-what` in this step. Short sentences are a later request, not part of the council.

1. Compute the numbers from the last round's cards per `scoring.md`, apply the overrides, and write `verdict.md` from `report-template.md`. Include the evidence section. Forecasts stay separate from observations. The decision is one sentence and names the option. The supports are at most three, each a point a seat actually made. Do not pad the list. Each next step names the action, the owner, and the time. If the record has no owner or no time, write unknown. Do not invent one. In `verdict.json`, `when` is the time and `action` includes the owner.
2. Run `python .claude/skills/roast-room/scripts/check_quotes.py <session folder>` and `python .claude/skills/roast-room/scripts/check_research.py <session folder>` (try `python3` if `python` is missing). Both scan the completed session, including `verdict.md`. Remove any unverified brain quote from the verdict, and say so. Fix a research finding in the verdict: a missing id, a cite whose status is not opened, or a quote that does not match the record's excerpt. If Python is not installed, do not stop or ask the user to install it. Check each brain quote yourself by searching that seat's brain folder for the exact words, and check each research id and excerpt yourself against `research/sources.json` using the normalization in `check_quotes.py`.
3. Run both checkers again after you edit the verdict. A finding that remains in a card is a finding, not a failed council. Leave the card verbatim. Do not rewrite a card to make a checker green. `verdict.json` may land while a card finding is still printed.
4. Write `verdict.json` last (`live-room.md`). It repeats the checked verdict and adds no current-world claim the markdown does not already contain. It tells the room the council is over.
5. Show the user a short verdict in chat, not the full report: the label, the call, the option scores on one line, the three reasons (one line each, with the seat), the strongest objection (one line, with the seat), and at most three next steps. Then the path to `verdict.md` for the full detail, one line saying the branded PDF is one click away ("Download PDF" on the verdict at http://localhost:4730), and one line offering a follow-up with any seat or a rerun with new facts. Keep it under 200 words.

## Simple verdict

Do not run this during the council. Do not run it as part of Step 7. Run it only when the user says `/wait-what` or asks for a simple version of the verdict, and a `verdict.md` already exists.

Rewrite that `verdict.md` in place. Short sentences. Same facts. No new point. A hyphen, not an em dash. Leave the label, the scores, the conditions, and the dissent. If a sentence is already inside the limit, leave it.

- An instruction is 20 words or fewer. Instructions are the next steps, the conditions, the cheapest test, and the kill criteria.
- A description is 25 words or fewer. Descriptions are the decision, the supports, the fights, and the evidence lines.

Do not re-run the rounds. Do not write a new `verdict.json` for this rewrite. The scores do not change.

## Chair rules

- You never argue a side and never add your own pillar. If no seat raised an important point, put it to the closest seat as a crux in the next round instead of inserting it yourself.
- Quote seats faithfully. Never put words in a seat's mouth or rewrite a card.
- Seats speak in their expert's voice; your report is plain English that follows the house writing rules (no em dashes, no AI tells, no tee-ups).
- Treat a unanimous Round 1 as a warning, not a win.
- Cost: a full council with research is up to five sub-agent runs per seat (a baseline request, Round 1, a debate request, Round 2, Round 3), plus the researcher calls, which are capped by the agenda and the one-trip rule. A seat files the debate request only when it did not spend its trip on the baseline. Quick mode does not add a request reply or a seat trip. Use `--quick` for small calls, and say which mode you used.
- The seats are simulations built from public work. Never present a seat's line as something the real person said unless it is a verbatim quote with a source id from the brain.

## Board settings

`/roast-room board` (or "change my board", "who's on my board", "add Naval to my default board") edits `roster.json` and runs no council.

1. Show the roster in a short table: seat, pillar, on the default board or not. Then the current `"board"` setting in plain words ("the Chair recommends a board for each decision and asks you", "the Chair picks per decision without asking", or "every council seats your default board").
2. Ask what to change, with AskUserQuestion when the user has not already said: add or remove seats on the default board, or switch the setting between `ask`, `auto`, and `default`.
3. Edit `roster.json` in place: only the `"board"` and `"default"` fields. Keep the default board between one and nine seats, using keys that exist in `"seats"`. Never remove a seat from `"seats"` here; taking someone off the default board keeps them available for `--seats` and `ask`.
4. Confirm the new board in one line. The room picks it up on its next page load.

To add a brand new advisor, use `/newroaster`.

## Without sub-agents (Codex or a runtime that cannot spawn agents)

Run the same protocol sequentially yourself. Same files, same checkpoints. For the shared packet and for each accepted trip, do the retrieval yourself. There is no researcher turn cap on this path. The six retrievals, the 400-word finding, and the phase cutoff are the limit. Do not invent a second agent in the prose.

For each seat in Round 1, read `.claude/agents/council-<seat>.md` and its brain, write that seat's card, then clear your head before the next seat: do not let one seat's card shape the next one's in Round 1. Two request passes are the exception, and both go in `research/requests.md` as one short reply per seat. The baseline replies are written from the packet, before `council.json`, before any Round 1 card exists. The debate replies are written after `round-1.md` is complete, only for a seat that did not spend its trip, so a reply can answer another seat. Rounds 2 and 3 work with the prior cards and the same packet, including any debate refinement that landed.

## Files

- `brains/<slug>/`: one brain per seat (`_hot.md`, `frameworks.md`, `principles.md`, `positions.md`, `voice.md`, `stories.md`, `books.md`, `sources.md`).
- `references/research.md`: agenda, budgets, ledger, briefing, the two freezes, the one trip, claim categories, and the CDF pilot.
- `scripts/check_quotes.py`: verifies every attributed brain quote in a session against the brains.
- `scripts/check_research.py`: checks that every R/F id exists, that its status is opened, and that a quoted passage matches that record's excerpt. It does not decide whether the passage supports the claim.
- `roster.json`: every seat (key, name, pillar, the question it owns, scorecard dimension, color) and the default board. `/newroaster` adds seats; `/roast-room board` changes the board.
- Agents: `.claude/agents/council-<key>.md`, one per seat in the roster.
- The room app: `app/` (start at the project `README.md`).
