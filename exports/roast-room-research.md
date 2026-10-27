---
cursor:
  subagentId: "bc-bc7c8b49-3343-5a14-8b50-51482b428401"
---

# Roast Room research

Checked on 2026-10-26 against `/workspace` and the five worktrees under `/tmp`. Nothing in `/workspace` was edited. Nothing was pushed. No council was started. `npm run smoke` and portrait generation were not run. `api.anthropic.com`, `api.kie.ai`, and `kieai.redpandaai.co` were not called.

Checkout matches the handoff. `main` is `8e9ceca`, parent `2f521eb`, and `git status -sb` prints `main...origin/main [ahead 2]`. Detail is in item 7.

Depth bars used below are the ones in `/workspace/.claude/skills/newroaster/SKILL.md`: quick is 12 to 20 sources and 80,000 words; standard is 30 to 50 sources and 250,000 words; deep is 80 sources and 500,000 words. File budgets are in `/workspace/.claude/skills/newroaster/references/brain-spec.md`. A `--quick` brain may run at about half the standard floor. That allowance lowers the floor. It leaves the ceiling where it is. It is used only for Ng and Jensen.

## Item 11. Merge table

| Seat | Depth claimed | Source bar met | Word bar met | Quote-check exit | Test consult | Portrait | Committed | Recommendation | Deciding check |
|---|---|---|---|---|---|---|---|---|---|
| Cagan | Standard source count. Not marked quick. | Yes. 50 is inside 30 to 50. | No. 93,731 against 250,000. | 0 | Yes | No | Yes, in `2f521eb` on `main`. Not pushed. | refresh before merge | Word floor. 93,731 words is far under the 250,000 standard floor. |
| Ng | Quick, by the count. 16 is inside 12 to 20. The files do not contain the flag `--quick`. | Yes. | Yes. 96,751 against 80,000. | 0 | Yes | No | Yes, in `2f521eb` on `main`. Not pushed. | refresh before merge | Newest dated source is `S002` on 2022-12-13. The skill asks for material from the last two years so positions can show current views. |
| Munger | Standard. 39 sources and 300,845 words. | Yes. 39 is inside 30 to 50. | Yes. 300,845 against 250,000. | 0 | Yes | No | Yes, in `2f521eb` on `main`. Not pushed. | keep on call | Both standard numbers are met, and the brain quote check exits 0. |
| Doshi | Neither band. 54 sources is above 30 to 50 and under 80. | No. | No. 66,381 is under 80,000 and under 250,000. | 0 | Yes | No | Yes, in `2f521eb` on `main`. Not pushed. | refresh before merge | Word floor. 66,381 words misses even the quick floor of 80,000. |
| Jensen | Quick. `/workspace/.claude/skills/roast-room/brains/jensen-huang/_hot.md` says "Quick depth." | Yes. 14 is inside 12 to 20. | Yes. 165,442 against 80,000. | 0 | Yes | No | Yes, in `2f521eb` on `main`. Not pushed. | keep on call | Both quick numbers are met, and the brain quote check exits 0. |

A placeholder portrait does not change a keep. The skill's no-key path leaves the drawn bust in place. None of the five failed the quote check or the eight-quote speaker sample, so none is marked `do not merge`.

`voice.md` for Munger is 902 words, over the 700-word ceiling. That miss is recorded in item 3. It is not the check that decided the keep. Jensen's 14 sources are one NVIDIA video series, including the fireside `S005`. That limit is recorded in item 2. It is not the check that decided the keep.

## 1. Quote check

Command, run from the script on `main`:

`node /workspace/.claude/skills/newroaster/scripts/check_quotes.mjs <build> <brain or notes>`

Brain folders are on `/workspace`. Build folders are in the worktrees. Every run printed one summary line. Failure counts are 0, so there is no `WRONG ID` or `NOT FOUND` line to paste.

| Seat | Target | Exit | Line |
|---|---|---|---|
| Cagan | `/workspace/.claude/skills/roast-room/brains/marty-cagan` | 0 | quotes verified: 370; wrong source id: 0; not found: 0 |
| Cagan | `/tmp/rr-cagan/build/marty-cagan/notes` | 0 | quotes verified: 680; wrong source id: 0; not found: 0 |
| Ng | `/workspace/.claude/skills/roast-room/brains/andrew-ng` | 0 | quotes verified: 320; wrong source id: 0; not found: 0 |
| Ng | `/tmp/rr-ng/build/andrew-ng/notes` | 0 | quotes verified: 419; wrong source id: 0; not found: 0 |
| Munger | `/workspace/.claude/skills/roast-room/brains/charlie-munger` | 0 | quotes verified: 311; wrong source id: 0; not found: 0 |
| Munger | `/tmp/rr-munger/build/charlie-munger/notes` | 0 | quotes verified: 1012; wrong source id: 0; not found: 0 |
| Doshi | `/workspace/.claude/skills/roast-room/brains/shreyas-doshi` | 0 | quotes verified: 324; wrong source id: 0; not found: 0 |
| Doshi | `/tmp/rr-doshi/build/shreyas-doshi/notes` | 0 | quotes verified: 822; wrong source id: 0; not found: 0 |
| Jensen | `/workspace/.claude/skills/roast-room/brains/jensen-huang` | 0 | quotes verified: 248; wrong source id: 0; not found: 0 |
| Jensen | `/tmp/rr-jensen/build/jensen-huang/notes` | 0 | quotes verified: 522; wrong source id: 0; not found: 0 |

