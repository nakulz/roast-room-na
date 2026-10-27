# Round 1: opening positions

## Jensen (weight 3)

SEAT: Jensen (Platform and full-stack shipping)
STANCE: Yes
OPTION SCORES: A 2/10 · B 8/10 · C 4/10
PILLAR SCORE: 7/10
CONFIDENCE: 4/5
RUIN RISK: none
DOOR: two-way

THE CALL: Narrow B: the six atomic skills and the evaluator are the platform, dynamic DAGs only compose them, and the five blueprints keep running.

WHY:
1. Own the layer that sets the cost of the data (Full stack versus an application, S004). "Accelerated computing is not a chip problem." (S013) The GPUs, Airflow, Kubernetes, and Isaac Sim already run. The evaluator fails a bad sample before it hits training. I treat one evaluator-passed sample as the token and the customer's GPU watts as the cap. The brief has no samples-per-watt figure, so that ratio is directional.
2. Software inertia (S008). "Software inertia is the single most important thing in computers." (S008) "you need an install base 1st" (S008) The base on record is five blueprints, public since 2026-05-13, contributions closed. A erases those fixed workflows. B keeps them runnable and lets a dynamic DAG call the same six skills.
3. Vertically integrated, horizontally open (S007). "we try to build as much of it as we can so that we understand it but then we open it up so everybody can access it." (S007) "Your data belongs to you." (S011) C is the reference we have already run. The open step, about four months before the February 2027 launch, is one skill a CSP can take alone.

THE RISK I SEE: Shipping skills, dynamic DAGs, orchestration, and the evaluator as four new systems breaks the blueprints, and the March 2027 GTC API then freezes the break.
WHAT WOULD CHANGE MY MIND: On equal GPU watts, dynamic-only stitching beats the fixed AV blueprint in evaluator-passed samples, and that blueprint still runs.
WHAT I'D DO THIS WEEK: Run the AV blueprint on one GPU box and record evaluator-passed samples per watt.
QUESTION FOR THE FOUNDER: Which one skill can a CSP take alone, keep their data, and still run the AV blueprint unchanged?

## Elon (weight 2)

SEAT: Elon (First principles and execution speed)
STANCE: Conditional yes
OPTION SCORES: A 7/10 · B 4/10 · C 2/10
PILLAR SCORE: 8/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Narrow A to one dynamically stitched workflow that ships labeled data for one vertical, and delete every other step before February.

WHY:
1. Roughly 120 days to a February 2027 launch, then March GTC. The thing is, the limit at that date is labeled samples out of one pipeline. "I just repeatedly tackle the limiting factor." (S002) I assume a team of tens. Founder hours sit on that path.
2. Fixed DAGs are the part to delete if agents already stitch them. "best part being no part." (S034) Question, delete, simplify, accelerate, automate, in that order (The algorithm, S014). B runs four builds at once. "possibly the most common error of a smart engineer is to optimize a thing that should not exist." (S014) C spends the quarter on a writeup. The evaluator stays on the one path as the gauge.
3. Four ecosystems plus every CSP and NCP is a requirement with no name on it. "make your requirements less dumb. Your requirements are definitely dumb." (S014) February's number is labeled samples per GPU-hour. "it's not about press releases, it's about tonnage." (S024) Half-odds inside the team: one live stitch by mid-January 2027 (S002). That date is for the team.

THE RISK I SEE: The five blueprints go away and the stitcher emits nothing a customer will run, so February is an architecture slide.

WHAT WOULD CHANGE MY MIND: A timed run showing agents cannot stitch a DAG a customer already runs, or a named CDF team above about 150 people through February.

WHAT I'D DO THIS WEEK: Stitch the vertical that already has data, count labeled samples per GPU-hour, and take healthcare, Metropolis, and the all-cloud list off the board.

QUESTION FOR THE FOUNDER: Whose name is on four ecosystems and every CSP and NCP by March, and what samples per GPU-hour do they claim for February?

## Graham (weight 2)

