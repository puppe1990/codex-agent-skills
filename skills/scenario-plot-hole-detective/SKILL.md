---
name: scenario-plot-hole-detective
description: Simulate user journeys and act as a "plot-hole detective" for PRDs, specs, flows, features, UX, architecture, and tests. Use when Codex needs to turn requirements into concrete scenarios, identify skipped steps, missing discovery mechanisms, edge cases, hidden dependencies, adoption risk, feedback failures, journey friction, or validate whether a proposal actually closes the story from the user's point of view.
---

# Scenario Plot-Hole Detective

Use this skill when an idea, PRD, spec, flow, or feature looks coherent on paper but may break when a real user tries to move through the whole story.

This skill is based on Drew Hoskins's approach: think about product as a combination of persona, motive, and full journey simulation. The job here is not to praise the proposal. It is to pressure-test it until skipped steps, edge cases, and decisions that only work for someone with builder-only "forbidden knowledge" start to show up.

## Expected output

Produce the response in four blocks unless the user asks for another format:

1. Base scenario
2. Step-by-step simulation
3. Plot holes
4. Recommended fixes

If the context is thin, state the assumptions in one short line and continue.

## Workflow

1. Identify the main user.
2. Make the immediate motive and usage context explicit.
3. Write the full journey simulation.
4. Look for plot holes.
5. Convert the holes into decisions, tests, or questions.

## 1. Define the character and context

Build a minimal character with:
- persona
- familiarity level
- immediate goal
- real constraints

Good constraints to consider:
- limited time
- imperfect memory
- multitasking
- risk aversion
- partial product knowledge

Avoid abstract characters like "the user". Say who they are, what they want right now, and what they truly know.

## 2. Write the full simulation

Tell the whole story, not just the slice that flatters the feature.

Push the simulation in three directions:
- What happened before the user got here?
- How did they discover what to do?
- What happens right after the main action?

A good simulation:
- justifies each step
- shows what the user perceives
- does not assume internal team knowledge
- includes consequences and next steps

## 3. Investigate the plot holes

Look for these two failure types first:

- skipped step
- edge case

Then look for these additional classes:

- missing discovery: nothing leads the user to discover the feature
- missing learnability: the interface does not teach how to use it
- broken transition: login, payment, permission, confirmation, or return interrupts the story
- invisible dependency: the proposal depends on another team, data source, integration, or behavior that is not guaranteed
- heroic memory: the flow assumes the user remembers something unlikely
- unhandled risk: the user hesitates because they may lose money, time, data, or context
- insufficient feedback: the system does not confirm, guide, or correct
- misaligned incentive: the feature exists but does not serve the persona's real goal
- hidden trade-off: it improves one case while hurting another important audience
- misuse or unsafe use: the affordance may push the user into the wrong or unsafe behavior

## 4. Questions the detective should ask

Use short and aggressively concrete questions:

- How does the user discover this exists?
- What do they need to know before this click?
- What do they see when it fails?
- What happens if they get interrupted halfway through?
- What changes for new, casual, and power users?
- What happens on the second use, not just the first?
- Which step depends too much on memory, patience, or luck?
- Which common case was left out because the story became too convenient?
- If the feature works technically and still fails in adoption, why would that happen?

## 5. How to report findings

Prioritize by journey impact, not technical elegance.

For each important hole, report:
- the point in the journey
- what was assumed incorrectly
- the user or business risk
- the simplest fix

Recommended format:

```text
Hole: The flow assumes the user remembers where they saved the draft.
Risk: abandonment and unnecessary support load.
Fix: show "Continue where I left off" at the main entry point and preserve context after login.
```

## When to go deeper

If the task touches design, roadmap, architecture, or tests, read [references/checklists.md](./references/checklists.md).

Use that file to:
- turn findings into scenario tests
- evaluate discovery, onboarding, and flow resumption
- pressure-test PRDs and specs before implementation
- simulate load and architectural impact from real journeys

## Operating rules

- Do not accept the slice most favorable to the proposal's author.
- Do not critique only the screen; critique the full journey.
- Do not jump straight to a solution before making the narrative failure explicit.
- Do not treat "the user" as a uniform blob; vary by persona when that changes the decision.
- Do not assume shipping ends the work; consider feedback, measurement, and iteration.

## Signs of good application

This skill is being used well when the response:
- reveals at least one step before and one after the main feature
- finds discovery gaps or edge cases that were not in the spec
- turns intuition into verifiable scenarios
- generates product, UX, architecture, or testing decisions based on the journey