Jensen's brain line matches the handoff: 248 verified, exit 0. The notes run is new in this check: 522 verified, exit 0.

Build directories used:

- `/tmp/rr-cagan/build/marty-cagan`
- `/tmp/rr-ng/build/andrew-ng`
- `/tmp/rr-munger/build/charlie-munger`
- `/tmp/rr-doshi/build/shreyas-doshi`
- `/tmp/rr-jensen/build/jensen-huang`

## 2. Manifest versus header

Command: `node /workspace/.claude/skills/newroaster/scripts/fetch.mjs <build> --manifest`

That flag only prints. It does not write `sources.json`. Each header below is line 3 of `sources.md` on `/workspace`. The bullet rows were summed separately. Each sum equals the manifest word count, and the bullet count equals the manifest source count.

| Seat | Manifest line | Header line | Match |
|---|---|---|---|
| Cagan | 50 sources, 93,731 words, 2006 to 2024 | 50 sources (1 video, 49 web), 93,731 words. | Counts and words match. The header has no year span. Manifest years are 2006 to 2024. |
| Ng | 16 sources, 96,751 words, 2007 to 2022 | 16 sources (15 pdf, 1 video), 96,751 words. | Counts and words match. The header has no year span. Manifest years are 2007 to 2022. |
| Munger | 39 sources, 300,845 words, 1986 to 2023 | 39 sources (39 web), 300,845 words. | Counts and words match. The header has no year span. Manifest years are 1986 to 2023. |
| Doshi | 54 sources, 66,381 words, 2018 to 2025 | 54 sources (2 video, 52 web), 66,381 words. | Counts and words match. The header has no year span. Manifest years are 2018 to 2025. |
| Jensen | 14 sources, 165,442 words, 2021 to 2026 | 14 sources (14 video), 165,442 words. | Counts and words match. The header has no year span. Manifest years are 2021 to 2026. |

Kind lines from the same manifest runs:

- Cagan: video 1 source, 14,716 words. Web 49 sources, 79,015 words. Short, under 800 words: S006, S007, S008, S009, S010, S011, S012, S016, S019, S021, S036, S039, S043. That is 13 sources.
- Ng: pdf 15 sources, 80,879 words. Video 1 source, 15,872 words. Short: S015.
- Munger: web 39 sources, 300,845 words. Short: S037.
- Doshi: video 2 sources, 21,660 words. Web 52 sources, 44,721 words. Short: S006, S007, and S025 through S055. That is 33 sources.
- Jensen: video 14 sources, 165,442 words. No short line.

Oldest and newest dates in each `sources.json`:

- Cagan: S002 on 2006-06-01, S050 on 2024-07-09. No undated row.
- Ng: S015 on 2007-11-06, S002 on 2022-12-13. S016 has an empty date.
- Munger: S001 on 1986-06-13, S039 on 2023-12-05. No undated row.
- Doshi: S011 on 2018-10-26, S007 on 2025-07-31. No undated row. There is no S004. Ids go S001, S002, S003, S005, then through S055. `/workspace/.claude/skills/roast-room/brains/shreyas-doshi/voice.md` says "There is no S004."
- Jensen: S001 on 2021-11-09, S014 on 2026-06-01. No undated row.

`/workspace/.claude/skills/newroaster/SKILL.md` step 2 says to look for recent material from the last two years, and a spread of years. From 2026-10-26, two years reaches back to 2024-10-26.

- Cagan's newest file is 2024-07-09, about three months older than that window. The year spread 2006 to 2024 is real.
- Ng's newest dated file is 2022-12-13. That is the deciding check in the table.
- Munger's newest file is 2023-12-05. This check did not search for a later public source. The keep does not depend on a newer file.
- Doshi's newest file is 2025-07-31, inside the window. The spread is 2018 to 2025.
- Jensen's newest file is 2026-06-01, inside the window. The spread is 2021 to 2026.

Jensen's 14 files are all `video`. Thirteen are keynotes. S005 is "Fireside Chat with Ilya Sutskever and Jensen Huang" (2023-03-22). The hot sheet's opening line calls the set 14 NVIDIA keynotes, and the same paragraph names the fireside. One series, two speakers in one of the fourteen files.

Ng's 16 files are one interview (S003, Lex Fridman, 2020-02-20), Machine Learning Yearning (S001, a GitHub PDF of the draft, dated 2018), the career ebook (S002, 2022-12-13), and 13 CS229 lecture-note PDFs. The notes name Andrew Ng on the first page. See `/tmp/rr-ng/build/andrew-ng/corpus/S004-cs229-lecture-notes-regularization-and-model-selection.md`.

## 3. Spec budgets

`wc -w` on the files under `/workspace/.claude/skills/roast-room/brains/<slug>/`.

Entry counts: a framework is a `##` heading. A principle or a story is a numbered bold item, and the file's own header states the same count. A position is a `##` heading. Jensen's last position heading is a list of topics with no recorded position, counted separately.

Standard ranges from `brain-spec.md`: `_hot.md` 600 to 800 words, `voice.md` 400 to 700, frameworks 12 to 25, principles 15 to 30, positions 20 to 40, stories 10 to 20. Quick floors used here are about half of those floors: hot 300, voice 200, frameworks 6, principles 8, positions 10, stories 5. Ceilings stay at the standard tops.

