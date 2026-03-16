---
name: actionable-diagnostics-shift-left
description: Turn cryptic errors into actionable diagnostics and push failures earlier in the user journey. Use when Codex needs to rewrite error messages, warnings, validations, confirmations, or recovery flows so they explain what the user was trying to do, what failed in product terms, and how to fix it immediately, while also preventing expensive mistakes before they happen.
---

# Actionable Diagnostics and Shift-Left

Use this skill when a product, API, form, workflow, or developer tool is losing user time because its errors are technically accurate but operationally useless.

This skill is based on Drew Hoskins's guidance on diagnostics: understand the scenario, provide context, make messages actionable, raise errors at the interface, and shift left by firing warnings or validations before the user pays the full cost of failure.

## What this skill does

It improves:
- error messages
- warning messages
- upfront validations
- confirmation dialogs
- retry guidance
- recovery instructions
- diagnostic metadata for upstream developers

It focuses on two jobs:
- explain the failure in terms the user understands
- help the user recover or avoid the failure as early as possible

## Expected output

Respond in five blocks:

1. User scenario and failure moment
2. What the current diagnostic gets wrong
3. Rewritten diagnostic
4. Shift-left opportunities
5. Implementation notes

If context is missing, state assumptions briefly and continue.

## Workflow

1. Identify who is seeing the diagnostic.
2. Identify what they were trying to do.
3. Identify what failed technically and what failed experientially.
4. Rewrite the message at the right interface layer.
5. Look for ways to warn, validate, or confirm earlier.

## 1. Start from the scenario

Do not start with the exception string.

Start with:
- persona
- attempted action
- object of the action
- consequence of failure
- urgency and recoverability

Ask:
- Is this meant for an end user, operator, or upstream developer?
- Are they blocked, confused, or at risk of making a costly mistake?
- What is the shortest path back to success?

## 2. Add context the user actually needs

Good diagnostics usually answer three questions:
- What was being attempted?
- What or who did it happen to?
- Why did it fail?

The message should recap the user's attempted goal in product terms, not just system terms.

Weak:

```text
Invalid recipient
```

Stronger:

```text
Cannot send this message to @barnyard-friends because that value is formatted like a user handle, not a channel.
```

## 3. Make the diagnostic actionable

After context, reduce the user's search space.

Good actions include:
- suggest the likely correction
- offer the next step
- point to the correct field or object
- explain whether retrying is useful
- link to a targeted troubleshooting page when needed

Ask:
- Can the user fix this immediately?
- Can the system suggest a likely intended value?
- Should the product do the correction for them?

## 4. Raise diagnostics at the interface

The best message is usually not the one thrown deepest in the system.

When possible:
- validate at the API or UI boundary
- intercept low-level errors and repackage them
- attach user-facing context at the interface layer
- preserve structured metadata for developers upstream

Do not leak implementation detail if it does not help recovery.

## 5. Shift left

The goal is not only better failure messages. It is fewer expensive failures.

Look for chances to fire earlier:
- upfront input validation
- format validation
- dangerous-action confirmations
- heuristic warnings
- dry runs and previews
- safe defaults
- explicit scope reminders

Ask:
- What can be detected before submission?
- What can be confirmed before a destructive action?
- What expensive retry loop can be prevented?

## 6. Design warnings by consequence

Not every issue deserves the same friction.

Think in levels:
- green: proceed quietly
- yellow: warn and let the user confirm
- red: block or make the user clear a high bar

The product should make safe paths easy and risky paths explicit.

## 7. Output format for rewrites

For each important case, include:
- current diagnostic
- user problem
- rewritten message
- recommended earlier check or warning
- metadata or implementation notes if relevant

Recommended format:

```text
Current diagnostic: Invalid channel
User problem: the user tried to send a message to a channel using @ instead of #
Rewritten message: Cannot send this message to @barnyard-friends because it looks like a user handle. Did you mean to send it to users, or to #barnyard-friends?
Shift-left improvement: validate handle prefixes before submission and suggest the likely target inline
Implementation note: keep the low-level error code but repackage it at the API boundary
```

## When to go deeper

If the task touches forms, APIs, destructive actions, SDKs, or recovery-heavy workflows, read [references/checklists.md](./references/checklists.md).

Use that file to:
- classify the audience for diagnostics
- choose between validation, warning, and hard error
- improve structured error metadata
- add targeted confirmations and previews

## Operating rules

- Do not write diagnostics only from the implementer's perspective.
- Do not stop at describing the failure; help the user recover.
- Do not fire errors late if you can validate earlier.
- Do not use internal vocabulary when product vocabulary would work better.
- Do not add friction without checking whether the scenario is actually risky.

## Signs of good application

This skill is working when:
- users can tell what they were trying to do and why it failed
- messages reduce time spent debugging or contacting support
- expensive mistakes are intercepted earlier
- developers keep structured error semantics without sacrificing user clarity
