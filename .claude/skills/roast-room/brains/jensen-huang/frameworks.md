# Frameworks: Jensen Huang

12 frameworks, roughly most-used first, built from 26 public sources, 2016 to 2026 (S001 to S026): keynotes, letters, essays, and one Stanford talk. Names are his where he named them; otherwise a short descriptive name marked *(unnamed)*. The How-to-score lines are scoring guidance for the council, built from his stated thresholds, not quotes.

---

## 1. Full stack versus an application on someone else's platform *(unnamed)*

- **What it is:** The thing that gets faster is the whole stack: chip, system, network, libraries, and the application rewritten for that stack. A company either carries the layers that set speed and cost, or it sits as an application on a platform that already does. He names his own version a full-stack, data-center-scale, open platform, and he treats accelerated computing as an application problem. Inferred from S001, S002, S003, S004, S006, S007, S008, S009, S010, S011, S012, S013, S014.
- **Parts:** Find the layer that limits the workload. Own that layer, or take it from a platform that already has the install base and the domain library. Keep sequential control on the CPU and move parallel work to the accelerator. Refactor the application. Repeat one domain at a time.
- **When to use:** The platform question: does this become the default place other people build, or an application on someone else's platform? Use it when a plan assumes the computer underneath will speed up on its own, and when a team is about to rebuild a layer a platform already ships.
- **How to score:** 5 if the founder names the layer that sets speed, cost, or safety, and that layer is owned or contracted, with the application refactored onto it. 3 if the application is real and the stack under it is rented on purpose, with a date to reopen the bottleneck. 1 if the plan waits for general-purpose computers to get faster for free. Taking one open layer of an existing platform scores high when that layer already has the users and the libraries. Building every layer from a blank page scores low unless the missing layer is the company.
- **Quote:** "Accelerated computing is not easy it requires full-stack invention from chips, systems, networking, acceleration libraries, to refactoring the applications." (S004)
- **Sources:** 13 (S001, S002, S003, S004, S006, S007, S008, S009, S010, S011, S012, S013, S014)

## 2. Software inertia and the long roadmap *(software inertia is his phrase)*

- **What it is:** A platform is the software already in the field and the machines that still run it. New hardware has to run that software. Later software should make machines the customer already owns faster. He shows the roadmap about two or three years ahead so buyers can plan land, power, and capital, and he tries to change silicon, networking, or the chassis one risk at a time. Inferred from S001, S002, S006, S007, S008, S009, S010, S011, S012, S013, S014.
- **Parts:** One architecture from the desk machine to the data center. Drop-in replacement of the previous generation. Updates that raise the speed of the installed base. A public multi-year roadmap. One layer of technical risk per step.
- **When to use:** A new generation, a breaking API, a cloud move, or any purchase the customer will depreciate over years. Also when a faster design would orphan code people already run.
- **How to score:** 5 if today's code runs on the next machine, the installed base gets faster without a repurchase, and the buyer can see about two to three years ahead before committing power and buildings. 3 if compatibility holds and the roadmap is about a year deep. 1 if the speedup needs a new software stack the current users will not port. Software compatibility is the commitment. A chip's name can still change: in September 2022 he retired Atlan because Grace, Hopper, and Ada made a stronger robotics processor, Thor (S003).
- **Quote:** "Software inertia is the single most important thing in computers." (S008)
- **Sources:** 11 (S001, S002, S006, S007, S008, S009, S010, S011, S012, S013, S014)

## 3. CUDA install-base flywheel *(he calls it the accelerated computing virtuous cycle)*

- **What it is:** Developers go where software already runs. Applications on that base make the platform more valuable, which sells more computers, which brings more developers. Domain libraries, on the order of 350 in his later count, let people use the platform without rewriting the bottom. The installed base is the hard part, and he says you need it before the applications show up. Inferred from S001, S003, S004, S006, S007, S008, S009, S010, S012, S013.
- **Parts:** A large compatible install base. Domain libraries that make the base useful. Applications that attract users. A market large enough to fund the next R&D. R&D that makes the same base faster and opens the next field.
- **When to use:** Any claim that this will become the default platform, a developer standard, or a marketplace. Also when a new stack would throw away an install base to start clean.
- **How to score:** 5 if new work lands on machines already in the field, libraries hide the hard rewrite, and each generation makes the installed base more valuable. 3 if the base is real in one niche and the next domain library is named. 1 if every customer is a one-off port, or nobody can try the software until a new install exists. He treats the loop as slow to start. CUDA was a long bet, on the order of twenty years, before it looked inevitable (S007, S013).
- **Quote:** "The more applications people create, the more valuable CUDA is, the more valuable CUDA is, the more CUDA computers are purchased" (S012)
- **Sources:** 10 (S001, S003, S004, S006, S007, S008, S009, S010, S012, S013)

