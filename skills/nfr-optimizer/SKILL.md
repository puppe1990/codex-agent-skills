---
name: nfr-optimizer
description: Optimize nonfunctional requirements from a product and business perspective instead of pure system sport. Use when Codex needs to connect latency, availability, consistency, throughput, and scale decisions to user outcomes, scenario completion, conversion, adoption, or business impact using a product digital twin.
---

# NFR Optimizer

Use this skill when the question is not just "how do we make the system faster?" but "where should we improve system behavior to create the most user and business impact?"

This skill is based on Drew Hoskins's treatment of product architecture, scenario metrics, and the digital twin. The goal is to bridge system metrics and product outcomes so teams can stop optimizing blindly and instead improve the parts of the experience that matter most to real users.

## What this skill does

It helps evaluate nonfunctional requirements such as:
- latency
- availability
- consistency
- throughput
- resilience
- scale behavior

But it does so through:
- user journeys
- scenario completion
- conversion and drop-off
- trust and perceived reliability
- operational and business impact

## Expected output

Respond in five blocks:

1. Product scenario under evaluation
2. System-to-user metric mapping
3. Highest-leverage NFR opportunities
4. Trade-offs and risks
5. Recommended measurement and next step

If the context is incomplete, state assumptions briefly and continue.

## Workflow

1. Identify the user journey and business goal.
2. Identify the system characteristics affecting that journey.
3. Map system metrics to scenario metrics and user outcomes.
4. Compare candidate optimizations by likely product impact.
5. Recommend what to improve first and how to validate it.

## 1. Start from the product scenario

Do not start with a dashboard.

Start with:
- the persona
- the journey step
- the user goal
- the business outcome tied to that goal

Examples:
- search responsiveness affecting product discovery
- checkout latency affecting payment completion
- post-submit consistency affecting trust
- background sync delays affecting team collaboration

## 2. Use the digital twin as the bridge

Treat the digital twin as the combined picture of:
- tests and test environments
- product instrumentation
- observability
- analytics
- traces
- support and feedback signals
- repro cases and scenario simulations

Use it to connect:
- low-level system behavior
- scenario-level completion and degradation
- business-facing outcomes

If the system has strong observability but weak product instrumentation, say so explicitly. That gap matters.

## 3. Map system metrics to user impact

For each candidate issue, map:
- technical metric
- affected scenario step
- user-visible consequence
- product metric consequence
- business consequence

Recommended format:

```text
Technical metric: p95 checkout API latency
Scenario step: final payment confirmation
User consequence: hesitation, retrying, or abandonment at the most trust-sensitive moment
Product metric consequence: lower checkout completion
Business consequence: direct revenue loss
```

## 4. Prioritize by scenario leverage, not engineering sport

Do not optimize a hotspot just because it is measurable or technically elegant.

Ask:
- Which journey is most important?
- Which step is most sensitive to delay, failure, or inconsistency?
- Which degradation causes abandonment versus mild annoyance?
- Which improvement would move conversion, trust, or retention?
- Which issue is invisible to users and therefore lower priority?

A smaller latency gain in the right step may beat a larger gain in the wrong step.

## 5. Evaluate trade-offs

NFR decisions are dominated by trade-offs. Make them explicit:
- latency versus consistency
- availability versus correctness
- throughput versus cost
- speed versus implementation risk
- local optimization versus whole-journey optimization

Ask whose experience is being improved and whose is being degraded.

## 6. Recommend what to optimize first

For each recommendation, include:
- candidate optimization
- target journey step
- expected user impact
- expected business impact
- confidence level
- validation method

Recommended format:

```text
Optimization: reduce p95 latency in checkout confirmation before search autosuggest
Target step: payment confirmation
Expected user impact: fewer abandonment events at the highest-intent moment
Expected business impact: stronger lift in conversion and revenue
Confidence: medium
Validation: correlate trace latency with checkout completion and run an experiment if feasible
```

## When to go deeper

If the task touches observability, product metrics, load testing, or rollout strategy, read [references/checklists.md](./references/checklists.md).

Use that file to:
- map scenario metrics to system metrics
- compare latency versus availability improvements
- pressure-test scale and reliability work against user value
- plan instrumentation gaps in the digital twin

## Operating rules

- Do not optimize algorithms for sport.
- Do not treat low-level metrics as enough on their own.
- Do not ignore where in the journey the degradation happens.
- Do not use system proxies when scenario metrics are available.
- Do not recommend NFR work without a validation path.

## Signs of good application

This skill is working when:
- the analysis ties system behavior to a concrete user journey
- recommendations are prioritized by conversion, trust, or user value
- the team can explain why one latency improvement matters more than another
- the digital twin becomes more useful for future product decisions