SEAT: Graham (Product and startups)
STANCE: Conditional yes
OPTION SCORES: A 3/10 · B 2/10 · C 7/10
PILLAR SCORE: 5/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Keep the reference (C), cut to the one blueprint a named team already runs, and let that team say whether stitching comes next.
WHY:
1. The five blueprints are the only users you can name: AV, defect images, event video, person re-id, weather and lighting. A platform and a stitching engine are a broad hypothetical. "A need that's narrow but genuine is a better starting point than one that's broad but hypothetical." (S174) GTC also names robotics, healthcare, Metropolis, and every CSP and NCP. "You got to start with a small intense fire." (S010)
2. The brief has no growth rate. I assume zero measured external users: public since 2026-05-13, no outside contributions, revenue unknown. "you can use growth like a compass to make almost every decision you face." (S100) About 16 weeks until February. B stacks dynamic DAGs, atomic skills, orchestration, and the evaluator. "The number one thing not to do is other things." (S166)
3. People want labeled data on their own GPUs. "A company is defined by the schleps it will undertake." (S108) Agents stitching fixed DAGs is a capability with no team attached to it. "Who wants this so much that they'll use it even when it's a crappy version one made by a two-person startup they've never heard of?" (S098)
THE RISK I SEE: C becomes a tour of the repo and a change list, and March comes with nobody who would miss a blueprint.
WHAT WOULD CHANGE MY MIND: Ten external teams already off the fixed blueprints, with hand-stitched usage growing every week. That flips me to A.
WHAT I'D DO THIS WEEK: Count the teams that ran a blueprint on their own GPUs in the last 30 days, and ask if they would be bummed if it disappeared.
QUESTION FOR THE FOUNDER: Who ran which blueprint last week, and what did they do when it broke?

## Bezos (weight 2)

SEAT: Bezos (Strategy and decisions)
STANCE: Conditional yes
OPTION SCORES: A 2/10 · B 7/10 · C 3/10
PILLAR SCORE: 8/10 (Strategic fit and reversibility: the option you recommend, judged on your pillar alone)
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Narrow B: keep the five blueprints as what the customer runs, spend these two quarters on atomic skills and the evaluator, and limit dynamic stitching to one new vertical.
WHY:
1. Sort the door first (Type 1 and Type 2, S063). A deletes fixed DAGs before a public GTC, so that door is one-way. Full B is four surfaces in sixteen weeks, and a GTC miss is a one-way door. Blueprints plus skills and the evaluator stay reversible. Assumed: NVIDIA-scale cash, unknown headcount. Opened 2026-05-13. CDF Next is February 2027.
2. Build on what will not change (S029). Customers will still want more physically plausible labeled data, faster, on their own GPUs. Five blueprints cannot cover AV, robotics, healthcare, Metropolis, and every CSP and NCP. Work backwards from that dataset (S056). Keep Airflow and Kubernetes at a world-class bar (S012). Invent on the evaluator and one stitching trial.
3. Take the capped bet (Long-tailed bets, S063). "Given a ten percent chance of a 100 times payoff, you should take that bet every time." (S063) One vertical you can switch off is that bet. A bets the launch (S018). C is slow on a fixed date (S064). CDF has no working-backwards PRD.
THE RISK I SEE: Four workstreams in sixteen weeks, and nothing a customer can run at GTC.
WHAT WOULD CHANGE MY MIND: External blueprint users, and domains a fixed DAG could not serve. Near zero, wait. Dozens blocked, stitching leads.
WHAT I'D DO THIS WEEK: Write the six-page memo: one named customer, the ten-year dataset, and days for a new vertical to clear the evaluator on their GPUs.
QUESTION FOR THE FOUNDER: Which named customer is blocked because a fixed blueprint cannot make a physically plausible dataset on their own GPUs?

## Cagan (weight 2)

SEAT: Cagan (Product discovery)
STANCE: Conditional yes
OPTION SCORES: A 4/10 · B 2/10 · C 3/10
PILLAR SCORE: 7/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Keep the reference in place and spend these two quarters on one test: will a real user switch from a fixed blueprint to dynamic stitching.

WHY:
1. Value is the open risk. The brief gives five blueprints, six skills, February 2027, and GTC in March 2027, and no observed use. Revenue, margin, and team size are unknown, so I treat value, usability, and viability as untested. "Assessing the product risks is the first thing we do when we're trying to discover a solution worth building." (S042) Agents that can stitch a fixed DAG speak to feasibility. Choice is the value test.
2. B fails focus. Dynamic DAGs, atomic skills, orchestration, and the evaluator are four bets. Success then adds AV, robotics, healthcare, Metropolis, and every CSP and NCP. "Instead of 2-3 truly important things, they have at least 20-30." (S026) One battle: the switch.
3. Grant the GTC date, then score the outcome. "You just don't get points for shipping, you get points for delivering the value." (S001) "Actually building and launching a product idea is generally the slowest, most expensive way to validate the idea." (S009) A removes fixed workflows on a claim. B builds the platform. C writes what should change.

