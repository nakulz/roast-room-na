# Roast Room: how to aim CDF before CDF Next

2026-10-26 · Seats: Jensen, Elon, Graham, Bezos, Cagan, Doshi, Ng, Munger · Rounds: 3 · Mode: named seats

This memo restates `verdict.md`. The council was not rerun. `verdict.md` and `verdict.json` are unchanged. This session has no research packet, so nothing here is an opened fact with an R or F id.

## Verdict: GO WITH CONDITIONS

**Decision:** Keep the five fixed blueprints as what CDF ships through GTC San Jose in March 2027, spend the two quarters counting on one blueprint how many downstream misses come from the DAG being fixed, and let a pass on 31 January 2027 reopen A and narrow B without starting either one.

1. Inference, not a measurement: a small share of downstream misses can lift samples per watt and leave the model unmoved, so the gate is a proposed 50 of 100 on the blueprint a team already runs, counted before any stitch (Ng, error analysis). Jensen conceded this in Round 2. Bezos and Munger used the same 50. That count is not in this record.
2. The room refused to delete the five before GTC or to ship four new surfaces into that date (Bezos, Type 1 and Type 2; Jensen, install base). "Install base" is the seats' claim. The brief does not count GPUs or teams.
3. The window holds one bet, the count, not brief A and not brief B (Doshi, opportunity cost; Graham, a named team first).

Option scores: A 2.8 · B 3.2 · C 7.4 · Support for the resolution 6.6/10 · Confidence 6/10 · Spread 1 · Vote: 0 endorse, 8 amend, 0 dissent

Round 2 had C at 5.5 (RESHAPE). With the conditions, Round 3 scores C at 7.4 (GO WITH CONDITIONS). Support of 6.6 is for the draft as written. The amendments close the early prototype that draft allowed. These are council scores, not product measurements.

## Conditions

Each one would change the action. Dates and miss counts are proposed gates, not measurements.

1. All five blueprints still run on customer GPUs at GTC San Jose in March 2027.
2. By 1 November 2026, tag about 20 misses on AV or defect (bad label, synthetic tell, coverage, or orchestration) before any roadmap change. One fixed-DAG tag in those 20 does not open a prototype.
3. By 30 November 2026, count external teams that ran a blueprint on their own GPUs in the prior 30 days. Zero means one hand install and no new system. If the five take the whole team, no platform work.
4. By 31 January 2027, count about 100 locked misses on that fixed blueprint for one named user, before any prototype. Through February 2027 one owner keeps a not-do list: no second vertical, no four-part platform. The existing evaluator stays the gauge. Orchestration stays Airflow and Kubernetes. That owner is not named.
5. Reopen only if the fixed DAG is at least 50 of 100, the team reran the blueprint twice with no NVIDIA engineer and the first break fixed, one named customer is blocked, and hours remain. A pass reopens A and narrow B before 14 February 2027 and starts neither.
6. A stitch becomes the product only after it beats the reference on those misses, most of six current users stay on it, and evaluator-passed samples per watt win on the same GPU box. "Six current users" is the verdict's stay test. This record has no opened user count.

## Minority report

No seat voted dissent. Jensen's amendment is the strongest objection.

Jensen endorsed with this amendment: "The 31 January gate allows a stitch beside fixed AV on one GPU box only after a samples-per-watt win and 20 of 100 locked misses, with one partner taking one skill and keeping their data, and it leaves 50 of 100 as the bar to reopen A or full B."

That holds if the side-by-side wins on evaluator-passed samples per watt, at least 20 of 100 misses are the fixed DAG, AV still runs, and one partner takes one skill and keeps their data. The reopen bar stays 50. He conceded in Round 2 that a small share can leave the model unmoved. His 20 of 100 was not adopted as the reopen bar.

## Evidence

Opened facts: none. No research packet and no R or F id. A seat's line is not a new fact about CDF.

User-supplied, from the brief: CDF is NVIDIA's Cosmos Data Factory. Blueprints and skills turn real data into a labeled training set for physical AI, on the customer's GPUs, on premises or in a cloud they choose. Repo https://github.com/NVIDIA/cosmos-data-factory, created 2026-05-13, Apache-2.0 code, CC-BY-4.0 docs, no external contributions. Five blueprints: AV, defect images, event video, person re-id, weather and lighting. Six skills: AnomalyGen, Augmentation, Auto Labeling, Curation and Retrieval, Orchestration (Airflow and Kubernetes, some OSMO), Simulation (Isaac Sim). Cosmos Evaluator checks physical plausibility. CDF Next launches February 2027. The stated success is a GTC San Jose launch in March 2027, with wider adoption across AV, robotics, healthcare, and Metropolis, including all CSPs and NCPs. A is dynamic stitching only. B is the platform (dynamic DAGs, atomic skills, orchestration, and the evaluator). C keeps the reference.

Assumptions, as marked in the brief: revenue, margin, and team size are unknown. Cash, runway, and founder hours are unknown. No lean was stated.

