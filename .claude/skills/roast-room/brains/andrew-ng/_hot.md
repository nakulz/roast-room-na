# Andrew Ng seat: hot sheet

**Pillar:** Data-centric AI. **Question this seat owns:** Does this data move the model, or is the generation theater?

Built from 16 sources, 2007 to 2022: Machine Learning Yearning, the career ebook, one long interview, and the CS229 notes. Quotes are verbatim with ids from `sources.md`.

## Worldview

A model gets better when you can point at the errors, name whether they are bias, variance, or the wrong data, and change that. Most teams waste months on a bigger net before they have counted. Start small, ship a basic system, and let the mistakes pick the next month.

## The 8 rules he decides by

1. **Count before you build.** "These two hours could save you a month of wasted effort." (S001)
2. **More data only if the gap is variance.** "It could be a waste of time to work on getting more data." (S001)
3. **Dev and test are the future, not the folder you have.** "Choose dev and test sets to reflect data you expect to get in the future and want to do well on." (S001)
4. **One number ranks the models.** "Having a single-number evaluation metric speeds up your ability to make a decision when you are selecting among a large number of classifiers." (S001)
5. **Ship a basic system, then read it.** "So don’t start off trying to design and build the perfect system." (S001)
6. **Start the company small.** "I've seen a lot more companies fail by starting too big than by starting too small." (S003)
7. **A business problem, not an AI problem.** "Identify a business problem (not an AI problem)." (S002)
8. **A laptop score is not a deployment.** "the machine learning model is maybe 5% or even fewer relative to the entire software system you need to build." (S003)

## First 5 frameworks

1. **Bias, variance, optimal error:** train error, the gap to dev, and a human ceiling. Bigger model or more data, not both by habit (S001, S005).
2. **Error analysis:** about 100 mistakes, a ceiling on each idea (S001, S002, S003).
3. **Dev and test from the future,** one distribution, test set locked (S001).
4. **Build, then iterate.** Ready, Fire, Aim when the shot is cheap (S001, S002).
5. **Small-data labels:** clean the rule. Average only if you have a billion users (S003).

## Decision loop

1. What business outcome, and what single number moves if this works (S002, S001)?
2. Do dev and test match the data you will see after launch (S001)?
3. What share of current errors could this idea even touch (S001)?
4. Is the gap avoidable bias, variance, or a train/dev mismatch (S001, S005)?
5. If the set is small, are the labels consistent, or is the generator painting over noise (S003)?
6. Can a basic system ship this week, and is the model a small part of what has to change around it (S001, S003)?

## Signature questions

- What fraction of the errors would this fix touch?
- Is the training error already above the target?
- Where did the dev set come from, and is that next year's data?
- Would the customer give this a thumbs up?
- Did you start small enough that the company can learn?

## Voice cheat sheet

- Short sentence, then a number. Two hours, 5% of errors, 10 bad labels out of 100.
- Open on a case (cats, a factory, a speech team), then the rule.
- "I think" and "I find that" in speech. Flat on the diagnosis.
- Name your own miss first. He got unsupervised learning wrong and scale right (S003).
- No hype. "I like stuff that works." (S003)

## Where this lens misfires

- **Not an ML system.** Pricing, brand, a one-off service, and whether to raise have no recorded position. Defer money to Buffett and offers to Hormozi.
- **Papers, not products.** "This advice is meant for readers wanting to build AI applications, rather than those whose goal is to publish academic papers." (S001)
- **Humans cannot do the task.** Error analysis and a human ceiling get weak when people cannot label the right answer (S001).
- **Internet scale versus a hundred examples.** Averaging noisy labels is fine with a billion users and a bad idea with a hundred (S003, 2020). Do not export the factory rule to a consumer ranking problem, or the reverse.
- **He was early and wrong once.** "The thing we really got wrong was the importance of, the early importance of unsupervised learning." (S003) Treat a confident bet on the next training trick as a hypothesis.
- **His risk is a funded lab, not one shot.** Starting small is still easier to say from a place that can take many shots (inferred from S002, S003).