THE RISK I SEE: The room says yes, nobody has to leave the blueprint they already run, and the team still cuts fixed DAGs before GTC.
WHAT WOULD CHANGE MY MIND: Repeat runs on customer GPUs where users leave a named blueprint for dynamic stitching with no NVIDIA engineer in the loop.
WHAT I'D DO THIS WEEK: Watch six users in one vertical (I assume AV, listed first) try a real job on the blueprint, then on a stitching prototype. "So watch what they do more than what they say." (S005)
QUESTION FOR THE FOUNDER: Which single blueprint do target users run today, and what do they stop doing if stitching works?

## Doshi (weight 2)

SEAT: Doshi (Product sense and focus)
STANCE: Conditional yes
OPTION SCORES: A 5/10 · B 2/10 · C 3/10
PILLAR SCORE: 7/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Staff dynamic composition of the existing skills for one segment through February 2027, and leave the platform unbuilt.

WHY:
1. Opportunity cost is the bar. "you should stop doing work that simply provides a positive return on investment, ROI. And you should start focusing on work that minimizes opportunity cost" (S001). B is four bets: dynamic DAGs, atomic skills, orchestration, and the evaluator. "And because it's 30%, it can't be five big new initiatives, it's probably one or two." (S001) I have made this mistake. Team size is unknown, so I am not applying the 60/30/10 example. One bet fits February 2027 and GTC in March 2027.
2. A has one bet and the wrong one. Motivation, differentiation, distribution: a blank line waits. Agents already stitch fixed DAGs, so the stitch is a weak differentiator. Deleting fixed workflows discards five blueprints before a stack rank. "Bad product strategy eschews trade-offs and tries to be all things to all people." (S035) The win line does that: AV, robotics, healthcare, Metropolis, every CSP and NCP.
3. C spends the window on commentary. "thinking is cheap, so you should do more thinking, not less." (S002) Take days, then execute. "most early stage teams should actually optimize for execution." (S001) Repo date: 2026-05-13. Assumption, no usage data: test AV first, the first blueprint named.

THE RISK I SEE: GTC is a platform tour and the buyer never moves. "The default alternative is simply inaction." (S053)

WHAT WOULD CHANGE MY MIND: Users of a live blueprint rank dynamic stitching above labeling, curation, and simulation, in more than one segment.

WHAT I'D DO THIS WEEK: Publish one not-do list with one owner: no platform, no second vertical, no deleting the five blueprints. Stack-rank AV.

QUESTION FOR THE FOUNDER: Which single problem must CDF solve by February 2027, and which positive-ROI work will you leave undone?

## Ng (weight 2)

SEAT: Ng (Data-centric AI)
STANCE: Conditional yes
OPTION SCORES: A 2/10 · B 3/10 · C 7/10
PILLAR SCORE: 8/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Keep the reference blueprints, and spend the two quarters making downstream error move on a dev set that matches post-launch data.

WHY:
1. Say the factory camera team wants a stitcher. I think the count comes first (Error analysis, S001). "These two hours could save you a month of wasted effort." (S001) The brief has no error table. I assume a fixed DAG is an unknown share of the mistakes. If that share is 5%, deleting it cannot move the model.
2. The reference is the basic system. "So don’t start off trying to design and build the perfect system." (S001) B is the platform before one dataset moves one model (Start small, S003). My miss: "The thing we really got wrong was the importance of, the early importance of unsupervised learning." (S003) Scale of the right data held.
3. Plausibility is the wrong number (Generated data, S001). "it is sometimes easier to create synthetic data that appears realistic to a person than it is to create data that appears realistic to a computer." (S001) AnomalyGen, augmentation, and Isaac Sim stay theater until dev error moves. Draw dev from the data you expect after launch (S001). On a hundred labels, 10 wrong is 10% of the set (S003). Write the rule. Do not average them.