| Seat | Hot words | Hot | Voice words | Voice | Frameworks | Principles | Positions | Stories |
|---|---|---|---|---|---|---|---|---|
| Cagan | 799 | Pass | 699 | Pass | 20 pass | 27 pass | 38 pass | 16 pass |
| Ng | 798 | Pass | 700 | Pass | 21 pass | 28 pass | 40 pass | 20 pass |
| Munger | 799 | Pass | 902 | Fail | 19 pass | 26 pass | 37 pass | 18 pass |
| Doshi | 800 | Pass | 568 | Pass | 24 pass | 26 pass | 35 pass | 16 pass |
| Jensen | 795 | Pass | 692 | Pass | 10 pass on the quick floor, short of the standard floor of 12 | 15 pass | 19 headed topics, pass on the quick floor | 9 pass on the quick floor, short of the standard floor of 10 |

Ng and Jensen also clear the unreduced hot and voice bands, so they are not using the half allowance for those two files. Jensen needs it for frameworks (10 against a floor of 12), stories (9 against a floor of 10), and headed position topics (19 against a floor of 20).

Jensen's position file has 19 argued topics and then a heading "No recorded position" with 15 one-line absences: discounting, raising money, debt, first hire, firing, equity, side projects, niche, content, paid ads, remote work, work hours, burnout, selling the company, culture. Counted as topics the way the spec describes a silent topic, that is 34, inside 20 to 40. Counted as argued headings only, it is 19.

Each hot sheet has 8 numbered rules, 5 frameworks, a 6-step decision loop, and a section "Where this lens misfires". All eight brain files exist for each seat, including `books.md`. Jensen's `books.md` is the no-book line: no book is in the corpus, and the body of work is the keynote series S001 through S014.

Munger's voice miss is 202 words over 700. The other four voice files are inside 400 to 700. Doshi's hot file is 800 words, the top of the band.

## 4. Doshi batches

`ls -l /tmp/rr-doshi/build/shreyas-doshi/notes` shows six files. Three are extraction notes. Three are source lists that sit beside them.

