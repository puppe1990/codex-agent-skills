# Actionable Diagnostics Checklists

Use these checklists when the initial review needs more rigor.

## 1. Scenario framing

- Who sees this diagnostic?
- What were they trying to do?
- What object or target was involved?
- What is the cost of failure?
- Is the user blocked, delayed, or just being warned?

## 2. Message quality

- Does the message explain what was attempted?
- Does it identify what failed in product terms?
- Does it explain why the failure happened?
- Does it suggest the next action?
- Does it avoid leaking unnecessary implementation detail?

## 3. Actionability

- Can the user recover immediately?
- Can the system suggest a correction?
- Should the system auto-correct?
- Should there be a link to targeted troubleshooting guidance?
- Is retrying actually useful, or misleading?

## 4. Shift-left opportunities

- validate format before submission
- validate required context earlier
- show a dry run or preview
- ask for confirmation on risky actions
- warn when heuristics strongly suggest a mistake
- make the safe path the easiest path

## 5. Interface-layer design

- can this be validated at the UI boundary?
- can this be validated at the API boundary?
- should a low-level error be repackaged?
- what structured metadata should survive for upstream developers?
- which audience should see which form of the error?

## 6. Warning severity

- green: no interrupt needed
- yellow: confirmation or warning needed
- red: block or strong hurdle needed

## 7. Implementation notes

- preserve stable error codes where automation matters
- rewrite user-facing text at the interface layer
- add context fields for object, action, and likely correction
- track whether the new diagnostic improves completion or reduces support load
