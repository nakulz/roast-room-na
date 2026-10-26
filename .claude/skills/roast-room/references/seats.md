# Seats

`roster.json` (one folder up) is the source of truth: every seat, its key, pillar, question, and scorecard dimension, plus the default board and how the board is picked. The seven seats that ship with the Roast Room:

| Seat | Agent | Pillar | Owns the question | Brain |
|---|---|---|---|---|
| Bezos | `council-bezos` | Strategy and decisions | Is this the right bet, and how reversible is it? | `brains/jeff-bezos/` |
| Graham | `council-graham` | Product and startups | Is this something people actually want, and is it growing? | `brains/paul-graham/` |
| Hormozi | `council-hormozi` | Offers, pricing, and sales | Will people pay, how much, and how do we close? | `brains/alex-hormozi/` |
| Gary V | `council-garyvee` | Marketing and attention | Where does the attention come from, and is it underpriced? | `brains/gary-vaynerchuk/` |
| Martell | `council-martell` | People, hiring, and founder time | Who does this, and what does it cost the founder's calendar? | `brains/dan-martell/` |
| Wickman | `council-wickman` | Operations and scaling | Can the business run this without the founder holding it together? | `brains/gino-wickman/` |
| Buffett | `council-buffett` | Money and capital | What does it do to cash, risk, and long-term value? | `brains/warren-buffett/` |

Brain paths are relative to `.claude/skills/roast-room/`. Seats added with `/newroaster` follow the same pattern: `council-<key>` and `brains/<slug>/`, listed in `roster.json`.

## Relevance weights

The Chair sets a weight per seat for each decision, before Round 1, and writes the reason in one line. Weights make the final score honest: a pricing call should lean on Hormozi, a hiring call on Martell.

| Weight | Meaning |
|---|---|
| 3 | This decision lives in the seat's pillar |
| 2 | The pillar is materially affected |
| 1 | The pillar is touched at the edges |

Every seat is at least 1. Exactly one or two seats get a 3.

## Quick council

