---
cursor:
  subagentId: "bc-7cf641cc-fd1a-5c7a-bfe3-5ecfeff92c2d"
---

# Roast Room handoff: seats and brains

Written 2026-10-26 for the agent who will judge existing seats and refine or add persona brains. This file is notes. It does not change the repo.

Checkout read for the rules: `/workspace` on `main` at `8e9ceca` (`Lock Anthropic and portrait calls to loopback`), parent `2f521eb` (`Add Cagan, Ng, Munger, Doshi, and Jensen as on-call advisors`). `main` is ahead of `origin/main` by 2. Neither commit is pushed. `origin` fetches and pushes `nakulz/roast-room-na`. `upstream` fetch URL is `https://github.com/nateherkai/roast-room.git`. `upstream` push URL is `file:///dev/null/refused-push-nateherkai-roast-room`. Do not push.

Do not start a council. Do not run `/roast-room`. The five new seats are on `main` in that commit, on call. They are not on the default board. Their raw corpora stay in the git worktrees, because `build/` is gitignored. Checking out `seat-cagan` (or the other seat branches) inside `/workspace` fails while that worktree exists.

`git -C /workspace worktree list`:

| Path | HEAD | Branch |
|---|---|---|
| `/workspace` | `8e9ceca` | `main` (ahead of `origin/main` by 2, not pushed) |
| `/tmp/rr-cagan` | `f5bac87` | `seat-cagan` |
| `/tmp/rr-ng` | `db32aec` | `seat-ng` |
| `/tmp/rr-munger` | `b4e621a` | `seat-munger` |
| `/tmp/rr-doshi` | `edd0905` | `seat-doshi` |
| `/tmp/rr-jensen` | `83a5cdf` | `seat-jensen` |

When two docs disagree, use this order: the script that actually runs, then `.claude/skills/newroaster/SKILL.md` or `.claude/skills/roast-room/SKILL.md`, then `roster.json`, then `README.md`. Real disagreements are called out below.

## 1. What Roast Room is, and how a council runs

Roast Room debates one founder decision. Each advisor is a simulation built from that person's public work. The simulation is not the person, does not speak for them, and only quotes them when the line is verbatim in that seat's brain with a source id. That rule is in `/workspace/README.md` ("About the advisors"), `/workspace/CLAUDE.md`, and the Chair rules in `/workspace/.claude/skills/roast-room/SKILL.md`.

The Chair never argues a side and never adds a pillar. If no seat raised a point, the Chair hands it to the closest seat as a crux in the next round. The Chair writes plain English. Seat cards stay verbatim. Full protocol: `/workspace/.claude/skills/roast-room/SKILL.md`.

### Modes

From the skill's "Modes" section:

| Mode | How you start it | What runs |
|---|---|---|
| Full council | `/roast-room` plus the decision | Board recommended for this decision, then confirmed. Three rounds. For calls that are expensive or hard to undo. |
| Quick | `/roast-room --quick` | Four seats. Rounds 1 and 2. Round 3 only if the scores did not converge. |
| Named seats | `/roast-room --seats hormozi,buffett` | Only those seats, three rounds. Any roster key, on the default board or not. |
| Everyone | `/roast-room --all` | Every seat in `roster.json`, up to nine. |
| Consult | `/roast-room ask <seat>` | One seat, one answer, the single-seat prompt. No scoring. No session folder. |
| Board settings | `/roast-room board` | Show or change the default board. No council runs. |

Who sits is decided in this order (`SKILL.md`, "Pick the board"):

1. `--seats` or `--all` wins. No question. `--quick` then picks four from those seats.
2. Otherwise `roster.json` `"board"` decides. On `main` it is `"ask"`.
   - `"ask"`: recommend a board and ask the user to confirm.
   - `"auto"`: recommend the same way and seat it without asking.
   - `"default"`: seat the `"default"` list. No question.
3. Never seat more than nine. Every seated key needs `.claude/agents/council-<key>.md` and a brain folder. Skip and name any key that lacks one.