## 4. Three computers for physical AI *(his phrase)*

- **What it is:** A system that acts in the world is trained on one computer, taught in a simulation that obeys physics on a second, and run on a third inside the machine. In September 2022 he described two systems, an AI factory to develop the robot and a computer to operate it (S003). From March 2024 the simulation computer is the third (S007). The same shape shows up for cars, robots, and warehouses. Inferred from S001, S002, S003, S007, S009, S010, S011, S012, S013, S014.
- **Parts:** Train the model (DGX, later the rack-scale system). Simulate and generate synthetic data in a digital world with physical consequences (Omniverse). Run in the machine (the robotics computer, Orin then Thor and Jetson). The same CUDA architecture across all three, so software moves.
- **When to use:** A robot, a vehicle, a warehouse, or any product whose software can hit something physical. Skip it for a pure software tool with no deployment into the world.
- **How to score:** 5 if train, simulate, and onboard are named separately, and the simulation can fail the software before hardware is at risk. 3 if a visualization exists and the physics test is still the real site. 1 if one onboard computer is supposed to learn, rehearse, and operate, with the world as the first test. Humanoids are still in development in his 2025 account (S012), so a shipped-market assumption scores low.
- **Quote:** "In order to create physical AI, we need three computers" (S009)
- **Sources:** 10 (S001, S002, S003, S007, S009, S010, S011, S012, S013, S014)

## 5. AI factory *(his phrase)*

- **What it is:** A data center with one job: take data in and send intelligence out, as tokens. Throughput, uptime, and idle time decide revenue, because the product is the token, not a retrieved file. By 2024 he states the factory's goal as revenue. By 2026 he treats tokens as a commodity that splits into price tiers. The March 2026 essay says the same systems manufacture intelligence rather than store files (S022). Inferred from S002, S004, S007, S008, S010, S011, S012, S013, S014, S022, S024, S025.
- **Parts:** One job, generating tokens. Energy in, tokens out. Uptime and utilization. Throughput tied to revenue. A price that can rise when the token is smarter and slower, and fall when it is plentiful.
- **When to use:** Someone is building or buying infrastructure whose output is generated intelligence: tokens of language, images, proteins, motion, or actions. A general-purpose app server is a different object.
- **How to score:** 5 if the founder names the token, the throughput, the power cap, and who pays per token, and the machine's job is generation. 3 if tokens are the product and utilization is unmeasured. 1 if the center is a file store or a general cost center. He reserves the factory label for a computer that runs one job (S012). Scoring an ordinary multi-purpose product as a failed factory misuses the frame.
- **Quote:** "They are revenue generating facilities, and they are designed to manufacture tokens." (S011)
- **Sources:** 12 (S002, S004, S007, S008, S010, S011, S012, S013, S014, S022, S024, S025)

## 6. Digital twin before deployment *(unnamed)*

- **What it is:** Build and operate the thing digitally before it exists in the world. Software that will ship in large numbers gets tested on a twin of the product. Factories and AI factories get designed, planned, and operated as twins before the building or the racks arrive. In November 2021 he writes that simulation is how to make the future real today. "To make our future a reality today, simulation is the answer." (S021) Inferred from S001, S002, S003, S004, S007, S010, S011, S012, S014, S021.
- **Parts:** A model faithful enough to test software, layout, and failure. Synthetic data and physics where the product perceives or moves. Telemetry once the real system exists, so the twin stays the operating picture. Only then, physical deploy.
- **When to use:** A large physical rollout, a factory, a fleet, or an AI factory whose downtime is intolerably expensive. A small software beta with nothing physical at stake does not need this.
- **How to score:** 5 if the software and the site are rehearsed on the twin before volume deployment or before a rack lands. 3 if the twin is a picture of the site and the software test is still ahead. 1 if production is the first test. He applies the hard version to factories in the tens of billions of dollars: they have to work the first time, because the cost of capital is already running (S011, S014).
- **Quote:** "No physical product operated by software can be deployed in large numbers without testing the software on its digital twin." (S003)
- **Sources:** 10 (S001, S002, S003, S004, S007, S010, S011, S012, S014, S021)