| File | Bytes | Words (`wc -w`) | What it is |
|---|---|---|---|
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-01.md` | 29,415 | 5,023 | Extraction notes for S001 and S002. |
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-01-sources.txt` | 360 | 33 | Source list for that batch. |
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-02.md` | 65,379 | 10,769 | Extraction notes for S003 and S005 through S016, plus a short S004 section. |
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-02-sources.txt` | 2,805 | 286 | Source list. It still names S004. |
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-03.md` | 93,035 | 15,178 | Extraction notes for S017 through S055. |
| `/tmp/rr-doshi/build/shreyas-doshi/notes/batch-03-sources.txt` | 9,074 | 965 | Source list for that batch. |

Corpus words behind the three note files, from `sources.json`:

- Batch 01: S001 and S002, 21,660 words.
- Batch 02: the 13 sources that exist (S003, S005 through S016), 21,688 words.
- Batch 03: S017 through S055, 39 sources, 23,033 words.

21,660 + 21,688 + 23,033 = 66,381. Each note file is a real batch of about 22,000 corpus words. The skill's split is about 50,000 words a batch. These three are smaller than that split. They are not leftover empty batches. The handoff's "six note batches" counts the source-list files with the notes.

S004 is a heading inside `batch-02.md`, lines 39 to 42. The note says the document is a generated summary of other people's replies, that it does not represent any one person, and that nothing in it should be quoted. There is no `corpus/S004-*.md` and no S004 row in `sources.json`. The brain tells the reader there is no S004. The quote check still exits 0, because no checked quote depends on a missing S004 file.

Brain quotes cite source ids, not batch file names. Every source in batch 01 is cited. Every existing source in batch 02 is cited. Batch 03 is cited as a batch. Ten of its source ids have no quote attached in the brain: S018, S020, S032, S039, S040, S042, S046, S049, S051, S055. No whole batch is uncited.

`/workspace/.claude/skills/roast-room/brains/shreyas-doshi/principles.md` and `stories.md` both say they were built from batches 01 to 03.

## 5. Speaker check

Eight quotes per brain, taken from files other than `sources.md`, spread across source ids, and aimed at the files where a second speaker is likely. Normalized text uses the same folding as `check_quotes.mjs`. "In file" means that normalized quote is in the cited corpus file. One host line would mark the seat refresh. None of these 40 lines is a host line.

### Cagan

| # | Brain line | Corpus | In file | Speaker |
|---|---|---|---|---|
| 1 | `_hot.md:13` (S001). "You just don't get points for shipping, you get points for delivering the value." | `/tmp/rr-cagan/build/marty-cagan/corpus/S001-product-management-theater-lenny-s-podcast.md` | Yes | Marty Cagan. The label above the line is `Marty Cagan (00:21:01)`. The quote sits at `(00:21:57)` with no new Lenny label in between. |
| 2 | `positions.md:69` (S047). "the company had experimented with advertising, and this did provide a modest uplift..." | `/tmp/rr-cagan/build/marty-cagan/corpus/S047-the-product-model-at-amazon.md` | Yes | The byline is "By Marty Cagan and Richard Russell." The sentence is the article's narration. It is not a host. |
| 3 | `positions.md:215` (S017). "this is design by committee and it rarely yields anything beyond mediocrity." | `/tmp/rr-cagan/build/marty-cagan/corpus/S017-behind-every-great-product.md` | Yes | Cagan's essay. He is describing a way a product manager can work. |
| 4 | `frameworks.md:60` (S020). "One of the most enduring myths in the product world is that great products result from listening to your customers..." | `/tmp/rr-cagan/build/marty-cagan/corpus/S020-customer-inspired-technology-enabled.md` | Yes | Opening sentence of his SVPG essay. |
| 5 | `_hot.md:17` (S002). "Winning products come from the deep understanding of the user's needs..." | `/tmp/rr-cagan/build/marty-cagan/corpus/S002-market-research-capabilities-and-limitations.md` | Yes | His 2006 essay. The corpus uses a curly apostrophe in "user's". The normalized form matches. |
| 6 | `_hot.md:57` (S050). "If you're not working with a team of engineers to build something new, it's not for you." | `/tmp/rr-cagan/build/marty-cagan/corpus/S050-the-product-model-in-traditional-it.md` | Yes | Byline "By Marty Cagan and Chris Jones." The sentence is in their "we" paragraph about who the product model is for. |
| 7 | `_hot.md:19` (S026). "So, we need to pick our battles based on what really matters..." | `/tmp/rr-cagan/build/marty-cagan/corpus/S026-product-strategy-focus.md` | Yes | His essay. |
| 8 | `positions.md:47` (S044). "This focus meant saying no to many other potential opportunities, and postponing or discontinuing others." | `/tmp/rr-cagan/build/marty-cagan/corpus/S044-the-product-model-at-spotify.md` | Yes | His essay about Spotify. He is the narrator. |

Samples 2 and 6 are co-authored articles he signed. They are counted as his. They are not a second guest taking the line.

### Ng

| # | Brain line | Corpus | In file | Speaker |
|---|---|---|---|---|
| 1 | `_hot.md:18` (S003). "I've seen a lot more companies fail by starting too big than by starting too small." | `/tmp/rr-ng/build/andrew-ng/corpus/S003-andrew-ng-deep-learning-education-and-real-world-ai-lex-frid.md` | Yes | Ng answering. The lines just before are the host asking for the first step. The answer begins "I published a document called the AI Transformation Playbook..." |
| 2 | `_hot.md:13` (S001). "These two hours could save you a month of wasted effort." | `/tmp/rr-ng/build/andrew-ng/corpus/S001-machine-learning-yearning-draft.md` | Yes | His draft. First person, "I've seen many engineers..." |
| 3 | `_hot.md:19` (S002). "Identify a business problem (not an AI problem)." | `/tmp/rr-ng/build/andrew-ng/corpus/S002-how-to-build-your-career-in-ai.md` | Yes | His career ebook, step 1, in his "I". |
| 4 | `frameworks.md:44` (S004). "This algorithm does not work." | `/tmp/rr-ng/build/andrew-ng/corpus/S004-cs229-lecture-notes-regularization-and-model-selection.md` | Yes | Lecture notes headed "Andrew Ng". Didactic "we", not an interviewer. |
| 5 | `positions.md:9` (S006). "makes the choice of features less critical." | `/tmp/rr-ng/build/andrew-ng/corpus/S006-cs229-lecture-notes-supervised-learning.md` | Yes | Same notes series, his name on the companion files. |
| 6 | `positions.md:9` (S005). "even if we were fitting a linear model to a very large amount of training data..." | `/tmp/rr-ng/build/andrew-ng/corpus/S005-cs229-lecture-notes-learning-theory.md` | Yes | Same notes series. |
| 7 | `positions.md:8` (S016). "does not have an explicit dependence on the number of examples m..." | `/tmp/rr-ng/build/andrew-ng/corpus/S016-cs229-lecture-notes-the-perceptron-and-large-margin-classifi.md` | Yes | Same notes series. Header on the file is the CS229 winter notes. |
| 8 | `frameworks.md:84` (S007). "Logistic regression makes weaker assumptions, and is significantly more robust to deviations from modeling assumptions." | `/tmp/rr-ng/build/andrew-ng/corpus/S007-cs229-lecture-notes-generative-learning-algorithms.md` | Yes | Same notes series. |

### Munger

| # | Brain line | Corpus | In file | Speaker |
|---|---|---|---|---|
| 1 | `_hot.md:19` (S028). "If the incentives are wrong, the behavior will be wrong. I guarantee it." | `/tmp/rr-munger/build/charlie-munger/corpus/S028-daily-journal-2015-annual-meeting-detailed-notes.md` | Yes | Munger, first person, on hospital incentives. |
| 2 | `_hot.md:61` (S032). "I don't think you're going to get the kind of results we got by just doing what we did." | `/tmp/rr-munger/build/charlie-munger/corpus/S032-daily-journal-2018-annual-meeting-transcript.md` | Yes | Charlie. The transcript labels him `**Charlie:**`. This sentence continues that answer, after Peter Kaufman's turn has ended. The file says audience questions were summarized and Charlie's words were kept. The corpus uses curly apostrophes, so a raw search needs that fold. |
| 3 | `frameworks.md:151` (S027). "It never had the equivalent of a department of acquisitions under pressure to buy." | `/tmp/rr-munger/build/charlie-munger/corpus/S027-berkshire-hathaway-2014-report-vice-chairman-s-thoughts-past.md` | Yes | His vice chairman's letter. The corpus puts quotation marks around "department of acquisitions". Normalization drops them. |
| 4 | `frameworks.md:102` (S012). "the consequences have consequences, and the consequences of the consequences have consequences" | `/tmp/rr-munger/build/charlie-munger/corpus/S012-academic-economics-strengths-and-faults-ucsb-tilson-transcri.md` | Yes | His UCSB talk. |
| 5 | `_hot.md:20` (S003). "To the man with only a hammer, every problem looks like a nail." | `/tmp/rr-munger/build/charlie-munger/corpus/S003-a-lesson-on-elementary-worldly-wisdom-usc-business-school-oi.md` | Yes | Labeled `Munger:`. He is quoting an old saying. He is the speaker. |
| 6 | `_hot.md:23` (S004). "You just constantly take your own assumptions and try to disprove them." | `/tmp/rr-munger/build/charlie-munger/corpus/S004-worldly-wisdom-revisited-stanford-law-school-oid-1997-1998.md` | Yes | His Stanford talk. |
| 7 | `_hot.md:17` (S001). "many hard problems are best solved only when they are addressed backward" | `/tmp/rr-munger/build/charlie-munger/corpus/S001-harvard-school-commencement-how-to-guarantee-a-life-of-miser.md` | Yes | His commencement text. |
| 8 | `positions.md:174` (S037). "A cryptocurrency is not a currency, not a commodity, and not a security." | `/tmp/rr-munger/build/charlie-munger/corpus/S037-wall-street-journal-why-america-should-ban-crypto.md` | Yes | His Wall Street Journal piece. |

### Doshi

| # | Brain line | Corpus | In file | Speaker |
|---|---|---|---|---|
| 1 | `_hot.md:13` (S001). "you should stop doing work that simply provides a positive return on investment, ROI..." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S001-the-art-of-product-management-lenny-s-podcast.md` | Yes | Labeled `Shreyas Doshi (01:02:47)`. Lenny asks the question. Doshi answers. |
| 2 | `_hot.md:16` (S002). "thinking is cheap, so you should do more thinking, not less." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S002-lenny-and-friends-summit-live-with-shreyas-doshi.md` | Yes | Labeled `Shreyas Doshi (25:37)`. The next label is Lenny. |
| 3 | `frameworks.md:140` (S016). "The Eigenquestion is the question, which, if answered, provides the basis for answering most other substantial questions associated with this decision." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S016-a-good-heuristic-from-bbalfour-related-to-key-metrics-source.md` | Yes | Doshi's own thread at `https://x.com/shreyas/status/1304628734754828289`. The thread credits Brian Balfour for a metrics heuristic and credits `@shishirmehrotra` as the creator of the eigenquestion. This definition sentence is in Doshi's post. It is not marked as someone else's line. |
| 4 | `_hot.md:15` (S003). "Leverage tasks: where the effort has a 10x (or even 100x) return." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S003-lno-framework-coda-essay.md` | Yes | His Coda essay, first person. |
| 5 | `_hot.md:18` (S008). "This product should not have been built in the first place." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S008-product-failure-is-expensive-and-look-around-it-s-common-why.md` | Yes | His thread, telling the product-failure case. |
| 6 | `frameworks.md:172` (S021). "The most useful part of the Agreed Target Quality framework is the common lexicon." | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S021-jeffseibert-jump-to-the-part-of-the-talk-that-describes-how-.md` | Yes | His thread. The next words are "I've adapted this..." |
| 7 | `positions.md:49` (S017). "you need to be the captain who just avoids the iceberg" | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S017-boy-is-now-falling-yells.md` | Yes | His thread, addressed to product leaders. |
| 8 | `books.md:46` (S028). "Execution is everything, Strategy is only for MBAs" | `/tmp/rr-doshi/build/shreyas-doshi/corpus/S028-a-brief-thread-on-impact-execution-strategy-market-for-produ.md` | Yes | His thread. He is quoting a slogan in order to reject it. He is the speaker of the sentence. |

