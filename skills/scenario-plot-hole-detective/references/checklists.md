# Scenario Detective Checklists

Use these checklists only when you need to go beyond the initial critique.

## 1. Simulation checklist

- Who exactly is the persona?
- What is the immediate motive?
- In what environment does this happen?
- Is the user rushed, distracted, or interruptible?
- What do they know before opening the product?
- How do they discover the functionality?
- What is the first visible action?
- What confirms progress?
- What can go wrong?
- How do they resume after interruption?
- What happens after completion?

## 2. Common plot-hole types

- skipped step
- ignored edge case
- nonexistent discovery channel
- unintuitive naming
- unhandled external dependency
- empty state without guidance
- error without next action
- post-login return without context preservation
- flow that works for power users and fails for novices
- feature that is useful in the demo and weak in recurring use

## 3. Personas to stress-test

Run the simulation through at least these three filters when relevant:

- new user: low familiarity, more fear, less context
- recurring user: wants shortcuts, less friction, and continuity
- advanced user: pushes limits, wants speed and predictability

If this is a marketplace, platform, or B2B product, also simulate the different sides of the system.

## 4. Convert into scenario tests

When moving from critique into execution:

- name the scenario by the user's goal
- describe preconditions
- list the sequence of observable steps
- define visible success for the user
- define important failures and expected messages
- cover resumption, second use, and priority variations

## 5. PRD or spec critique

Ask:

- does the story end, or does it stop in the middle of the feature?
- is there evidence that this flow matters to the persona?
- does the proposal solve the problem, or just add interface?
- what must be true about data, permissions, or integrations?
- which metrics would show success in the journey?
- which questions need to be answered before implementation?

## 6. Journey-driven architecture

When the proposal affects backend, platform, or scale, turn the journey into requirements:

- acceptable latency per step
- user-perceived consistency
- tolerance for delay, duplication, or reordering
- states that must survive refresh, login, or device switching
- real scenarios that should be reproduced in load simulations

Do not simulate isolated calls if the real problem is a sequence of user actions.
