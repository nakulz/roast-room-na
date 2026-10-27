# Roast Room: how to aim CDF before CDF Next

2026-10-26 · Seats: Jensen, Elon, Graham, Bezos, Cagan, Doshi, Ng, Munger · Rounds: 3 · Mode: named seats

## Verdict: GO WITH CONDITIONS

**The call:** Keep the five fixed blueprints as what CDF ships through GTC San Jose in March 2027. Spend the two quarters counting, on one blueprint, how many downstream misses come from the DAG being fixed. A pass on 31 January 2027 reopens A and narrow B. It does not start either one.

Option scores: A 2.8 · B 3.2 · C 7.4 · Support for the resolution 6.6/10 · Confidence 6/10 · Spread 1 · Vote: 0 endorse, 8 amend, 0 dissent

Round 2 had C at 5.5 (RESHAPE). Given the conditions, Round 3 scores C at 7.4 (GO WITH CONDITIONS). Support of 6.6 is for the draft as written. The amendments close the early prototype that draft allowed.

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

Math: A (3x2 + 2x6 + 2x3 + 2x2 + 2x3 + 2x3 + 2x2 + 2x2) / 17 = 2.8 · B (3x6 + 2x2 + 2x2 + 2x5 + 2x2 + 2x2 + 2x3 + 2x2) / 17 = 3.2 · C (3x7 + 2x7 + 2x7 + 2x8 + 2x7 + 2x7 + 2x8 + 2x8) / 17 = 7.4

No pillar is at 4 or below. No seat ends at ruin likely. Bezos marked ruin possible in Round 2 on staffing B while cash and headcount are unknown. This resolution does not staff B. Spread on C is 1, and Round 1 marked the recommended options two-way, so no cap applies.

## Why the council landed here

- A small share of downstream misses can lift samples per watt and leave the model unmoved. The gate is 50 of 100 on the blueprint a team already runs, counted before any stitch (Ng, Error analysis). Jensen conceded this in Round 2. Bezos and Munger used the same 50.
- Deleting the five before GTC, or shipping four new surfaces into that date, is the door the room refused. The five stay on the customer's GPUs (Bezos, Type 1 and Type 2; Jensen, install base).
- The window holds one bet. Brief A drops the blueprints. Brief B is four surfaces. The bet is the count (Doshi, opportunity cost; Graham, a named team first).
- A tour of the repo is the failure Graham and Munger named. The conditions make C a shipping plan with a kill date.

## Where they fought

**Blueprints through GTC.** Elon opened by deleting fixed DAGs. Jensen and Bezos called the five the install base and a one-way door. Elon kept one as a control in Round 2. In Round 3 every seat keeps all five. Resolved.

**Platform or one path.** Jensen and Bezos opened on a narrowed B. The other six left the platform unbuilt. Bezos moved his top score to C. Jensen still scores B at 6, so one partner taking one skill waits. Resolved for these two quarters: the count.

**Which number.** Bars were 20 of 100 (Jensen), about 20% (Elon), 30 of 100 (Doshi), 50 of 100 (Ng, Bezos, Munger), and a user who stays (Cagan). Adopted: 50 of 100 on the fixed blueprint, before a prototype. The stay test and samples per watt come after that count, before a stitch becomes the product. A pass reopens the council. It does not start a stitch on 1 February.

## Minority report

Jensen endorsed with this amendment: "The 31 January gate allows a stitch beside fixed AV on one GPU box only after a samples-per-watt win and 20 of 100 locked misses, with one partner taking one skill and keeping their data, and it leaves 50 of 100 as the bar to reopen A or full B."

That holds if the side-by-side wins on evaluator-passed samples per watt, at least 20 of 100 misses are the fixed DAG, AV still runs, and one partner takes one skill and keeps their data. The reopen bar stays 50. He conceded in Round 2 that a small share can leave the model unmoved.

## Conditions

1. All five blueprints still run on customer GPUs at GTC San Jose in March 2027.
2. By 1 November 2026, tag about 20 misses on AV or defect (bad label, synthetic tell, coverage, or orchestration) before any roadmap change. One fixed-DAG tag in those 20 does not open a prototype.
3. By 30 November 2026, count external teams that ran a blueprint on their own GPUs in the prior 30 days. Zero means one hand install and no new system. If the five take the whole team, no platform work.
4. By 31 January 2027, count about 100 locked misses on that fixed blueprint for one named user, before any prototype. Through February 2027 one owner keeps a not-do list: no second vertical, no four-part platform. The existing evaluator stays the gauge. Orchestration stays Airflow and Kubernetes.
5. Reopen only if the fixed DAG is at least 50 of 100, the team reran the blueprint twice with no NVIDIA engineer and the first break fixed, one named customer is blocked, and hours remain. A pass reopens A and narrow B before 14 February 2027 and starts neither.
6. A stitch becomes the product only after it beats the reference on those misses, most of six current users stay on it, and evaluator-passed samples per watt win on the same GPU box.

## What to do next

1. By 1 November 2026: tag about 20 misses on AV or defect (owner: the person accountable for that blueprint).
2. By 30 November 2026: write the external-team count. Zero means one hand install and no new system.
3. On 31 January 2027: apply the 50-of-100 gate. If it fails, the February 2027 launch ships the five fixed blueprints.

**Cheapest test:** By 1 November 2026, tag about 20 misses on one blueprint and write whether anyone outside the team has run it.

**Kill criteria:** A missing 31 January 2027 count, a fixed-DAG share under 50 of 100, or no outside double run means the February 2027 launch and GTC ship the five fixed blueprints, with no stitch and no platform build.

**Revisit:** 31 January 2027, with the team count, the 100-miss share, whether a named customer is blocked, and whether any hours remain.

---
Simulated advisors built from each person's public work. They are not the people and do not speak for them.