### Jensen

| # | Brain line | Corpus | In file | Speaker |
|---|---|---|---|---|
| 1 | `voice.md:32` (S005). "It is truly remarkable what you've accomplished." | `/tmp/rr-jensen/build/jensen-huang/corpus/S005-fireside-chat-with-ilya-sutskever-and-jensen-huang-ai-today-.md` | Yes | Jensen, talking to Ilya. The next sentence is "It's great to catch up with you again Ilya, my good friend." The "you" is Ilya. The speaker is Jensen. |
| 2 | `_hot.md:14` (S008). "Software inertia is the single most important thing in computers." | `/tmp/rr-jensen/build/jensen-huang/corpus/S008-nvidia-ceo-jensen-huang-keynote-at-computex-2024.md` | Yes | His COMPUTEX keynote, first person "we" and "our" through the preceding minute. |
| 3 | `frameworks.md:49` (S011). "They are revenue generating facilities, and they are designed to manufacture tokens." | `/tmp/rr-jensen/build/jensen-huang/corpus/S011-gtc-paris-keynote-at-vivatech.md` | Yes | His VivaTech keynote. |
| 4 | `_hot.md:20` (S014). "The more you buy, the more you make." | `/tmp/rr-jensen/build/jensen-huang/corpus/S014-gtc-taipei-2026-keynote-with-jensen-huang.md` | Yes | His Taipei keynote. The surrounding minute is his tokens-per-watt argument. The corpus has the lowercase "the more you buy". |
| 5 | `positions.md:41` (S006). "This took several years to do, a couple, two and a half years for us to make VMware be CUDA compatible..." | `/tmp/rr-jensen/build/jensen-huang/corpus/S006-nvidia-keynote-at-siggraph-2023.md` | Yes | His SIGGRAPH keynote. |
| 6 | `_hot.md:20` (S001). "The more you buy, the more you save." | `/tmp/rr-jensen/build/jensen-huang/corpus/S001-gtc-2021-keynote-november.md` | Yes | His 2021 keynote. |
| 7 | `_hot.md:13` (S013). "Accelerated computing is not a chip problem." | `/tmp/rr-jensen/build/jensen-huang/corpus/S013-gtc-2026-keynote.md` | Yes | His 2026 keynote. He has just said NVIDIA is vertically integrated. |
| 8 | `_hot.md:18` (S010). "every single data center in the future will be power limited your revenues are power limited" | `/tmp/rr-jensen/build/jensen-huang/corpus/S010-gtc-2025-keynote.md` | Yes | His 2025 keynote. |