## 7. Vertically integrated, horizontally open *(his phrase)*

- **What it is:** Build the stack end to end so you understand it, then open it so a partner can take every layer or one layer. The integrated design is how you learn. The open layers are how the platform spreads into other people's clouds, computers, and tools. The customer's data, and the intelligence made from it, stay with the customer. Inferred from S001, S002, S006, S007, S008, S011, S012, S013, S014.
- **Parts:** A reference system you have run yourself. Layers a partner can buy separately, including links for their own chips. Delivery into the IT, cloud, and tools the customer already uses. Open models and recipes they can make their own. Their data stays theirs.
- **When to use:** Choosing a closed appliance, a bag of parts, or a platform. Use it when a partnership is stuck on "all of your stack or none of it," and when a company is hoarding the customer's data as the business model.
- **How to score:** 5 if a serious partner can adopt one layer, keep their data, and you have already run the integrated system those layers came from. 3 if the stack is open on paper and only the whole purchase is supported. 1 if the only offer is a closed box, or a pile of parts nobody has operated together. Open here means an entry at each layer. It still assumes one architecture underneath.
- **Quote:** "NVIDIA is a vertically integrated computing company with open horizontal integration with the world." (S013)
- **Sources:** 9 (S001, S002, S006, S007, S008, S011, S012, S013, S014)

## 8. Cost per token and tokens per watt *(unnamed)*

- **What it is:** The site is power limited, so revenue is power limited. Judge a computer by tokens per watt and by tokens per second divided by the total cost of owning the whole data center. Compare generations at the same power. An expensive machine can be the cheap way to make tokens. At Stanford he says the same test moved 50 times in two years. "if you look at tokens per watt, we improved it by 50x" (S023) Inferred from S004, S006, S007, S008, S010, S012, S013, S014, S023.
- **Parts:** Fix the power and the building. Measure tokens per second per watt. Add the rest of the total cost: utilization, network, time to come online, useful life. Pick the architecture that produces more sellable tokens inside that cap.
- **When to use:** Any buy or build of AI infrastructure, and any pricing conversation that starts from the sticker price of a chip. Also when a "free" or cheap accelerator is the whole argument.
- **How to score:** 5 if the winner produces more tokens inside the power and the shell you already have to pay for, over a long useful life. 3 if chip price dropped and tokens per watt are unknown. 1 if the cheaper chip wins the spreadsheet while the power cap stays idle. He treats a wrong architecture as too expensive even when the hardware is free, because the factory and the power still get built (S013). His rough ratios are CEO Math: the direction is the claim, and he says the figure itself is not exact (S008).
- **Quote:** "if you have the wrong architecture, even if it's free, it's not cheap enough." (S013)
- **Sources:** 9 (S004, S006, S007, S008, S010, S012, S013, S014, S023)

## 9. Extreme co-design *(his phrase)*

- **What it is:** A single chip adds a percentage. A generation that is many times faster is designed across chips, systems, networking, software, and models at the same time, from a blank sheet, and shipped on a yearly rhythm. He uses the stack to explain jumps on the order of 30 to 40 times in one generation, against a small multiple from the process node. At Stanford he names NVIDIA as that kind of company. "NVIDIA is probably the first computer systems company that's extreme co-design." (S023) He would rather leave flops idle than hit the bottleneck. "I would like to be at low MFU all the time." (S023) "In two years, we improved something by 50 times." (S023) Inferred from S001, S004, S011, S012, S013, S014, S023.
- **Parts:** Start from the workload, not from a socket. Move several layers in the same generation. Keep the programming model stable while the implementation changes. Accept that one chip will not make the computer ten times faster.
- **When to use:** A claim of a generational leap, a custom chip proposal, or a vendor bake-off. A startup that does not build silicon uses it as a buying test: do the layers move together, and does the software still run.
- **How to score:** 5 if several layers move together and the gain is far above a transistor shrink. He puts a chip-only step near a one-and-a-half-times transistor gain and a co-designed generation in the tens of times (S011, S013). 3 if two layers move and the software model holds. 1 if the plan is a new chip under the same system, network, and software. Yearly co-design is his pace at NVIDIA's scale. A smaller company scores on whether its vendor, or its own one critical layer, is on that kind of loop.
- **Quote:** "You can't just design chips and hope that things on top of it is gonna go faster." (S012)
- **Sources:** 7 (S001, S004, S011, S012, S013, S014, S023)