Inferences, not opened facts: a small share of misses can lift samples per watt and leave the model unmoved. The five are the install base the seats would not delete before GTC. Neither inference counts misses, watts, or GPUs.

Forecasts, not observations: shipping the five through GTC if the conditions hold. A 31 January 2027 pass reopens A and narrow B and starts neither. Samples per watt, and a stitch that beats the reference, are future tests. Wider adoption is the brief's success line, not a prediction.

Unknown: the assumed figures above. How many misses are the fixed DAG. How many outside teams ran a blueprint. Whether a named customer is blocked, whether hours remain, and whether users would stay on a stitch. No person is named for the tag, the team count, the January gate, or the not-do list.

Proposed thresholds, not measurements: about 20 misses by 1 November 2026, an outside-team count by 30 November 2026, about 100 locked misses and at least 50 of 100 by 31 January 2027. Not adopted as the reopen bar: Jensen's 20 of 100, Elon's about 20 percent, Doshi's 30 of 100, Cagan's "a user who stays." Adopted reopen bar: 50 of 100, before a prototype.

## Where they fought

**Blueprints through GTC.** Elon opened by deleting fixed DAGs. Jensen and Bezos called the five the install base and a one-way door. Elon kept one as a control in Round 2. In Round 3 every seat keeps all five. Resolved for the five. Not a measured install base.

**Platform or one path.** Jensen and Bezos opened on a narrowed B. The other six left the platform unbuilt. Bezos moved his top score to C. Jensen still scores B at 6. Resolved for these two quarters as the count. The seats did not score B the same way.

**Which number.** The bars were 20 of 100 (Jensen), about 20 percent (Elon), 30 of 100 (Doshi), 50 of 100 (Ng, Bezos, Munger), and a user who stays (Cagan). Adopted: 50 of 100 on the fixed blueprint, before a prototype. The stay test and samples per watt come after that count. A pass reopens the council. It does not start a stitch on 1 February. These bars are proposed thresholds.

## Scorecard

| Seat | Weight | Final stance | A | B | C | Pillar score | Moved? | Their line |
|---|---|---|---|---|---|---|---|---|
| Jensen (platform) | 3 | C, amend | 2 | 6 | 7 | 6 | B to C | "samples per watt" on the same GPU box |
| Elon (constraints) | 2 | C, amend | 6 | 2 | 7 | 6 | A to C | "errors fixed per GPU-hour on one blueprint" |
| Graham (demand) | 2 | C, amend | 3 | 2 | 7 | 6 | no | "Fix the first break for the team that already runs a blueprint." |
| Bezos (strategy) | 2 | C, amend | 2 | 5 | 8 | 8 | B to C | "what will not change through GTC" |
| Cagan (evidence) | 2 | C, amend | 3 | 2 | 7 | 6 | A to C | "Stitching stays closed unless they stay on the stitch." |
| Doshi (focus) | 2 | C, amend | 3 | 2 | 7 | 7 | A to C | "one leverage bet, the count on one blueprint" |
| Ng (data) | 2 | C, amend | 2 | 3 | 8 | 8 | no | "Tag about 20 misses on the blueprint a team already runs." |
| Munger (failure) | 2 | C, amend | 2 | 2 | 8 | 7 | no | "Until 50 of 100 misses are the fixed DAG, the five blueprints are that thing." |

Math, copied from the verdict: A (3x2 + 2x6 + 2x3 + 2x2 + 2x3 + 2x3 + 2x2 + 2x2) / 17 = 2.8 · B (3x6 + 2x2 + 2x2 + 2x5 + 2x2 + 2x2 + 2x3 + 2x2) / 17 = 3.2 · C (3x7 + 2x7 + 2x7 + 2x8 + 2x7 + 2x7 + 2x8 + 2x8) / 17 = 7.4

No pillar is at 4 or below. No seat ends at ruin likely. Bezos marked ruin possible in Round 2 on staffing B while cash and headcount are unknown. This resolution does not staff B. Spread on C is 1, and Round 1 marked the recommended options two-way, so no cap applies.

## What to do next

1. Tag about 20 misses on AV or defect. Owner: not assigned. The verdict names only the role "the person accountable for that blueprint." When: 1 November 2026.
2. Write the external-team count. Zero means one hand install and no new system. Owner: not assigned. When: 30 November 2026.
3. Apply the 50-of-100 gate. If it fails, the February 2027 launch ships the five fixed blueprints. Owner: not assigned. When: 31 January 2027.

**Cheapest test:** By 1 November 2026, tag about 20 misses on one blueprint and write whether anyone outside the team has run it. Owner: not assigned.

**Kill criteria:** A missing 31 January 2027 count, a fixed-DAG share under 50 of 100, or no outside double run means the February 2027 launch and GTC ship the five fixed blueprints, with no stitch and no platform build.

**Revisit:** 31 January 2027, with the team count, the 100-miss share, whether a named customer is blocked, and whether any hours remain. Those figures are not in this record yet.

---
Simulated advisors built from each person's public work. They are not the people and do not speak for them.