## 6. Step 9

`test-consult.md` exists in each build folder. The same checker, pointed at that file:

| Seat | File | Exit | Line |
|---|---|---|---|
| Cagan | `/tmp/rr-cagan/build/marty-cagan/test-consult.md` | 0 | quotes verified: 11; wrong source id: 0; not found: 0 |
| Ng | `/tmp/rr-ng/build/andrew-ng/test-consult.md` | 0 | quotes verified: 10; wrong source id: 0; not found: 0 |
| Munger | `/tmp/rr-munger/build/charlie-munger/test-consult.md` | 0 | quotes verified: 3; wrong source id: 0; not found: 0 |
| Doshi | `/tmp/rr-doshi/build/shreyas-doshi/test-consult.md` | 0 | quotes verified: 2; wrong source id: 0; not found: 0 |
| Jensen | `/tmp/rr-jensen/build/jensen-huang/test-consult.md` | 0 | quotes verified: 8; wrong source id: 0; not found: 0 |

The step 9 bar in the skill is first person, does not claim to be the person, names a framework with a source id, and owns the pillar. The consult files do not contain a sentence that says "I am not [name]". The agent files do. Each consult speaks as the seat and does not claim the real name. That is a yes on the refusal test.

| Seat | First person | Does not claim to be the person | Framework with a source id | Owns the roster question |
|---|---|---|---|---|
| Cagan | Yes. "I grant the contract." | Yes | Yes. Four big risks (S042). | Yes. The answer refuses to build the five contracted features until a test shows what users do. |
| Ng | Yes. "I think the early unsupervised bet was the miss." | Yes | Yes. Error analysis, S001. Bias, variance, optimal error, S001. | Yes. The answer refuses the raise and the generator, and sends the week into labels and error counts. |
| Munger | Yes. "I do not know the monthly number, so the math stays rough." | Yes | Yes. Inversion, S001. Lollapalooza effects, S004. | Yes. The answer names how the raise fails and leaves the new market on the too-hard pile. |
| Doshi | Yes. "I have started a quarter there." | Yes | Yes. LNO, S003. Opportunity cost, S001. | Yes. The answer picks one bet and names the work the team will not do. |
| Jensen | Yes. "I score this plan a 1." | Yes | Yes. Full stack versus an application, S004. | Yes. The answer keeps the assistant on the rented platform and refuses the eighteen-month stack. |

## 7. Commits, roster, worktrees

Commands and results:

- `git -C /workspace rev-parse --short HEAD` is `8e9ceca`. Full hash `8e9ceca9110a029587241e99eb0c1c3e1de9e6bf`.
- Parent is `2f521eb` (`2f521eb0f02f6741e60f5016a90b64b5dd0e4a23`), message "Add Cagan, Ng, Munger, Doshi, and Jensen as on-call advisors".
- `git -C /workspace status -sb` prints `## main...origin/main [ahead 2]`.
- `git -C /workspace status --porcelain` is empty.
- `git -C /workspace log --oneline origin/main..HEAD` prints `8e9ceca` then `2f521eb`. The local `origin/main` ref is `e40f406`. This check did not fetch.
- `git -C /workspace worktree list`:

| Path | HEAD | Branch |
|---|---|---|
| `/workspace` | `8e9ceca` | `main` |
| `/tmp/rr-cagan` | `f5bac87` | `seat-cagan` |
| `/tmp/rr-ng` | `db32aec` | `seat-ng` |
| `/tmp/rr-munger` | `b4e621a` | `seat-munger` |
| `/tmp/rr-doshi` | `edd0905` | `seat-doshi` |
| `/tmp/rr-jensen` | `83a5cdf` | `seat-jensen` |

Those five heads are the commits named in the handoff.

`/workspace/.claude/skills/roast-room/roster.json`: `"board"` is `"ask"`. `"default"` is `bezos`, `graham`, `hormozi`, `garyvee`, `martell`, `wickman`, `buffett`. Keys `cagan`, `ng`, `munger`, `doshi`, and `jensen` are in `"seats"` and are absent from `"default"`. The same five keys are already in `roster.json` at `2f521eb`.