THE RISK I SEE: The reference is last year's factory. Healthcare and Metropolis cameras can be a shift we still do not handle well.

WHAT WOULD CHANGE MY MIND: Of about 100 downstream mistakes on a locked customer dev set, 50 or more come from the DAG being fixed, and a stitched run beats the reference there.

WHAT I'D DO THIS WEEK: Run defect or AV on about 20 post-launch examples and tag each miss as bad label, synthetic tell, coverage, or orchestration.

QUESTION FOR THE FOUNDER: What fraction of current downstream errors would dynamic stitching touch, and where did that dev set come from?

## Munger (weight 2)

SEAT: Munger (Failure and mental models)
STANCE: Conditional yes
OPTION SCORES: A 3/10 · B 2/10 · C 7/10
PILLAR SCORE: 6/10
CONFIDENCE: 3/5
RUIN RISK: none
DOOR: two-way

THE CALL: Take C as a shipping plan: the five blueprints stay the product, and these weeks fix the breaks that would make them dead at GTC.

WHY:
1. Invert a short clock. The brief puts the launch in February 2027 and GTC in March, and today is 26 Oct 2026, so the work window is inside five months. Headcount is unknown. A deletes the fixed workflows. B stacks dynamic DAGs, skills, orchestration, and the evaluator on one date, and the success line already says every CSP. "Just constantly invert. You don’t think about what you want. You think about what you want to avoid." (S034) That is a lollapalooza (S004).
2. Five blueprints and six skills already make a labeled set on the customer's GPUs. "If we've got one thing we can do more of, we're not interested in anything that's not better than that." (S033)
3. Agents already stitch fixed DAGs, so dynamic stitching is their game (Circle of competence, S034). Keep the court-software shape: a corner the big tools find painful (S029), and sticky once it works (S030). Here that corner is AV, defect, and re-id data on the customer's machines, plus the physical-plausibility check. "I don't play in a game where the other people are wise and I'm stupid." (S034) B pays the platform group to prefer B (Incentives, S028).

THE RISK I SEE: The months go to a change list, and GTC gets the May 2026 repo.

WHAT WOULD CHANGE MY MIND: Three named customers, in more than one vertical, who broke a fixed DAG and kept a set a dynamic stitch made on their GPUs.

WHAT I'D DO THIS WEEK: Run all five blueprints and write the break a stranger hits on each.

QUESTION FOR THE FOUNDER: Which blueprint has someone outside the team run twice, and what broke?

## Chair notes

The eight cards do not share a top option. Jensen (B 8) and Bezos (B 7) score the platform highest, and both keep the five blueprints running. Elon (A 7) and Doshi (A 5) score dynamic stitching highest. Graham (C 7), Ng (C 7), and Munger (C 7) score the reference highest. Cagan's scores are A 4, B 2, C 3. His call keeps the reference and runs one switch test. That card has a stance and scores for A, B, and C. The call and the top score do not name the same option.

Several seats narrowed the option they scored. Jensen and Bezos narrow B: skills and the evaluator, blueprints still run, dynamic stitching limited. Doshi scores A and refuses the brief's A. He will not delete the five blueprints, and he will not build the platform. Elon is the seat closest to deleting fixed DAGs, and he still narrows A to one vertical. Ng and Munger narrow C into a measured fix of the reference, not a tour of the repo.

Cruxes:

1. Do the five fixed blueprints stay runnable through GTC? Jensen, Bezos, Graham, Doshi, Ng, and Munger say yes. Elon says fixed DAGs are the step to delete if agents already stitch them. Cagan ties deletion to a user who actually switches.

2. Is the two-quarter product the platform or one path? Jensen and Bezos want the platform layer, narrowed. Elon, Doshi, Graham, Ng, Munger, and Cagan want one path, with the four-part platform left unbuilt in this window.

3. What has to move before the product changes? Jensen uses evaluator-passed samples per watt. Elon uses labeled samples per GPU-hour. Graham, Bezos, Cagan, Doshi, and Munger want a named user who runs, misses, or is blocked by a blueprint. Ng wants the share of downstream errors that come from the DAG being fixed.

Unanimity check: not met. Round 1 tops are B, A, and C, so there is no single unargued alternative to force. No seat is at ruin risk likely. Every door on the option that seat recommends is two-way. No card was missing a stance or option scores, so none was sent back.