The recommendation is five to seven seats for a full council, four for `--quick`. It must include every seat whose pillar the decision lives in or materially affects (the seats that would get weight 2 or 3), one downside seat (Buffett, or the roster's money, capital, or risk seat), and the seat most likely to disagree. Leave out seats whose pillar barely touches the decision. Two seats with close pillars sit together only when they would disagree. Weights: 3 means the decision lives in the pillar, 2 means the pillar is materially affected, 1 means it is touched at the edges. Every seat is at least 1. Exactly one or two seats get a 3. Source: `/workspace/.claude/skills/roast-room/references/seats.md`.

On `main`, the default board is Bezos, Graham, Hormozi, Gary V, Martell, Wickman, Buffett. Five more are on call: Naval, Codie, Leila, Sara, Elon. Keys and questions are in `/workspace/.claude/skills/roast-room/roster.json`. `seats.md` says that file is the source of truth. The README's Graham question ("Do people actually want this") does not match the roster ("Is this something people actually want, and is it growing?"). Use the roster line.

### Rounds

Session folder, created at step 2: `/workspace/sessions/YYYY-MM-DD-<decision-slug>/`. Three finished examples ship with the repo:

- `/workspace/sessions/2026-10-09-example-take-the-seed/`
- `/workspace/sessions/2026-10-10-example-first-sales-hire/`
- `/workspace/sessions/2026-10-10-example-raise-coaching-price/`

`sessions/*` is gitignored except the examples (`/workspace/.gitignore`).

| Step | What the Chair writes |
|---|---|
| 1 | The brief. Decision, options A/B/C including "don't do it", business, resources, success, and the founder's lean. Under 300 words. Assumptions marked `(assumed)`. |
| 2 | `brief.md` and `council.json`. Tell the user once to watch `http://localhost:4730`. |
| 3 | Round 1, opening positions. Every seat in one parallel batch. Cards saved verbatim to `round-1.md` under `## <Seat>` using the roster `short` name. Then `## Chair notes` (cruxes, unanimity check) and `cruxes.json`. |
| 4 | Round 2, debate. Cards to `round-2.md`. |
| 5 | `draft-resolution.md` and `draft.json`. Weigh arguments, not headcount. Apply the overrides. |
| 6 | Round 3, ratification. Cards to `round-3.md`. No fourth round. |
| 7 | Quote check, then `verdict.md`, then `verdict.json` last. `verdict.json` tells the room the council is over. |

Quick mode skips Round 3 when the Round 2 spread on the top option is 3 or less and no seat is at `RUIN RISK: likely`. `draft.json` is skipped in that case (`/workspace/.claude/skills/roast-room/references/live-room.md`).

Prompts the seats receive: `/workspace/.claude/skills/roast-room/references/round-prompts.md`. If `council-<seat>` is not loaded in the session, the Chair spawns `general-purpose` and starts with: `Read .claude/agents/council-<seat>.md and follow it as your instructions for this whole task. Only read files; do not write anything.`

### Scoring and the verdict

Math is in `/workspace/.claude/skills/roast-room/references/scoring.md`. The Chair computes. The Chair does not invent numbers. Use the last round that ran.

`option score = sum(weight x seat's score for that option) / sum(weight)`, one decimal.

| Option score | Verdict |
|---|---|
| 7.5 to 10 | GO |
| 6.0 to 7.4 | GO WITH CONDITIONS |
| 4.5 to 5.9 | RESHAPE |
| below 4.5 | DON'T DO IT |

`WAIT` replaces the band when the top option depends on a prerequisite that is not met. `WAIT` names the trigger, the date, and what happens if the trigger fails. `DON'T DO IT` also applies when "don't do it" is itself the top-scoring option.

Overrides, applied after the band and stated in the report:

1. Ruin cap. Any seat that ends at `RUIN RISK: likely` on the recommended option caps the verdict at RESHAPE until the resolution names a mitigation that seat endorsed.
2. One-way door cap. If the recommended option is a one-way door (Bezos's call, or a majority of seats) and the spread on it is 4 or more, cap at GO WITH CONDITIONS and make the cheapest test a precondition.
3. Unanimity check. If every seat's top option is the same and their scores for it sit within 1 point in Round 1, the Chair names the strongest unargued alternative as a crux in Round 2.

`spread` is highest minus lowest seat score on the recommended option. `council confidence` is average seat confidence times 2, rounded, minus 1 if the spread is 5 or more, on a 1 to 10 scale. Round 3 `FINAL SCORE`, weighted, is "Support for the resolution". A pillar score of 4 or below gets a named fix in "What to do next" even when the verdict is GO. Dimension labels come from each seat's `dimension` in `roster.json`. The table in `scoring.md` lists only the original seven.

The verdict file follows `/workspace/.claude/skills/roast-room/references/report-template.md`. Keep it under about 1,000 words. The chat verdict stays under 200 words: label, call, option scores, three arguments, strongest objection, at most three next steps, the path to `verdict.md`, and the PDF line.

Before the verdict, run:

```bash
python .claude/skills/roast-room/scripts/check_quotes.py sessions/<session>
```

Try `python3` if `python` is missing. If Python is missing, the skill says to search each seat's brain for the exact words and treat anything you cannot find as unverified. Remove unverified quotes from the verdict and say so in the Chair notes.

### The room on localhost:4730

Start it from the repo root. Node 20 or newer. Nothing else to install.

```bash
cd /workspace
npm start
```

`npm start` is `node app/server.mjs` (`/workspace/package.json`). The server listens on `127.0.0.1` port `4730` (`/workspace/app/server.mjs`). Open `http://localhost:4730`.

Default runner is `viewer`. Viewer mode makes no AI call. `POST /api/council` returns 403 with: "This room is a viewer. Run /roast-room in Claude Code, or set COUNCIL_RUNNER=api in .env."

What viewer plays: `/workspace/app/lib/watch.mjs` scans `/workspace/sessions` every 1 second. It plays a folder that contains `council.json` and does not contain `events.json`. File order is the live-room table: `council.json` (setup), `round-1.md` (cards as each `## Seat` heading appears), `cruxes.json`, `round-2.md`, `draft.json` (or straight to the verdict in quick mode when Round 3 is skipped), `round-3.md`, `verdict.json` last. A folder untouched for 3 hours is marked stopped. Seat headings may be keys (`garyvee`) or display names (`Gary V`). Chair sections are dropped. The room recomputes option scores, confidence, and votes from the cards. Those numbers are not stored in `verdict.json`.

`COUNCIL_RUNNER=api` is the other path. The room then runs the council itself. One council at a time (409 if one is already running). Chair model defaults to `claude-opus-5-5` (`CHAIR_MODEL`). Seat model defaults to `claude-sonnet-5-5` (`SEAT_MODEL`). Both are in `/workspace/app/lib/council.mjs`. README says this bills the Anthropic API account, about 25 calls per full council (21 seat calls for seven seats times three rounds, plus Chair setup, cruxes, draft, and verdict). The API runner saves `events.json`, `brief.md`, `round-N.md`, and `verdict.md`. It does not write `council.json`, so the folder watcher ignores API sessions. Past sessions come from `events.json` via `listSaved()`.

In the API runner, `"ask"` does not ask anyone. The comment in `run()` says there is no one to ask in the room, so `"ask"` picks like `"auto"`. Quick skip matches the skill: Round 3 is skipped when mode is quick, Round 2 spread on the top option is 3 or less, and no seat has ruin `likely`.

`npm run smoke` (`/workspace/app/scripts/smoke.mjs`) is not a viewer check. It calls the Anthropic API for one Hormozi card. Do not run it in this environment.

## 2. What a seat is

A seat is four things. `/workspace/.claude/skills/newroaster/SKILL.md`, opening section:

1. A brain. `/workspace/.claude/skills/roast-room/brains/<slug>/`. Eight files. Every quote verbatim with a source id.
2. An agent. `/workspace/.claude/agents/council-<key>.md`. The sub-agent that reasons and talks from that brain. Tools are Read, Grep, Glob. `maxTurns` is 12. Template: `/workspace/.claude/skills/newroaster/references/agent-template.md`. The frontmatter `description` must not contain a colon followed by a space.
3. A portrait. Four frames in `/workspace/app/public/portraits/`: `<key>-base`, `<key>-open`, `<key>-mid`, `<key>-blink`, as `.webp`, `.png`, or `.jpg`. The room checks that order (`/workspace/app/server.mjs`, `/api/seats`). No frame means a drawn placeholder bust.
4. A roster line in `/workspace/.claude/skills/roast-room/roster.json`: `key`, `name`, `short`, `initials`, `slug`, `pillar`, `question`, `dimension`, `color`. `"board"` is `ask`, `auto`, or `default`. `"default"` is the list of keys that sit when the setting is `"default"`.

Names, from newroaster step 1:

- `key`: short, lowercase, unique. The script enforces `^[a-z][a-z0-9]{1,15}$` (2 to 16 characters, digits allowed). The skill text says "letters only". The script is what runs.
- `slug`: `first-last`, pattern `^[a-z0-9]+(-[a-z0-9]+)*$`.
- `short`: the name in headings and the room. Unique, case-insensitive.
- `dimension`: the scorecard label.

`/workspace/.claude/skills/newroaster/scripts/add_seat.mjs` refuses to register a seat if the agent file is missing, or if the brain is missing any of `_hot.md`, `frameworks.md`, `principles.md`, `positions.md`, `voice.md`, `stories.md`, `sources.md`. It does not require `books.md`. The brain spec does require `books.md`. Running it again for the same key updates the line. `--default` appends the key to the default board. The board holds at most 9. If it is already full, `--default` fails unless you pass `--swap <key>`. `--swap` only removes that key from `"default"`. It does not delete the seat. A missing `--color` takes the first unused entry in the script's palette. The script does not edit `seats.md`. The skill's step 7 says you add one or two tension lines there by hand, after `add_seat.mjs`.

On `main` the twelve agents are `/workspace/.claude/agents/council-{bezos,graham,hormozi,garyvee,martell,wickman,buffett,naval,sanchez,blakely,leila,musk}.md`. Each has all four portrait frames. `/workspace/package.json` still says "eleven AI advisors" and its description omits Elon. The roster has twelve. Trust the roster.

## 3. How sources are picked, fetched, skipped, and cited

Rules: `/workspace/.claude/skills/newroaster/SKILL.md` steps 2 and 3, and `/workspace/.claude/skills/newroaster/scripts/fetch.mjs`.

### What to look for

Best first, via web search:

- Their own site, blog, essays, newsletter, or letters.
- Long talks and keynotes where they are the speaker.
- Long interviews and podcasts where they are the main guest. Their own podcast counts.
- Books only as they teach them in public: author talks, interviews about the book, chapters they posted free.

Never fetch pirated or paywalled book text. The corpus stays in the build folder and is never committed. The brain holds short quotes (under 45 words) and paraphrase, never book text.

Also required: recent material from the last two years, so `positions.md` can show current views, and a spread of years so a change of mind shows up.

Skip clips under about 10 minutes, fan compilations, reaction videos, and pieces where someone else does most of the talking. One 90-minute keynote is worth ten 6-minute clips. Under about 15 usable sources or 60,000 words, the skill says to warn and offer `--quick`, or pick a different person.

Write URLs to `<build>/urls.txt`, one per line, with a `# heading` line per group. Aim for the depth's source count plus about 20 percent.

### Depth bars

From newroaster `SKILL.md`. The README table lists source counts only. The skill adds the word floor and the extraction-agent count. Use the skill.

| Flag | Sources | Words | Extraction agents | Use |
|---|---|---|---|---|
| `--quick` | 12 to 20 | 80,000+ | 2 to 3 | Trying someone out |
| default (standard) | 30 to 50 | 250,000+ | 4 to 6 | A seat you will use |
| `--deep` | 80+ | 500,000+ | 8 to 12, in waves | Matching the original seven |

Batches are "about 50,000 words" each (a 90-minute talk is about 13,000 words, a long essay about 5,000). That word split can demand fewer agents than the depth row. Marty Cagan is the example: 93,731 words became 2 note batches, while the standard row says 4 to 6 agents. Both rules are in the skill. Say which one you followed.

`--quick` brains may run at about half the file budgets in `/workspace/.claude/skills/newroaster/references/brain-spec.md`.

### Fetch

Build folder: `<repo>/build/<slug>/`. Git ignores `build/` (`/workspace/.gitignore`).

```bash
node .claude/skills/newroaster/scripts/fetch.mjs <build> --list <build>/urls.txt
node .claude/skills/newroaster/scripts/fetch.mjs <build> --manifest
node .claude/skills/newroaster/scripts/fetch.mjs <build> --add path/to/file.md --title "..." --date 2024-05-01
node .claude/skills/newroaster/scripts/fetch.mjs <build> --sources-md .claude/skills/roast-room/brains/<slug>/sources.md --name "Full Name"
```

A single URL can be passed in place of `--list`. Re-runs skip a URL already in `<build>/sources.json` and print `skip`. Each kept source becomes `<build>/corpus/S001-<title>.md` with a header `Source: S001 | url | date | kind`. Ids are `S` plus three digits. The table is `<build>/sources.json`.

Status lines the script prints:

| Line | Meaning |
|---|---|
| `ok` | Saved, with id, word count, and title. |
| `skip` | URL already in `sources.json`. |
| `thin` | Web page under 250 words. Treated as paywall, login, or a JavaScript page. Not saved, unless you pass `--keep-short`. |
| `fail` | HTTP error, no English captions, or another throw. The message is in parentheses. |
| `pdf` | Body was a PDF and `pdftotext` is missing. Raw file saved as `corpus/pending-*.pdf`. Read it, save text, then `--add` that text. |

The skill's step 3 lists `ok`, `skip`, `thin`, and `fail`. The script also prints `pdf`. After a thin or failed URL, find another copy or replace it. Open two or three corpus files and confirm they are clean text by the right person.

YouTube: if `yt-dlp` is on `PATH` and `NO_YTDLP` is unset, fetch uses yt-dlp and prefers a human English caption track over auto captions. Otherwise it uses YouTube's own caption endpoint. PDFs use `pdftotext -layout` when Poppler is installed. `--manifest` prints source count, total words, year span, counts by kind, and any saved source under 800 words. Those short sources are already in the corpus. The 800-word line is a warning, not a skip. The skip for short web pages is 250 words.

`--sources-md` rewrites `sources.md` as a header with counts and words, then one bullet per source: `id | title | url | date | words`. It does not preserve a hand-edited header. Read the current header before you regenerate it.

### Citation rules

From `brain-spec.md` and `extract-prompt.md`:

- Quotation marks mean verbatim. Copy the characters from the corpus, including grammar and filler. Do not fix, merge, or paraphrase inside quotes.
- Every quote is under 45 words and carries a source id that exists in `sources.md`, like "..." (S014).
- A quote may skip words with `...` only inside one passage.
- A paraphrase, a signature question, or your own summary has no quotation marks.
- A reading of several sources says `inferred from S0xx, S0yy`. It does not get quotation marks.
- Never attribute a view with no source id. A topic with no evidence says `no recorded position`. Do not guess.
- Prefer the newer source when the view changed, and show both with dates.
- Extract only what the person says. Ignore the host, the interviewer, and other guests.

`/workspace/.claude/skills/roast-room/brains/alex-hormozi/sources.md` says punctuation was added during extraction of auto captions. That note describes the Hormozi brain. It does not relax the rule for a new seat. `check_quotes.mjs` will fail a quote whose punctuation is not in the corpus file.

### What this environment could fetch

During the new-seat builds, YouTube, archive.org, and many publisher sites were blocked. GitHub mirrors and Hugging Face were what got through. `fetch.mjs` has no mirror fallback. A blocked YouTube URL comes back as `fail`. The reliable path here is a local file you already have, then `--add`. Do not keep retrying the public YouTube or archive.org URL and treat a failure as an empty corpus.

## 4. How distillation works

Same skill, steps 4 through 9. Layout and budgets: `/workspace/.claude/skills/newroaster/references/brain-spec.md`. Extraction prompt: `/workspace/.claude/skills/newroaster/references/extract-prompt.md`. Writer prompt: `/workspace/.claude/skills/newroaster/references/writer-prompt.md`.

### Extract

Split the corpus into batches of about 50,000 words. Spawn one `general-purpose` agent per batch, `model: sonnet`, in one message, foreground, at most six at a time. `--deep` runs in waves. Each agent writes `<build>/notes/batch-NN.md` and nothing else. For each source it writes `## S0xx | title | date` with frameworks, rules, positions, stories, books, voice, and limits. Skip a part the source does not have. End with `## Batch summary`: the five frameworks and five rules that came up most, with source ids.

Then:

```bash
node .claude/skills/newroaster/scripts/check_quotes.mjs <build> <build>/notes
```

Fix what it reports. A wrong source id gets corrected. A quote the script cannot find gets deleted or rewritten as paraphrase with no quotation marks, marked `inferred from S0xx`. Notes with no verifiable quote can stay as paraphrase.

### Three writers, then `_hot.md`

Create the brain folder. Write `sources.md` with `fetch.mjs --sources-md` before the writers start. The writer prompt tells them to read it.

Spawn three `general-purpose` writers in one message (default model). Each reads every notes file, `brain-spec.md`, `sources.md`, and may open a corpus file only to check who is speaking. The prompt tells them to skim `/workspace/.claude/skills/roast-room/brains/paul-graham/` for format. Each writer writes only its own files:

| Writer | Files |
|---|---|
| A | `frameworks.md`, `principles.md`, `books.md` |
| B | `positions.md`, `stories.md` |
| C | `voice.md` |

You write `_hot.md` yourself after those six files exist. The spec says it is what the seat reads on every council call: who the seat is, the pillar and the question, the corpus in one line, worldview in three sentences, the 8 rules they decide by (each with one short verbatim quote and a source id), the 5 frameworks they reach for first, a decision loop of 5 or 6 steps, signature questions, a 5-line voice cheat sheet, and **where this lens misfires**. That last section is mandatory. Use what they say about their own limits first. Budget 600 to 800 words (quick may be about half). Read it once as the agent will: it should tell you how this person decides, in their words, in under 800 words.

Then:

```bash
node .claude/skills/newroaster/scripts/check_quotes.mjs <build> .claude/skills/roast-room/brains/<slug>
```

Fix until the exit code is 0.

### What `check_quotes.mjs` enforces

Script: `/workspace/.claude/skills/newroaster/scripts/check_quotes.mjs`.

```bash
node .claude/skills/newroaster/scripts/check_quotes.mjs <build dir> <file or folder> [...]
```

It reads `<build>/sources.json` and the corpus file named on each row. It walks every `.md` file under the targets. A quote is text in straight or curly double quotes, 12 to 600 characters, on one line, followed within 40 characters by `(S014)` or `[S014]` (several ids may be separated by commas or semicolons). After normalization the quote must be at least 4 words. Normalization lowercases, folds smart quotes and apostrophes, joins contractions that were split (`' t` becomes `'t`), strips `[mm:ss]` timestamps, and drops every other character that is not a letter, digit, apostrophe, or space.

`...` or `…` splits the quote into pieces. Each piece of at least 3 words must appear in the cited source. If none of the cited ids contain it, and another source does, the script prints `WRONG ID` and the id that has it. If no source has it, it prints `NOT FOUND`. Exit code 0 when both counts are 0. Exit code 1 when anything needs fixing. Exit code 2 when the arguments are missing. It does not check quotes that lack a source id. Those are invisible to it, which is why unmarked paraphrase must not use quotation marks.

This checker needs the raw corpus. The original twelve do not have `build/<slug>/` in this checkout, so you cannot re-run it on Bezos, Graham, Hormozi, and the rest from `/workspace`.

### Agent file

Write `.claude/agents/council-<key>.md` from the template. Fill the lens from `_hot.md`'s decision loop (five or six questions), the voice from `voice.md`, and the debate section from the roster: name natural opponents and what this seat concedes, taken from "where this lens misfires". The description names the pillar, the source count, what the brain is built from, and the trigger phrases ("what would [name] say").

### Register, tension lines, portrait, test

Register only when the agent and the required brain files exist:

```bash
node .claude/skills/newroaster/scripts/add_seat.mjs \
  --key <key> --name "<Full Name>" --short "<Short>" --slug <slug> \
  --pillar "<pillar>" --question "<question>" --dimension "<dimension>" \
  [--default] [--swap <key>]
```

Run that script from the worktree whose roster should change. The script finds the repo root four directories above itself, so a copy under `/tmp/rr-cagan` edits `/tmp/rr-cagan/.claude/skills/roast-room/roster.json`, not `/workspace`. Do not point it at `/workspace` for these seats.

Then add one or two natural-tension lines for the new seat to `.claude/skills/roast-room/references/seats.md`. Existing lines are the pattern: who they clash with, and over what. On-call seats also get a row in the on-call table in that file.

Portrait, skill step 8. Style reference: `/workspace/.claude/skills/newroaster/assets/style-reference.jpg` (the Buffett cartoon). Do not change the prompts in `portrait.mjs`. A written description never sets the likeness. The photo does.

```bash
node .claude/skills/newroaster/scripts/portrait.mjs photo  <build>/portrait <image url or file>
node .claude/skills/newroaster/scripts/portrait.mjs base   <build>/portrait "<what the photo shows, plus the signature outfit>"
python .claude/skills/newroaster/scripts/build_portraits.py sheet <build>/portrait
node .claude/skills/newroaster/scripts/portrait.mjs pick   <build>/portrait <n>
node .claude/skills/newroaster/scripts/portrait.mjs frames <build>/portrait
python .claude/skills/newroaster/scripts/build_portraits.py build <build>/portrait <key> --out app/public/portraits
```

`base` makes two candidates. `frames` makes mouth-open, mouth "oh", and blink, each an edit of the chosen base. `build` aligns the edit onto the base, patches only the mouth or eyes, keys the green, and crops to the same scale as the original seven. Review `<build>/portrait/review.jpg`. If the head scale is wrong, rebuild with `--zoom 0.9` or `--zoom 1.1`. Needs `KIE_AI_API_KEY` in the environment or in `.env`, plus Python with `opencv-python` and `numpy`. About 5 image jobs per seat. With no key, the skill says finish the seat anyway, leave the placeholder, and tell the user to run `/newroaster portrait <name>` later.

Step 9 test. New agent files load when Claude Code starts, so the test uses the fallback: spawn `general-purpose` with the "Read the agent file and follow it" line, then the single-seat consult prompt from `round-prompts.md`, on a short decision in the seat's pillar. Save the answer to `<build>/test-consult.md` and run `check_quotes.mjs` on that file. Pass means: sounds like `voice.md`, first person, does not claim to be the person, names frameworks with source ids, every quote passes, and the answer owns the pillar. If it fails, fix the agent or `_hot.md` and test once more.

Step 10 is a report under 150 words: pillar, question, default board or on call, source count, words, years, how to call the seat, restart Claude Code so the agent type loads, and whether the portrait is real or a placeholder.

Without sub-agents, the skill says to run steps 4 and 5 yourself, one batch at a time. Everything else stays the same.

Do not edit another seat's brain or agent while you do this. Only `roster.json` `"seats"` and `"default"` change, and only through `add_seat.mjs`.

## 5. How the brain is used at council time

Two runtimes read the brain differently. Both are real.

### Claude Code (the skill)

The agent file tells the seat to read the brain and nothing else. Bezos is the pattern (`/workspace/.claude/agents/council-bezos.md`):

1. Read `_hot.md` first, every time.
2. Then at most three more files that fit the decision. The Round 1 prompt says `frameworks.md` and `positions.md` are usually the right ones. `voice.md` is read before the first answer in a session. `stories.md` and `books.md` are available. `sources.md` is the id table, not a reasoning file.
3. Never look outside the brain folder for facts about the person.
4. Cite a framework or rule with its source id, like `(Type 1 and Type 2 decisions, S063)`. Quote only a line that appears verbatim in the brain. Everything else is the seat's reasoning, unquoted, in the first person.

Round limits from `round-prompts.md`:

| Round | What the seat reads | Length |
|---|---|---|
| 1 Opening | `_hot.md`, then at most three more files. Also `brief.md`. | under 350 words |
| 2 Debate | `_hot.md` again, then at most three files. Also `brief.md` and `round-1.md`. | under 300 words |
| 3 Vote | only `_hot.md` if needed. Also `brief.md`, its own section of `round-2.md`, and `draft-resolution.md`. | under 150 words |
| Consult | `_hot.md`, then at most four more files. | under 500 words, end with `Sources:` and the ids used |

Round 1 and 2 cards score every option. Fields include stance, option scores, pillar score, confidence, ruin risk, and (round 1) door. Round 3 is Endorse, Endorse with amendment, or Dissent, plus a final score for the draft resolution.

The Chair then applies `scoring.md`, including the ruin cap, the one-way door cap, and the unanimity check.

### API runner (only when `COUNCIL_RUNNER=api`)

`/workspace/app/lib/seats.mjs` `systemFor()` inlines the agent file plus five brain files, in this order: `_hot.md`, `frameworks.md`, `positions.md`, `principles.md`, `voice.md`. It does not inline `stories.md`, `books.md`, or `sources.md`. The seat is told it has no file tools and that the files below are already loaded. So the "at most three files" rule in the agent does not apply on this path. The seat sees five files in full, every round.

`checkQuotes()` in the same file scans the card, not the corpus. A quote of 20 to 400 characters, at least 5 words after a lighter normalization, attributed to `S###`, is verified if that normalized string appears anywhere in that seat's brain folder. The room attaches the result to the card. It does not delete the quote. The skill's Chair is the one who removes unverified quotes from `verdict.md`, using `check_quotes.py`, which searches every brain plus earlier round text, not the corpus. See section 7 for the three checkers side by side.

The API Chair prompt in `chairDraft()` states the ruin cap. It does not state the one-way door cap. `chairCruxes()` does state the unanimity check. `scoring.md` still requires all three overrides on the skill path.

## 6. File map, the Bezos pattern, and the current build

### Repo map (paths on `main`)

| Path | Job |
|---|---|
| `/workspace/README.md` | How a person runs a council and adds a seat. Depth table there has no word floor. |
| `/workspace/CLAUDE.md` | Project rules: when to run `/roast-room`, where brains live, quote rule, plain-English Chair. |
| `/workspace/package.json` | `npm start`, `npm run smoke`. Description is stale (says eleven advisors). |
| `/workspace/.claude/skills/roast-room/SKILL.md` | Council protocol. |
| `/workspace/.claude/skills/roast-room/roster.json` | Seats, default board, `board` setting. Twelve seats. `board` is `ask`. |
| `/workspace/.claude/skills/roast-room/references/seats.md` | Weights, quick-council pick, natural tensions, on-call table. |
| `/workspace/.claude/skills/roast-room/references/round-prompts.md` | The four prompts. |
| `/workspace/.claude/skills/roast-room/references/scoring.md` | Math, bands, overrides. |
| `/workspace/.claude/skills/roast-room/references/report-template.md` | `verdict.md` shape. |
| `/workspace/.claude/skills/roast-room/references/live-room.md` | `council.json`, `cruxes.json`, `draft.json`, `verdict.json`. |
| `/workspace/.claude/skills/roast-room/scripts/check_quotes.py` | Session quotes against brains. |
| `/workspace/.claude/skills/roast-room/brains/<slug>/` | One brain per original seat. |
| `/workspace/.claude/skills/newroaster/SKILL.md` | Build a seat. |
| `/workspace/.claude/skills/newroaster/references/brain-spec.md` | Eight files, budgets, quote rules. |
| `/workspace/.claude/skills/newroaster/references/extract-prompt.md` | Map step. |
| `/workspace/.claude/skills/newroaster/references/writer-prompt.md` | Reduce step. |
| `/workspace/.claude/skills/newroaster/references/agent-template.md` | Agent file. |
| `/workspace/.claude/skills/newroaster/scripts/fetch.mjs` | Fetch, manifest, `sources.md`. |
| `/workspace/.claude/skills/newroaster/scripts/check_quotes.mjs` | Quotes against the corpus. |
| `/workspace/.claude/skills/newroaster/scripts/add_seat.mjs` | Roster line. |
| `/workspace/.claude/skills/newroaster/scripts/portrait.mjs` | Photo and cartoon frames. |
| `/workspace/.claude/skills/newroaster/scripts/build_portraits.py` | Sheet, align, key, crop. |
| `/workspace/.claude/agents/council-<key>.md` | One agent per roster seat. |
| `/workspace/app/server.mjs` | HTTP server. Viewer vs API. |
| `/workspace/app/lib/watch.mjs` | Plays a Claude Code session as files land. |
| `/workspace/app/lib/council.mjs` | API-runner rounds, Chair calls, scoring, save. |
| `/workspace/app/lib/seats.mjs` | Loads roster, inlines brains for the API, checks card quotes. |
| `/workspace/app/lib/anthropic.mjs` | API client. Requires loopback `ANTHROPIC_BASE_URL`. `api.anthropic.com` is refused. |
| `/workspace/app/public/portraits/` | Frames for the original twelve. |
| `/workspace/sessions/` | Councils. Examples are committed. New ones are not. |
| `/workspace/build/` | Raw corpora. Gitignored. Not present for the original twelve. |
| `/workspace/.env.example` | `ANTHROPIC_API_KEY`, `COUNCIL_RUNNER=viewer`, `KIE_AI_API_KEY`, plus commented loopback `ANTHROPIC_BASE_URL` and `KIE_AI_BASE_URL`. |

### Bezos brain, one file per job

Pattern folder: `/workspace/.claude/skills/roast-room/brains/jeff-bezos/`. Jobs are the spec. The first line of each Bezos file matches.

| File | Job in the spec | Bezos file |
|---|---|---|
| `_hot.md` | Read on every call. Worldview, 8 rules with quotes, 5 frameworks, decision loop, signature questions, voice cheat sheet, where the lens misfires. 600 to 800 words. | `# Jeff Bezos seat: hot sheet`. Pillar and question, corpus line, then those sections. Misfires include short runway, scale math, slow markets, fake two-way doors. |
| `frameworks.md` | 12 to 25. Name, what it is, parts, when to use, how to score, one quote, how many sources. Most-used first. | 24 frameworks. First is Type 1 and Type 2 decisions, quote from S063. |
| `principles.md` | 15 to 30 rules. One sentence, one or two quotes, source count, confidence (high = 3+ sources, medium = 2, low = 1). | 28 rules. |
| `positions.md` | 20 to 40 founder topics. Stance, quote, source id, date. Both views when he changed his mind. `no recorded position` when the corpus is silent. | 40 topics. |
| `voice.md` | 400 to 700 words. Sentence length, cadence, signature phrases with source counts, analogies, how he opens, closes, and disagrees, words he never uses, then 8 to 12 voice anchors under 45 words. | How he talks, then signature phrases. |
| `stories.md` | 10 to 20 stories he reuses. One or two lines, the lesson, source ids. | Leaving D. E. Shaw, the first raise, packing tables, and the rest. |
| `books.md` | One entry per book: title, year, thesis in your words, frameworks, which sources teach it. Never book text. If there is no book, one line, plus the major essays or series. | One book, *Invent and Wander* (2020). The file says no book text was used. |
| `sources.md` | Every source. Header with counts and words, then id, title, url, date, words. | 68 sources, about 373,600 words. This file is a markdown table with a File column (`transcripts/...`), not the bullet format `fetch.mjs --sources-md` writes. S002 duplicates S044. S026 duplicates S030. The header says to cite S044 and S030 first. |

Each file opens with a `# <File>: <Full Name>` heading (Bezos uses "seat: hot sheet" for `_hot.md`) and one line on what it was built from.

### Original twelve: source lists only

These brains are on `main` in `/workspace`. Their `sources.md` files are the source lists. The raw corpora are not in this checkout. Several headers point at `projects/founder-council/corpus/<slug>/`, which is not here. Do not treat a missing corpus as a reason to rewrite the brain.

Header dialects you will actually see:

- Bullet `id | title | url | date | words`, which is what `fetch.mjs --sources-md` writes. Elon (`/workspace/.claude/skills/roast-room/brains/elon-musk/sources.md`, 39 sources, 559,012 words) and Naval (`.../naval-ravikant/sources.md`, 35 sources, 325,659 words) use it.
- A table with a File column. Bezos, above.
- An older prose header whose rows end in a file path under `projects/founder-council/corpus/...`. Paul Graham (`.../paul-graham/sources.md`): 246 sources, 663,667 words. One transcript was dropped because Graham is not the speaker. Dan Martell and Gary Vaynerchuk use the same older shape.
- Hormozi (`.../alex-hormozi/sources.md`): 124 video transcripts, about 1,315,302 words, 2020 to 2026. Header says no book text, and that punctuation was added during extraction.

Graham's `sources.md` is the file the writer prompt tells a new writer to skim for format. For a new seat, the spec's written-by-`fetch.mjs` shape is the one to produce. Do not reformat the original twelve to match.

### New seats are on `main`, on call

Local commit `2f521eb` on `/workspace` `main` added them. `roster.json` keys now include `cagan`, `ng`, `munger`, `doshi`, and `jensen`, after the original twelve. `"board"` is still `ask`. The default board is still `bezos`, `graham`, `hormozi`, `garyvee`, `martell`, `wickman`, `buffett`. None of the five is on that list.

Brains and agents are in `/workspace`, not only in `/tmp`:

- `/workspace/.claude/skills/roast-room/brains/marty-cagan/sources.md`
- `/workspace/.claude/skills/roast-room/brains/andrew-ng/sources.md`
- `/workspace/.claude/skills/roast-room/brains/charlie-munger/sources.md`
- `/workspace/.claude/skills/roast-room/brains/shreyas-doshi/sources.md`
- `/workspace/.claude/skills/roast-room/brains/jensen-huang/sources.md`
- `/workspace/.claude/agents/council-cagan.md`, `council-ng.md`, `council-munger.md`, `council-doshi.md`, `council-jensen.md`

Tension lines for all five are in `/workspace/.claude/skills/roast-room/references/seats.md`.

The worktree commits still exist and match what was copied: Cagan `f5bac87`, Ng `db32aec`, Munger `b4e621a`, Doshi `edd0905`, Jensen `83a5cdf`. Raw corpora are not on `main`. They are only under `/tmp/rr-*/build/<slug>/`, because `build/` is gitignored. Quote checks have to use those build folders plus the brains on `main`.

None of the five has portrait frames. All five roster colors are `#5b7cfa`. That is a cosmetic bug: each `add_seat.mjs` ran against a roster that did not yet contain the others, so each took the first free palette color. The room will paint them the same color until someone assigns five different unused colors. Do not edit the roster for that unless Nakul asks.

| Seat | Worktree commit that was copied | Brain on main, corpus in the worktree | Bar, from `sources.md` | Roster line on `main` | Still open |
|---|---|---|---|---|---|
| Marty Cagan | `seat-cagan` `f5bac87` | Brain `/workspace/.claude/skills/roast-room/brains/marty-cagan/`. Corpus `/tmp/rr-cagan/build/marty-cagan/` (50 corpus files, 2 note batches, `test-consult.md`). Agent `/workspace/.claude/agents/council-cagan.md`. | 50 sources (1 video, 49 web), 93,731 words. Source count is the top of standard (30 to 50). Words are short of the 250,000 standard floor, and above the 80,000 quick floor. | key `cagan`, short `Cagan`, slug `marty-cagan`, pillar Product discovery, question "Are we solving a real problem, and what evidence says this is the solution?", dimension Evidence and discovery. Color `#5b7cfa`. | On call. Placeholder portrait. |
| Andrew Ng | `seat-ng` `db32aec` | Brain `/workspace/.claude/skills/roast-room/brains/andrew-ng/`. Corpus `/tmp/rr-ng/build/andrew-ng/` (16 corpus files, 2 note batches, `test-consult.md`). Agent `/workspace/.claude/agents/council-ng.md`. | Quick. 16 sources (15 pdf, 1 video), 96,751 words. Inside 12 to 20 sources and above 80,000 words. | key `ng`, short `Ng`, slug `andrew-ng`, pillar Data-centric AI, question "Does this data move the model, or is the generation theater?", dimension Data that moves the model. Color `#5b7cfa`. | On call. Placeholder. |
| Charlie Munger | `seat-munger` `b4e621a` | Brain `/workspace/.claude/skills/roast-room/brains/charlie-munger/`. Corpus `/tmp/rr-munger/build/charlie-munger/` (39 corpus files, 6 note batches, `test-consult.md`). Agent `/workspace/.claude/agents/council-munger.md`. | Standard. 39 sources (39 web), 300,845 words. Inside 30 to 50 sources and above 250,000 words. | key `munger`, short `Munger`, slug `charlie-munger`, pillar Failure and mental models, question "How does this fail, and what do the basic models say?", dimension Inversion and failure. Color `#5b7cfa`. | On call. Placeholder. |
| Shreyas Doshi | `seat-doshi` `edd0905` | Brain `/workspace/.claude/skills/roast-room/brains/shreyas-doshi/`. Corpus `/tmp/rr-doshi/build/shreyas-doshi/` (54 corpus files, 6 note batches, `test-consult.md`). Agent `/workspace/.claude/agents/council-doshi.md`. | 54 sources (2 video, 52 web), 66,381 words. Source count is above the standard 30 to 50 band. Words are under the 80,000 quick floor and far under 250,000. The "under 60,000 words" warning does not fire. Six note batches for 66,381 words does not match "about 50,000 words" per batch. | key `doshi`, short `Doshi`, slug `shreyas-doshi`, pillar Product sense and focus, question "Which bet deserves the team's focus, and what should we explicitly not do?", dimension Focus and product sense. Color `#5b7cfa`. | On call. Placeholder. |
| Jensen Huang | `seat-jensen` `83a5cdf` | Brain `/workspace/.claude/skills/roast-room/brains/jensen-huang/`. Corpus `/tmp/rr-jensen/build/jensen-huang/` (14 corpus files, 3 note batches, `test-consult.md`). Agent `/workspace/.claude/agents/council-jensen.md`. | Quick. 14 NVIDIA keynotes, 165,442 words, 2021 to 2026. Inside 12 to 20 sources and above 80,000 words. Quote check passed: 248 brain quotes, consult exit 0. | key `jensen`, short `Jensen`, slug `jensen-huang`, pillar Platform and full-stack shipping, question "Does this become the default platform, and what has to be true to ship the whole stack?", dimension Platform and full-stack shipping. Color `#5b7cfa`. | On call. Placeholder portrait. |

All five `sources.md` headers use the `fetch.mjs` bullet format. Word counts above are those headers, checked on 2026-10-26.

### Localhost lock

Local commit `8e9ceca` on `main`, parent `2f521eb`, message "Lock Anthropic and portrait calls to loopback". `main` is ahead of `origin/main` by 2. Not pushed. These files are in that commit:

- `/workspace/app/lib/anthropic.mjs`
- `/workspace/.claude/skills/newroaster/scripts/portrait.mjs`
- `/workspace/.env.example`

Calls require loopback `ANTHROPIC_BASE_URL` and `KIE_AI_BASE_URL`. `api.anthropic.com`, `api.kie.ai`, and `kieai.redpandaai.co` are refused. `upstream` fetch URL is `https://github.com/nateherkai/roast-room.git`. `upstream` push URL is `file:///dev/null/refused-push-nateherkai-roast-room`. Do not push.

Viewer mode makes no AI call, so `npm start` with the default runner is safe. `COUNCIL_RUNNER=api` and portrait generation throw unless those base URLs are set to loopback (`localhost`, `127.0.0.1`, or `::1`). There is no public fallback. Do not call the public hosts. Do not run `npm run smoke`, `portrait.mjs base`, or `portrait.mjs frames` against `api.anthropic.com` or `api.kie.ai`.

## 7. Playbook

Brains and agents for the five new seats are on `/workspace` `main` (they landed in `2f521eb`; HEAD is `8e9ceca`). Raw corpora are only in the worktrees. Run `check_quotes.mjs` with the worktree build directory and the brain folder on `main`. Example: corpus `/tmp/rr-munger/build/charlie-munger`, brain `/workspace/.claude/skills/roast-room/brains/charlie-munger`.

### Judge a seat

1. Read `/workspace/.claude/skills/roast-room/roster.json`. Confirm `key`, `slug`, `short`, `pillar`, `question`, `dimension`, and that the five new keys are absent from `"default"`.
2. Confirm the eight brain files exist. `add_seat.mjs` will accept a seat with no `books.md`. The spec will not. Also confirm `.claude/agents/council-<key>.md` and a tension line in `references/seats.md`.
3. Count the corpus against the depth bar you were told, not against a vibe.

```bash
cd /tmp/rr-munger
node .claude/skills/newroaster/scripts/fetch.mjs build/charlie-munger --manifest
```

Compare that printout to the header of `/workspace/.claude/skills/roast-room/brains/charlie-munger/sources.md`. Then `wc -w` on `_hot.md` and `voice.md` in that same `/workspace` brain folder. Count entries in `frameworks.md`, `principles.md`, `positions.md`, and `stories.md` against `brain-spec.md`. Use the half-budget allowance only if the seat was built `--quick`.

4. Quote check, corpus first.

```bash
node /workspace/.claude/skills/newroaster/scripts/check_quotes.mjs \
  /tmp/rr-munger/build/charlie-munger \
  /workspace/.claude/skills/roast-room/brains/charlie-munger
node /workspace/.claude/skills/newroaster/scripts/check_quotes.mjs \
  /tmp/rr-munger/build/charlie-munger \
  /tmp/rr-munger/build/charlie-munger/notes
```

Exit 0 and `not found: 0` and `wrong source id: 0` is the pass. Read a sample of the quotes yourself: open the cited `corpus/S0xx-*.md` and confirm the speaker is the person, not the host. The script cannot do that.

5. If `build/<slug>/test-consult.md` exists, run the same checker on that file. Read the answer against step 9: first person, does not claim to be the person, owns the pillar, source ids on frameworks.

6. Portrait: `ls app/public/portraits/<key>-*.webp`. No files means the placeholder. Do not generate one against `api.kie.ai`.

7. Judge the pillar against `/workspace/.claude/skills/roast-room/references/seats.md`. A new seat that repeats Graham, Hormozi, or Buffett without a named split should not sit beside them. The tension lines in that file are the claim. Check that the brain actually supports the split.

A seat is ready to stay on call, in its own branch, when the manifest meets the depth you accept, `check_quotes.mjs` exits 0 on the brain, the eight files exist, the agent file matches the template, the tension line is real, and the step-9 answer passed. Portrait may stay a placeholder while kie.ai is blocked. That is the skill's no-key path. Say so. It is not a pass on the portrait.

### Add a source

The skill's refresh for a person who already has a seat is step 3 onward on the same slug. Fetch skips URLs already in `sources.json`. There is no separate "insert one quote" command.

```bash
cd /tmp/rr-doshi
# append the new URL to build/shreyas-doshi/urls.txt
node .claude/skills/newroaster/scripts/fetch.mjs build/shreyas-doshi --list build/shreyas-doshi/urls.txt
# or a file you already have, because YouTube and archive.org are blocked here:
node .claude/skills/newroaster/scripts/fetch.mjs build/shreyas-doshi \
  --add /absolute/path/to/transcript.md --title "Title" --date 2024-05-01
node .claude/skills/newroaster/scripts/fetch.mjs build/shreyas-doshi --manifest
```

Open the new corpus file. If it is thin, a paywall stub, or someone else talking, delete that row from `sources.json` and delete the corpus file, then pick a replacement. Do not leave a bad source in the id table.

Then extract only the new source (one notes section, same extract prompt), merge it into the brain files that should change, and regenerate the source list:

```bash
node .claude/skills/newroaster/scripts/fetch.mjs build/shreyas-doshi \
  --sources-md .claude/skills/roast-room/brains/shreyas-doshi/sources.md \
  --name "Shreyas Doshi"
node .claude/skills/newroaster/scripts/check_quotes.mjs \
  build/shreyas-doshi \
  .claude/skills/roast-room/brains/shreyas-doshi
```

`--sources-md` overwrites the header. If the old header had a warning a reader needs (duplicates, dropped files, caption punctuation), put that warning back after the script runs. Update the corpus line in `_hot.md` and the source count in the agent description so they match the manifest.

### Fix a bad quote

Run `check_quotes.mjs` and use its line numbers.

- `WRONG ID`: the words are in the corpus, under a different id. Change the citation to the id the script names. If the quote is really from the cited source and also appears elsewhere, either id is allowed, because the script passes when any cited id contains the text. Prefer the id the notes used.
- `NOT FOUND`: the words are not in any corpus file of this build. Do not "smooth" them until the script passes. Either replace the quoted span with a character-for-character copy from the corpus file (under 45 words), or remove the quotation marks and write `inferred from S0xx`.
- A quote that passes the script but is the host's line: cut it or move it out of quotation marks. The script does not know who is speaking.
- A quote with no source id is not checked. If it is in quotation marks, it is a bug. Take the marks off or add a real id and re-run.

Normalization means a curly apostrophe in the brain can still match a straight apostrophe in the corpus. It does not mean you may add a comma the corpus does not have.

Session quotes, only after a council exists, use a different script:

```bash
python3 .claude/skills/roast-room/scripts/check_quotes.py sessions/<folder>
```

`check_quotes.py` scans `round-*.md` and `verdict.md` for a quote of 20 to 400 characters followed by `S###`, at least 6 words after normalization. It looks in every file under `brains/`, concatenated. If the quote is not in any brain, it is allowed when the same normalized text already appeared in an earlier round file or in `brief.md`. Otherwise it prints `UNVERIFIED` and exits 1. It does not open the corpus. A quote can pass this script because it sits in the brain, and fail `check_quotes.mjs` because it is not in the corpus. For a brain edit, `check_quotes.mjs` is the one that matters.

The room's `checkQuotes()` in `seats.mjs` is a third checker: one seat's brain, at least 5 words, 20 to 400 characters, no ellipsis splitting. Do not treat a green mark in the room as a corpus pass.

### Commands worth keeping

```bash
git -C /workspace worktree list
git -C /tmp/rr-jensen rev-parse --short HEAD
node .claude/skills/newroaster/scripts/fetch.mjs <build> --manifest
node .claude/skills/newroaster/scripts/check_quotes.mjs <build> <brain-or-notes-or-test-file>
node .claude/skills/newroaster/scripts/add_seat.mjs --key <key> --name "<Full Name>" --short "<Short>" --slug <slug> --pillar "<pillar>" --question "<question>" --dimension "<dimension>"
python3 .claude/skills/roast-room/scripts/check_quotes.py <session-folder>
cd /workspace && npm start
```

`npm start` is the viewer. Leave `COUNCIL_RUNNER` unset or set it to `viewer`.

### What not to do

- Do not start a council, and do not run `npm run smoke`.
- Do not push. `upstream` already points at `nateherkai/roast-room` for fetch, and its push URL is `file:///dev/null/refused-push-nateherkai-roast-room`. Do not change that.
- Do not push `2f521eb` or `8e9ceca`. `main` is ahead of `origin/main` by 2. Do not put `cagan`, `ng`, `munger`, `doshi`, or `jensen` on the default board unless Nakul asks.
- Do not fetch a pirated or paywalled book. Do not paste book text into a brain file.
- Do not put words in quotation marks unless they are in the corpus file you cite.
- Do not present a seat's card as something the real person said, unless it is a verbatim brain quote with a source id.
- Do not touch the other seats' brains or agents. A refresh stays on one slug.
- Do not remove a seat from `"seats"` to take them off the default board. `/roast-room board` only edits `"board"` and `"default"`.
- Do not draw a portrait from a text description. Do not call `api.kie.ai` or `kieai.redpandaai.co` from this environment.
- Do not commit `build/` or a fresh `sessions/` folder. Both are gitignored on purpose.
- Do not repaint the five `#5b7cfa` roster colors unless Nakul asks. The same color is a cosmetic bug, not a reason to rewrite the brains.

## 8. What to improve, and what to bring back

These are proposals. They are grounded in the files above. Do not implement them unless Nakul asks. Bring back the research answers first.

### Product

The room is a viewer of files the Chair writes. That split is sound. Two gaps change the verdict a founder sees:

- Saved councils. `roster.json` holds one `"default"` list and one `"board"` mode. A pricing board and a hiring board cannot both be saved. The founder retypes `--seats` or accepts a fresh recommendation. A `boards` map (name, keys, maybe default weights) would have to be read by `SKILL.md` "Pick the board", by `/roast-room board`, and by `loadRoster()` in `seats.mjs`. Until that exists, keep new seats on call and let the Chair recommend them. Do not put Cagan, Doshi, and Graham on the default board together. `seats.md` already says close pillars sit together only when they disagree.
- The API runner and the skill are not the same Chair. `systemFor()` loads five brain files and drops stories, books, and sources. `chairDraft()` states the ruin cap and does not state the one-way door cap. `"ask"` cannot ask. If the product people use is Claude Code plus the viewer, say that in the README and treat the API runner as a second implementation with a known shorter brain. If both are products, make the API runner load the same files the Round 1 prompt allows the seat to open, and put all three overrides in the Chair prompt.
- `package.json` description still says eleven advisors and omits Elon. The roster has twelve. Small, and it will confuse the next reader.
- `scoring.md` lists dimension labels for the original seven only. The code uses `roster.json` `dimension`. Either point `scoring.md` at the roster or add a row when a seat is registered. The skill does not currently tell `/newroaster` to edit `scoring.md`.

### Brains

- Pick one depth pass rule. Today a seat can clear the source count and miss the word floor (Cagan, Doshi), or clear a short word floor with one genre of source (Jensen's 14 NVIDIA keynotes, Ng's 16 sources). The skill already says one long keynote beats ten clips, and it also asks for a spread of years and for recent material. A usable rule: standard means 30 to 50 sources and 250,000 words, and at least two kinds of source (essay and talk, or keynote and long interview). Quick means 12 to 20 sources and 80,000 words, with the same "not a single series" check stated in the report. Write the rule down in `SKILL.md` so the next seat is not graded on whichever bar it happens to pass.
- Doshi's six note batches for 66,381 words need an explanation before anyone adds more sources on top. Leftover batches will be re-read by the next writer.
- The Hormozi header admits added punctuation. Leave that brain alone unless you have its corpus. Do not copy the practice.
- Original `sources.md` files are three dialects, and several point at a corpus path that is not in the repo. Leave them. New seats stay on the `fetch.mjs` bullet format.
- `add_seat.mjs` should require `books.md` if the spec requires it. Until the script changes, check the file yourself.

### Fetch

`fetch.mjs` can only save what this network returns. YouTube, archive.org, and many publisher sites failed in these builds. GitHub mirrors and Hugging Face worked. The script's YouTube path always talks to YouTube (yt-dlp or the caption endpoint). There is no "try this mirror" list. For the next seat in this environment, collect files first and `--add` them. Record `fail` and `thin` URLs in the seat notes so the next person does not retry the same dead URL. A mirror fallback belongs in `fetch.mjs` only after someone names the mirrors that are legal and stable. Do not add a scraper for a paywall.

### Portraits

Every new seat is on the drawn bust. The pipeline is specified and should stay: photo, two candidates, pick, three edits, `build_portraits.py`. `portrait.mjs` in `8e9ceca` sends the upload, the job, the poll, and the result download to loopback `KIE_AI_BASE_URL`. `api.kie.ai` and `kieai.redpandaai.co` are refused. Do not generate a face from a paragraph, and do not call those public hosts.

### The word bar versus the source bar

State this in the seat report every time, with the two numbers from `--manifest`:

| Seat | Sources vs its bar | Words vs its bar |
|---|---|---|
| Cagan | 50, meets standard 30 to 50 | 93,731, misses standard 250,000, clears quick 80,000 |
| Ng | 16, meets quick 12 to 20 | 96,751, meets quick 80,000 |
| Munger | 39, meets standard 30 to 50 | 300,845, meets standard 250,000 |
| Doshi | 54, above standard 30 to 50, under deep 80 | 66,381, misses quick 80,000 and standard 250,000 |
| Jensen | 14, meets quick 12 to 20 | 165,442, meets quick 80,000, one series of NVIDIA keynotes |

Munger is the only new seat that clears both standard numbers. That does not by itself mean the others are bad. It means the skill is grading two different things and the builds picked one each.

### Research to return

Answer these in writing. Each one has a command or a file. Do not answer from memory.

1. Quote check. For Cagan, Ng, Munger, and Doshi, run `check_quotes.mjs` with the worktree build directory and the brain folder on `/workspace` `main`, and again on `build/<slug>/notes`. Record the exit code and the line `quotes verified: N; wrong source id: N; not found: N`. If either failure count is above 0, paste the first 15 `WRONG ID` and `NOT FOUND` lines. Jensen already passed (248 brain quotes, consult exit 0). Re-run his brain the same way and record the line.
2. Manifest versus header. Run `fetch.mjs <build> --manifest` in the five build folders under `/tmp/rr-*`. Put the script's source count, word count, and year span next to the `sources.md` header on `/workspace` `main`. Say they match or paste both lines.
3. Spec budgets. For Cagan, Ng, Munger, Doshi, and Jensen, `wc -w` on `/workspace` `_hot.md` and `voice.md`. Count entries in `frameworks.md`, `principles.md`, `positions.md`, `stories.md`. Mark each pass or fail against `brain-spec.md`. Use the half budget only for Ng and Jensen (quick). Cagan and Doshi were not built to the quick flag. Munger is standard.
4. Doshi batches. `ls -l build/shreyas-doshi/notes` and a word count per batch file. Say whether six files are real batches or leftovers. Name any batch that no brain quote cites.
5. Speaker check. From each of the five brains on `/workspace`, take 8 quotes that cite a source id. For each, the corpus path under `/tmp`, the id, whether the normalized quote is in that file, and whether the speaker is the person. One failure is enough to mark the seat "refresh".
6. Step 9. For each existing `test-consult.md`, run `check_quotes.mjs` on that file and answer yes or no: first person, refuses to be the real person, names a framework with a source id, owns the pillar in the roster question. Quote the one line that shows the failure if the answer is no.
7. Confirm the seat commit is still the parent. `git -C /workspace rev-parse --short HEAD` is `8e9ceca`. Its parent is `2f521eb`. `git -C /workspace status -sb` shows `main` ahead of `origin/main` by 2. In `/workspace/.claude/skills/roast-room/roster.json`, keys `cagan`, `ng`, `munger`, `doshi`, and `jensen` are present and absent from `"default"`. Worktree heads are still `f5bac87`, `db32aec`, `b4e621a`, `edd0905`, and `83a5cdf`. Do not push.
8. Lock files. Confirm `8e9ceca` is on `main` and that `/workspace/app/lib/anthropic.mjs`, `/workspace/.claude/skills/newroaster/scripts/portrait.mjs`, and `/workspace/.env.example` are in it. Calls require loopback `ANTHROPIC_BASE_URL` and `KIE_AI_BASE_URL`. `api.anthropic.com`, `api.kie.ai`, and `kieai.redpandaai.co` are refused. `upstream` fetch URL is `https://github.com/nateherkai/roast-room.git`. `upstream` push URL is `file:///dev/null/refused-push-nateherkai-roast-room`. Do not call the public hosts. Do not push.
9. Pillar overlap. For Cagan, Ng, Munger, Doshi, and Jensen, quote the tension lines from `/workspace/.claude/skills/roast-room/references/seats.md` and say whether `_hot.md` "where this lens misfires" supports the same split. Name the existing seat they would duplicate (Graham, Hormozi, Elon, Buffett) if the tension line is only a slogan.
10. Colors. Confirm in `/workspace/.claude/skills/roast-room/roster.json` that `cagan`, `ng`, `munger`, `doshi`, and `jensen` are all `#5b7cfa`. That shared color is a cosmetic bug. Palette is in `add_seat.mjs`: `#22b8a0`, `#e05d9b`, `#c9a227`, `#5b7cfa`, `#ef7d32`, `#2fa4d6`, `#a3be3c`, `#b06ad9`, `#d6543f`, `#3fb37f`. Naval, Codie, and Sara already use the first three. Propose one unused color per new seat. Do not edit the roster unless asked.
11. Merge table. One row per seat: depth claimed, source bar met (yes/no), word bar met (yes/no), quote-check exit code, test consult present (yes/no), portrait present (yes/no), committed (yes/no), and one of `keep on call`, `refresh before merge`, `do not merge`. The recommendation must name the single check that decided it.

Return the table from item 11 even if you stop early. A seat with no quote-check line is not judged.