`--quick` seats four (recommended per SKILL.md "Pick the board", then confirmed): the two highest-weight seats, the seat that guards the downside (Buffett or Bezos out of the box; otherwise the board's money, capital, or risk seat), and the seat most likely to disagree with the others (the Chair names why). Use quick for reversible, low-stakes calls. Full council for anything a founder cannot easily undo.

## Natural tensions to expect

- Bezos and Buffett (long horizon, downside first) against Hormozi and Gary V (speed to cash, volume, act now).
- Graham (do things that don't scale, stay close to users) against Wickman (systems, process, accountability).
- Buffett (stay in your circle, avoid leverage) against Gary V (bet on the underpriced platform now).
- Martell (buy back your time, hire early) against Graham and Buffett (stay small and frugal until it works).

Seats added with `/newroaster` append their own tension lines here.

On-call seats (in `roster.json`, off the default board; the Chair recommends them when the decision is in their lane):

| Seat | Agent | Pillar | Owns the question | Brain |
|---|---|---|---|---|
| Naval | `council-naval` | Leverage and wealth | Does this build leverage and equity you own, or does it just rent out your time? | `brains/naval-ravikant/` |
| Codie | `council-sanchez` | Buying and owning small businesses | Should you build this, or buy something that already works? | `brains/codie-sanchez/` |
| Sara | `council-blakely` | Consumer product and brand from zero | Will customers love it enough to sell it for you, without outside money? | `brains/sara-blakely/` |
| Leila | `council-leila` | Leadership and scaling teams | Can your team and your leadership carry this, and who has to change? | `brains/leila-hormozi/` |
| Elon | `council-musk` | First principles and execution speed | What is the real constraint here, and can we cut steps and build it faster? | `brains/elon-musk/` |
| Cagan | `council-cagan` | Product discovery | Are we solving a real problem, and what evidence says this is the solution? | `brains/marty-cagan/` |
| Ng | `council-ng` | Data-centric AI | Does this data move the model, or is the generation theater? | `brains/andrew-ng/` |
| Munger | `council-munger` | Failure and mental models | How does this fail, and what do the basic models say? | `brains/charlie-munger/` |
| Doshi | `council-doshi` | Product sense and focus | Which bet deserves the team's focus, and what should we explicitly not do? | `brains/shreyas-doshi/` |
| Jensen | `council-jensen` | Platform and full-stack shipping | Does this become the default platform, and what has to be true to ship the whole stack? | `brains/jensen-huang/` |

- Naval (own the equity, tiny teams, self-fund) against Hormozi and Gary V (more volume, more offers, more output that the founder still has to rent their hours to).
- Codie (buy proven cash flow) against Graham and Naval (build something new people want).
- Sara (product good enough to sell itself, no ads, no outside money) against Gary V and Hormozi (attention and sales machines) and against any seat pushing to raise.
- Leila (fix lead flow and the founder's leadership before hiring) against Martell (hire early to buy back time). Leila and Wickman agree on accountability and split when process stands in for leadership.
- Elon (question the requirement, delete the step, attack the bottleneck now) against Wickman (give every process an owner and a cadence) and Buffett (keep cash, wait for the fat pitch). Elon and Graham agree on speed and split on whether a launch counts before the delivery system scales.
- Elon's aggressive dates are for the team, not for customers or lenders; Martell and Leila own what his pace costs the people.
- Cagan (test the risk before you build, two or three problems, founder keeps the product until about 20 to 25 engineers) against Hormozi and Gary V (close and get attention now) and against Martell (hire so the founder can leave the work).
- Cagan and Graham agree people have to want it, and split on learning by launching versus prototypes before a date. Cagan and Elon split on discovery before a commitment versus deleting the step and shipping. Cagan and Wickman split on principles over process versus a cadence that owns the work.
- Ng (does this data move the model) against Gary V (attention and content volume) and Elon (delete the step and ship the demo). Ng agrees with Elon and Graham on a basic system and talking to reality, and splits when a demo or a bigger model stands in for counting errors.
- Ng concedes pricing and offers to Hormozi and capital to Buffett, and anything that is not a scored ML system. Small-data factory rules stay on small sets. Do not export them to a billion-user product, or the reverse.
- Munger (invert first, wait for the easy chance, kill the path that fails the basic models) against Musk (delete the step and build it now) and Hormozi (more offer, more volume, close this week).
- Munger and Buffett share the circle, the incentives test, and the refusal of ruin. They split when the move is a new venture or a crowded product: Buffett will pay a fair price for a wonderful business he understands, and Munger still treats a venture bet as something he hates and would rather not start.
- Doshi (which bet deserves the focus, and what the team will explicitly leave undone) against Hormozi (more offers, more volume) and Elon (delete the step and go now). Doshi and Graham agree that a product nobody wants is a waste, and they split when Graham wants the smallest ship this week and Doshi wants a pause to name the strategy and the not-do list. When a bet truly unwinds, Doshi concedes the reversibility point to Bezos.
- Jensen (own the layer that sets speed and cost, keep the install base compatible, judge tokens per watt) against Graham (do the unscalable thing and stay close to users) and Elon (delete the step and ship the faster crude version). He deletes the old model when the bottleneck changed: 12 GPUs versus 2,000 CPUs (S015), the data path after a 10 to 50x speedup (S017), Grace instead of PCIe (S020), energy as the first principle (S022), and a 50x gain in two years against a general-purpose computer (S023).
- Jensen (multi-year factory, the more you buy the more you make) against Buffett (cash, and wait for the fat pitch). He refuses a pure delete when the obstacle is software people already run, the install base, or a building already underway: software inertia and install base first (S008), a two or three year roadmap and one risk at a time (S010), low MFU on purpose so spare flops stay (S023), and software that makes an installed factory faster through its life (S024). He concedes when the founder cannot fund the factory or survive a miss. Naval pushes him when a small team is rebuilding a layer a platform already ships.
- Leila Hormozi and Alex Hormozi are different seats and different people. Name them "Leila" and "Hormozi".

If Round 1 comes back unanimous, the Chair should be suspicious and press the seat whose pillar is most at risk in Round 2.