Each seat has the eight brain files, an agent at `/workspace/.claude/agents/council-<key>.md`, and tension lines in `/workspace/.claude/skills/roast-room/references/seats.md`. `git ls-files` tracks all 40 brain files and all 5 agent files. Each agent frontmatter sets `tools: Read, Grep, Glob` and `maxTurns: 12`. A search for a colon followed by a space inside those five `description` fields finds none.

No portrait frames:

`ls /workspace/app/public/portraits/{cagan,ng,munger,doshi,jensen}-*` finds no files.

## 8. Lock files

`8e9ceca` is on `main`. Its parent is `2f521eb`. The commit message is "Lock Anthropic and portrait calls to loopback". `git diff-tree --no-commit-id --name-only -r 8e9ceca` lists only:

- `/workspace/app/lib/anthropic.mjs`
- `/workspace/.claude/skills/newroaster/scripts/portrait.mjs`
- `/workspace/.env.example`

What those files say:

- `anthropic.mjs` sends messages only when `ANTHROPIC_BASE_URL` is `http` or `https` on `localhost`, `127.0.0.1`, or `::1`. The error text names `https://api.anthropic.com` and says there is no public fallback. Redirects are checked again.
- `portrait.mjs` requires `KIE_AI_BASE_URL` on the same three hosts. The error text names `kie.ai` and `kieai.redpandaai.co` and says there is no public fallback. The literal string `api.kie.ai` is not in this file. `api.kie.ai` is still refused, because it is not one of the three loopback hosts. Upload, job create, record poll, credit probe, photo download, and result download all go through that check.
- `.env.example` sets `COUNCIL_RUNNER=viewer`. It says only loopback is accepted, names `https://api.anthropic.com`, and names `kie.ai` and `kieai.redpandaai.co`. The sample base URLs are commented: `http://127.0.0.1:8080` and `http://127.0.0.1:8081`.

Remotes, as `git remote -v` reports them, with credentials left out:

- `origin` fetch and push: `https://github.com/nakulz/roast-room-na`
- `upstream` fetch: `https://github.com/nateherkai/roast-room.git`
- `upstream` push: `file:///dev/null/refused-push-nateherkai-roast-room`

Nothing was pushed. The public hosts were not called.

## 9. Pillar overlap

Tension lines are quoted from `/workspace/.claude/skills/roast-room/references/seats.md`. The misfire sections are in each `_hot.md`. A slogan would be a line the misfire section does not support, aimed at a seat this brain would otherwise copy.

### Cagan

Tension lines:

- "Cagan (test the risk before you build, two or three problems, founder keeps the product until about 20 to 25 engineers) against Hormozi and Gary V (close and get attention now) and against Martell (hire so the founder can leave the work)."
- "Cagan and Graham agree people have to want it, and split on learning by launching versus prototypes before a date. Cagan and Elon split on discovery before a commitment versus deleting the step and shipping. Cagan and Wickman split on principles over process versus a cadence that owns the work."

Misfires that carry the same split:

- "A strong founder, early." The quote is "At a certain number of engineers, usually 20 to 25, it's a lot better if the co-founder is the product person for that." (S001). That is the Martell split: do not hire the product manager so the founder can leave the work.
- "Nothing risky, or the date must win." Skip discovery when nothing is a major risk. "innovation is more important than predictability" (S001) fights a business whose product is a fixed date. That is the Graham split on launching to a date, stated as a limit of this lens.
- "Not a team that builds." "If you're not working with a team of engineers to build something new, it's not for you." (S050).

The Hormozi, Gary V, Elon, and Wickman names are not in the misfire section. The rules are. Rule 3 is to validate the fastest, cheapest way. Rule 7 is two or three battles. The decision loop asks which risk is untested and whether it can be tested in days, and it leaves value and viability with the founder until about 20 to 25 engineers. That is a discovery seat. It would duplicate Graham only if the brain stopped at "people have to want it." It does not.

### Ng

Tension lines:

- "Ng (does this data move the model) against Gary V (attention and content volume) and Elon (delete the step and ship the demo). Ng agrees with Elon and Graham on a basic system and talking to reality, and splits when a demo or a bigger model stands in for counting errors."
- "Ng concedes pricing and offers to Hormozi and capital to Buffett, and anything that is not a scored ML system. Small-data factory rules stay on small sets. Do not export them to a billion-user product, or the reverse."

Misfires:

- "Not an ML system. Pricing, brand, a one-off service, and whether to raise have no recorded position. Defer money to Buffett and offers to Hormozi." That is the concession line.
- "Internet scale versus a hundred examples." Averaging noisy labels is fine with a billion users and a bad idea with a hundred. "Do not export the factory rule to a consumer ranking problem, or the reverse." That is the small-data line.
- "Humans cannot do the task." Error analysis gets weak when people cannot label the right answer.

The Gary V and Elon names are not in the misfire section. The split with a demo is in the rules: count before you build (S001), and a laptop score is not a deployment (S003). He would duplicate Elon if the brain were only "start small and ship." The brain's next move is to count the errors. He would duplicate Graham if the question were only whether people want it. The question he owns is whether the data moves the model.

### Munger

