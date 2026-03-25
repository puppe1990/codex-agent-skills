---
name: website-audit-report-stack
description: Orchestrate an end-to-end website audit report flow from raw JSON to final narrative. Use when the user wants a technical or executive report similar to an audit dashboard export, using raw website audit payloads with module scores, recommendations, detailed results, and optional AI-generated analysis.
---

# Website Audit Report Stack

Use this skill as the generic entry point for website audit reporting. It coordinates normalization and report writing without assuming any company-specific rules.

## Stack Order

Use the stack in this order:
1. `$website-audit-collector` when the input is a URL
2. `$audit-json-normalizer`
3. `$audit-report-writer`
4. `$website-audit-ui-exporter` when the final consumer is a UI

Do not skip normalization unless the input already follows the canonical schema described in [stack-notes.md](./references/stack-notes.md).

## Supported Inputs

- Raw JSON files like `/Users/.../relatorio-8.json`
- Live URLs such as `http://localhost:3001` or `https://example.com`
- Internal API payloads with `results` and `detailed_results`
- Exports from website audit systems that contain module scores, detail objects, recommendations, and optional AI analysis

## Modes

- `technical`: full report with module breakdown, evidence, priorities, KPI, and next steps
- `executive`: compact report focused on risks, quick wins, and a short action plan

## End-to-End Workflow

1. If the input is a URL, run the collector script and save the raw audit JSON.
2. If the input is already a raw audit file, inspect it and verify that it contains auditable module data.
3. Run the normalizer script and save the canonical JSON.
4. Choose `technical` or `executive` mode based on the user request.
5. Render the first draft with `$audit-report-writer`.
6. Export UI-ready JSON with `$website-audit-ui-exporter` when needed.
7. Refine the final narrative only where project context adds real signal.

## Output Expectations

The final report should include:
- audited URL
- overall score
- score breakdown by module
- top priorities
- KPI-linked next steps

Optional:
- AI insight summary
- effort and impact framing
- cost-analysis bands when business baselines are missing
- UI-ready JSON payload for cards and report pages

## Suggested Commands

```bash
node /Users/matheuspuppe/.codex/skills/website-audit-collector/scripts/collect_audit.js https://example.com --output /tmp/raw-audit.json
python3 /Users/matheuspuppe/.codex/skills/audit-json-normalizer/scripts/normalize_report.py /path/to/report.json --output /tmp/normalized-audit.json
python3 /Users/matheuspuppe/.codex/skills/audit-report-writer/scripts/render_report.py /tmp/normalized-audit.json --mode technical --include-cost-analysis
node /Users/matheuspuppe/.codex/skills/website-audit-ui-exporter/scripts/export_ui_report.js /tmp/normalized-audit.json --markdown /tmp/report.md --output /tmp/ui-report.json
```

## References

Read [stack-notes.md](./references/stack-notes.md) for the orchestration contract and minimum final output.
