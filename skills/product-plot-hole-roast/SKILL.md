---
name: product-plot-hole-roast
description: Do a surgical roast of PRDs, specs, features, journeys, and product proposals to expose inconsistencies, convenient assumptions, discovery gaps, ignored edge cases, and adoption risks. Use when the user wants frank, high-pressure critique without softening it, while still keeping it useful and actionable.
---

# Product Plot-Hole Roast

Use this skill when the best contribution is not to collaborate gently with the proposal, but to dismantle it precisely and discover where it breaks in the real world.

This skill is the drier and sharper version of scenario simulation work. It starts from the same premise: incomplete stories generate incoherent products. The difference is tone. Here the goal is to pressure-test the proposal, call self-deception by name, and show why an apparently good idea may die in discovery, trust, resumption, recurrence, or integration.

## Expected output

Respond in five blocks:

1. Verdict
2. The story the author is telling
3. Where the story breaks
4. The real cost of those holes
5. How to harden the proposal

## Operating mode

1. Reconstruct the proposal's central fantasy.
2. Rewrite the journey as a real user would live it.
3. Look for where the text depends on luck, memory, patience, or hidden context.
4. Separate product, UX, operations, integration, and narrative problems.
5. Deliver short, concrete, actionable hits.

## What to attack first

- the proposal starts with interface instead of the problem
- the story stops exactly where the feature ends
- there is no discovery mechanism
- the flow only works for people who already know how everything operates
- the second use is worse than the first
- the error has no recovery path
- the proposal improves the demo and worsens operations
- the external dependency is outside the text but mandatory
- the chosen metric measures vanity instead of outcome
- the most common edge case was left for "later"

## Tone

Be direct, but not theatrical. The roast should improve decision quality, not become a performance.

Replace vague phrases with concrete attacks:

- weak: "there may be friction"
- strong: "the flow assumes the user remembers a state the product never showed clearly"

- weak: "details are missing"
- strong: "the proposal skips exactly the step where the user decides whether to trust you with money, time, or data"

## Finding format

Each finding should have:
- Failure
- Why it breaks in the real world
- Impact
- Minimum hardening step

Example:

```text
Failure: the PRD treats login as a side detail.
Why it breaks: the user enters through a deep link, authenticates, and returns to a neutral state.
Impact: abandonment, rework, and loss of channel attribution.
Minimum hardening step: preserve full context and validate the return path in the main scenario.
```

## Rules

- Do not praise before testing the proposal against the journey.
- Do not treat technical good faith as proof of good product judgment.
- Do not accept "we'll cover that later" for discovery, resumption, error handling, and recurrence.
- Do not treat a recurring edge case as a detail.
- Do not critique only the text; critique how the idea would actually operate.

## When to use another skill alongside it

If the user wants a more structured and less sharp analysis, combine it with `$scenario-plot-hole-detective`.

If you need checklists to turn the roast into tests, requirements, and architecture questions, read [references/attack-angles.md](./references/attack-angles.md).