Tension lines:

- "Munger (invert first, wait for the easy chance, kill the path that fails the basic models) against Musk (delete the step and build it now) and Hormozi (more offer, more volume, close this week)."
- "Munger and Buffett share the circle, the incentives test, and the refusal of ruin. They split when the move is a new venture or a crowded product: Buffett will pay a fair price for a wonderful business he understands, and Munger still treats a venture bet as something he hates and would rather not start."

Misfires:

- "Seed stage. He buys businesses that already work and hates a venture bet (S028)." That is the Buffett split, and it is the opposite of starting a venture because the model is not obvious yet.
- "Berkshire habits on a small firm." The quote is "I don't think you're going to get the kind of results we got by just doing what we did." (S032). Years of sitting still fit permanent capital. They do not fit a founder hunting the first customers.
- "Stall." The failure list is not a reason to skip a small reversible step. That limits the anti-Musk line. He concedes a small reversible step.

He would duplicate Buffett if the misfire were only the circle and the incentives. The venture-bet line and the small-firm line are the split. The Hormozi name is not in the misfire section. The rules cover it by a different path: bet seldom, and reject anything worse than the best use already in hand (S003, S033).

### Doshi

Tension lines:

- "Doshi (which bet deserves the focus, and what the team will explicitly leave undone) against Hormozi (more offers, more volume) and Elon (delete the step and go now). Doshi and Graham agree that a product nobody wants is a waste, and they split when Graham wants the smallest ship this week and Doshi wants a pause to name the strategy and the not-do list. When a bet truly unwinds, Doshi concedes the reversibility point to Bezos."

Misfires:

- A two-person company with one bet should leave the $100 million bar and the 60/30/10 portfolio alone (S001).
- "An early team with a reasonable hypothesis should optimize for execution (S001). Demanding strategy first can stall a team that has not shipped." That is the limit on the pause. It matches rule 8: "most early stage teams should actually optimize for execution." (S001).
- "most doors that look like two-way doors are actually one-way doors." (S002). The hot sheet says that line is about feature debt, and that when a bet truly unwinds, the reversibility point stands. That is the Bezos concession, in his words.

The Hormozi and Elon names are not in the misfire section. The not-do list is the worldview: positive ROI is the wrong bar, and the rest of the work is named as work the team will not do. He would duplicate Graham if the brain were only "a product nobody wants is a waste." The brain's next demand is the list of positive-ROI work that stays undone.

### Jensen

Tension lines:

- "Jensen (own the layer that sets speed and cost, keep the install base compatible, judge tokens per watt) against Graham (do the unscalable thing and stay close to users) and Elon (delete the step and ship the faster crude version). Jensen and Elon agree the old general-purpose curve is dead, and split when a new chip strands software people already run."
- "Jensen (multi-year factory, the more you buy the more you make) against Buffett (cash, and wait for the fat pitch). He concedes when the founder cannot fund the factory or survive a miss. Naval pushes him when a small team is rebuilding a layer a platform already ships."

Misfires:

- "A seed company is not NVIDIA." CUDA took about twenty years and most of the profits (S013). "Own the one layer that sets the outcome. Take the rest from a platform that already has the users." That is the Naval line and the Graham line: do not copy the multi-year factory when you are seven people.
- "The more you buy, the more you make." (S014) fits a factory that sells tokens. "No developers is still a no."
- "Defer to Martell, Leila, Hormozi, Gary V, and Buffett" on hiring, equity, debt, discounting, ads, and selling the company, and when the founder cannot fund the factory. That is the Buffett concession.
- "A small team still deletes a useless layer." That is the limit on the anti-Elon line. He concedes the deletion when the team is small.

He would duplicate Elon if the brain were only "ship the whole stack faster." The misfire tells a seed company to rent the platform and own one layer. The install-base rule is the split with a new chip that strands old software: "Software inertia is the single most important thing in computers." (S008).

## 10. Colors

In `/workspace/.claude/skills/roast-room/roster.json`, these five colors are all `#5b7cfa`:

- `cagan`
- `ng`
- `munger`
- `doshi`
- `jensen`

The palette in `/workspace/.claude/skills/newroaster/scripts/add_seat.mjs` is:

`#22b8a0`, `#e05d9b`, `#c9a227`, `#5b7cfa`, `#ef7d32`, `#2fa4d6`, `#a3be3c`, `#b06ad9`, `#d6543f`, `#3fb37f`

Already taken from that palette:

- Naval `#22b8a0`
- Codie (key `sanchez`) `#e05d9b`
- Sara (key `blakely`) `#c9a227`
- The five new seats, sharing `#5b7cfa`

The original seven, Leila (`#8fbf3a`), and Elon (`#c0392b`) use colors outside this list. They do not consume the remaining palette entries.

Unused palette colors: `#ef7d32`, `#2fa4d6`, `#a3be3c`, `#b06ad9`, `#d6543f`, `#3fb37f`.

Proposed assignment, one unused color per new seat. `roster.json` was not edited.

| Seat | Proposed color |
|---|---|
| Cagan | `#ef7d32` |
| Ng | `#2fa4d6` |
| Munger | `#a3be3c` |
| Doshi | `#b06ad9` |
| Jensen | `#d6543f` |

`#3fb37f` stays unused. If those five move off `#5b7cfa`, that blue returns to the free list as well.
