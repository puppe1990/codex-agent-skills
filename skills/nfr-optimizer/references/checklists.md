# NFR Optimizer Checklists

Use these checklists when the initial review needs more rigor.

## 1. Scenario-first framing

- Which persona is affected?
- Which journey step is affected?
- What is the user's goal at that moment?
- What business outcome is tied to that step?
- Is this a discovery, usage, or completion moment?

## 2. System-to-product mapping

For each issue, capture:
- technical metric
- service or subsystem
- journey step
- user-visible symptom
- scenario metric
- business metric

## 3. High-leverage NFR questions

- Is this issue happening in a high-intent step?
- Does it affect conversion, trust, or retention?
- Is the impact immediate or delayed?
- Is the issue user-visible or mostly internal?
- Is this a bottleneck in a core path or a side path?

## 4. Digital twin gaps

- Are the key journey steps instrumented?
- Do traces connect to user flows?
- Are scenario metrics available?
- Is there support or feedback evidence for this failure?
- Are load simulations realistic enough to reflect production use?

## 5. Trade-off review

- latency versus consistency
- availability versus correctness
- throughput versus cost
- speed versus safety
- local optimization versus journey optimization

## 6. Validation paths

- correlate system metrics with scenario completion
- instrument missing journey steps
- compare affected funnels before and after
- run an A/B test if feasible
- replay realistic scenarios in load or staging environments
