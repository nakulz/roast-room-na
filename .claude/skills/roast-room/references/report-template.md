# Report template (the Chair's verdict)

`verdict.md` is a decision memo. Written by the Chair in plain English. No em dashes. No AI filler: state each point once, no tee-ups, no "here's the thing". Seat quotes keep their own voice. The chat note stays under 200 words. The depth goes in this file. Keep the file under about 1,000 words; the round files hold the cards.

Apply this lens every time you write the file:

- Fidelity first. Do not invent evidence, owners, dates, metrics, or consensus. If the seats split, say they split.
- Label an inference, a forecast, an assumption, a user-supplied line, and an unknown. A research id is not stronger than the source it cites. An opened forecast is still a forecast.
- Lead with the decision in one sentence, then at most three supports. Keep every condition that would change the action. Keep the dissent.
- Each next step has an action, an owner, and a time. If the record has no owner or no time, write unknown. Do not invent one.
- If the evidence cannot support a call, the decision sentence says what is unknown. The label still comes from `scoring.md`.
- A threshold this room proposes is not a measurement. Keep it out of the opened facts.

Tone reference, not a shape to copy: `sessions/2026-10-09-example-take-the-seed/verdict.md`.

```markdown
# Roast Room: [decision in a few words]

[date] · Seats: [list] · Rounds: [n] · Mode: [full | quick | named seats]

## Verdict: [GO | GO WITH CONDITIONS | RESHAPE | WAIT | DON'T DO IT]

**Decision:** [one sentence the founder can act on, naming the option. If the evidence cannot support that call, say what is unknown.]

1. [support, one sentence, with the seat and the framework]
2. [second support, or omit]
3. [third support, or omit]

Option scores: [A] x.x · [B] x.x · [C] x.x · Support for the resolution x.x/10 · Confidence n/10 · Spread n · Vote: [n] endorse, [n] amend, [n] dissent
[Any override applied, in one line, or omit]

## Conditions

[Every condition that would change the action. Each one is checkable: a number, a date, or a test result. Say which must clear before the irreversible step. If none, say none.]

## Minority report

[The strongest dissent, in the seat's words, and what would have to be true for them to be right. If every seat agreed, say so and name the least-tested assumption instead. Do not invent a consensus the cards do not show.]

## Evidence

Opened facts: [each current-world fact the call uses, one line, with its R or F id. The id does not make a forecast into an observation.]
User-supplied: [what the brief stated, labeled as the founder's words]
Assumptions and inferences: [named, and kept separate from opened facts]
Forecasts: [scenarios and ranges. A forecast is not an observation.]
Unknown: [what stayed open, including a dropped trip. A proposed threshold is not a measurement, and it is not listed as an opened fact.]

A brain source id quotes that seat's public work. It does not establish a new fact. Unresolved evidence is restated under Conditions or the minority report.

## Where they fought

[One short block per crux: the question, who was on each side, who moved and why, how it resolved or why it did not]

## Scorecard

| Seat | Weight | Final stance | [A] | [B] | [C] | Pillar score | Moved? | Their line |
|---|---|---|---|---|---|---|---|---|
| Buffett (money) | 3 | ... | 1 | 6 | 7 | 8 | gated B to C default | "[their one line for the founder]" |

Math: [one line per option, from scoring.md. Do not recompute a different way.]

## What to do next

1. [action]. Owner: [name or unknown]. When: [time or unknown].
2. [action]. Owner: [name or unknown]. When: [time or unknown].
3. [action]. Owner: [name or unknown]. When: [time or unknown].

**Cheapest test:** [the smallest thing that checks the riskiest assumption before committing]
**Kill criteria:** [the signal that means stop, and what happens then]
**Revisit:** [when to bring this back to the council, and with which numbers. If the record has no date, say unknown.]

---
Simulated advisors built from each person's public work. They are not the people and do not speak for them.
```

The three supports are the `why` entries in `verdict.json`, in the same order. Do not add a fourth. In `verdict.json`, `when` is the time and `action` includes the owner. Use unknown when the evidence has neither. `verdict.json` adds no fact this memo does not already contain.
