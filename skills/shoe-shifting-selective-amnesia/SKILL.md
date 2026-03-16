---
name: shoe-shifting-selective-amnesia
description: Simulate product usage with "shoe-shifting" and selective amnesia to fight the curse of knowledge. Use when Codex needs to evaluate UX, onboarding, discovery, naming, navigation, messaging, affordances, and signifiers as if it knew nothing about the implementation, deliberately ignoring the forbidden knowledge that only the builders have.
---

# Shoe-Shifting With Selective Amnesia

Use this skill when there is a risk that the team is designing for itself rather than for a real user.

The idea comes directly from Drew Hoskins's approach: do `shoe-shifting`, put yourself in the user's shoes, and practice selective amnesia, acting as if the knowledge gained during implementation did not exist. The goal is to detect when the interface requires the user to guess internal concepts, hidden states, or steps that only make sense to someone who knows the system from the inside.

## What this skill does

It evaluates whether the product:
- can be understood from the interface itself
- provides enough signifiers
- uses understandable names
- gives redundant cues when necessary
- does not depend on documentation as a crutch
- does not assume the user will "read the author's mind"

## Expected output

Respond in five blocks:

1. Assumed role
2. What I can infer without internal knowledge
3. Where I needed forbidden knowledge
4. Signifier and discovery failures
5. Recommended fixes

If context is missing, declare the assumptions briefly and continue.

## Workflow

1. Choose a plausible persona and familiarity level.
2. Explicitly declare which internal knowledge will be forgotten.
3. Simulate the journey using only what the interface communicates.
4. Mark every moment where the experience requires guessing.
5. Convert the failures into copy, structure, feedback, or flow improvements.

## 1. Assume the right role

Do not use "the average user" without a face. Choose a concrete role, for example:
- new user
- recurring user, but not an expert
- distracted user
- rushed customer
- engineer using an internal tool with no prior context

Bring along the universal limitations highlighted in the book:
- limited mental bandwidth
- preference for avoiding documentation
- search for the shortest path
- multitasking
- risk aversion
- imperfect memory

## 2. Apply selective amnesia

List mentally what you know because you built or studied the system and pretend you do not know it.

Forget, for example:
- internal entity names
- team acronyms
- the "correct" flow order because it lives in the backend
- states or rules that only appear in logs or docs
- configurations the team considers obvious
- the difference between similar concepts the UI does not explain

Rule: if the action only feels natural because you know the implementation, treat that as a product failure signal.

## 3. Test signifiers and cues

During the simulation, ask:
- What on this screen tells me this action exists?
- What in this word tells me what will happen?
- How would I differentiate this from another similar option?
- Is the system signaling safety, risk, or irreversibility?
- Is there enough visual or textual guidance for me to proceed confidently?

If the answer depends on "I know how the system works", the test failed.

## 4. Detect the curse of knowledge

Common signs:
- labels that only make sense to the team
- a flow that requires remembering something that was never shown clearly
- functionality discovered only through curiosity or random exploration
- empty states with no guidance
- an error that uses internal vocabulary
- a screen that assumes knowledge from the previous step
- an important concept explained only in documentation
- an affordance that exists without enough signifier support

## 5. How to report

For each important problem, report:
- the point in the journey
- which forbidden knowledge was being assumed
- why a plausible user would get stuck
- the smallest useful correction

Recommended format:

```text
Failure: "Workspace Context" is only clear to people who know the product architecture.
Forbidden knowledge being assumed: the user knows the difference between local, global, and shared context.
Impact: hesitation, configuration errors, and fear of breaking something.
Fix: rename it, add a short in-line explanation, and signal scope before confirmation.
```

## When to go deeper

If the task involves navigation, naming, onboarding, documentation, or error messages, read [references/checklists.md](./references/checklists.md).

That file helps you:
- stress-test signifiers versus affordances
- test discovery without documentation
- review names and messages
- evaluate flow resumption without internal context

## Operating rules

- Do not use documentation as an excuse for a weak interface.
- Do not defend a decision just because it mirrors the architecture.
- Do not call something "intuitive" if it depends on informal training.
- Do not assume a user will explore everything before acting.
- Do not treat textual, visual, and structural cues as equivalent; evaluate the set.

## Signs of good application

This skill is working when:
- the analysis finds points that only seem obvious to the team
- the response shows exactly where the interface stops teaching
- the fixes improve discovery, trust, and resumption
- the team can separate system knowledge from user knowledge