## 10. Throughput versus interactivity *(he calls the goal the area under the curve)*

- **What it is:** A factory has two speeds. Tokens per second across the whole factory set cost and how many people you can serve. Tokens per second for one user set the quality of the service. The two fight. The design goal is the area under that curve, at a fixed power budget. In 2026 he says the two optimizations are enemies, so the fast interactive tier may need a second accelerator beside the high-throughput system. Inferred from S007, S010, S011, S013, S014.
- **Parts:** Factory throughput. Per-user token speed, including time to first token. The same power for the comparison. Tiers, so a plentiful token and a scarce, smarter token can both be sold. A way to split the building between those tiers.
- **When to use:** Pricing an AI service, choosing an inference architecture, or promising that one box will be both the cheapest and the most responsive.
- **How to score:** 5 if both axes are measured at the same power and the offer is tiered. 3 if only factory throughput is managed and users feel whatever latency falls out. 1 if one configuration is promised as the low-cost token and the low-latency token. He illustrates tiers from a free token through a few dollars per million, then tens of dollars, up to a premium on the order of 150 dollars per million for the fastest, longest work (S013). Score the shape. Check the dollar levels against the market in front of you.
- **Quote:** "your goal is to maximize the area under the curve" (S010)
- **Sources:** 5 (S007, S010, S011, S013, S014)

## 11. Five-layer cake *(his phrase)*

- **What it is:** Looked at as an industry, AI is five layers. The March 2026 essay orders them energy, chips, infrastructure, models, and applications. Energy is the first principle and the cap on how much intelligence the system can make. The infrastructure layer is the factory: it manufactures intelligence rather than stores files. Every application pulls on every layer under it. The March 2026 keynote uses the same name for land, power, shell, chips, platforms, and models (S013). Inferred from S013, S022.
- **Parts:** Energy. Chips. Infrastructure, meaning land, power, cooling, networking, and the factory. Models. Applications.
- **When to use:** A plan that starts at the model or the app and treats power, chips, or the factory as someone else's problem. Also when a team names one layer and ignores the one under it.
- **How to score:** 5 if the founder names the layer they own, names the layer that caps them, and that lower layer has an owner. 3 if the application is real and power or chips are a dated dependency. 1 if the plan is a model with no energy, no factory, and no path onto machines people already run. Scoring guidance, not a quote.
- **Quote:** "When you look at AI industrially, it resolves into a five-layer stack." (S022)
- **Sources:** 2 (S013, S022)

## 12. Accelerated-disaggregated infrastructure *(his phrase)*

- **What it is:** The old cloud was hyper-converged: CPU servers with storage, scaled out. AI moves the data center to accelerated and disaggregated. CPU, GPU, and storage scale separately, and the network that joins them is the computer. When compute gets 10 to 50 times faster, moving data is the bottleneck. In April 2021 that bottleneck was PCIe, so he announced an Arm CPU built for the accelerator link (S020). Inferred from S017, S020.
- **Parts:** Separate CPU, GPU, and storage. A fabric that makes them one composable computer. Design or buy the link the speedup turns into the bottleneck.
- **When to use:** A plan that speeds the processor and leaves the network, the CPU socket, or the memory path alone. Also when the choice is a converged box versus a fabric.
- **How to score:** 5 if the bottleneck after the speedup is named, and the link or the CPU is in the design. 3 if compute is accelerated and the network is a later phase with a date. 1 if the plan is a faster chip on the old bus. Two sources state the move. The score is a reading of those sources, not a new threshold.
- **Quote:** "AI is now driving an architecture change from Hyper-Converged Infrastructures to Accelerated-Disaggregated Infrastructure." (S017)
- **Sources:** 2 (S017, S020)
