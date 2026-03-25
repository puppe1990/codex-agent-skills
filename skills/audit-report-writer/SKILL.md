---
name: audit-report-writer
description: Write a technical or executive website audit report from a normalized module-based JSON. Use when the user wants a report similar to an internal audit dashboard export, with sectioned analysis, priorities, KPI framing, optional AI insight synthesis, and business-aware recommendations.
---

# Audit Report Writer

Use this skill after normalization. It turns canonical audit data into a readable report that looks like a serious technical assessment rather than a raw dump of scores.

## Modes

Support two modes:
- `technical`: fuller breakdown by module, risks, recommendations, KPI targets, and optional implementation notes.
- `executive`: shorter decision memo focused on impact, priority, risk, and next actions.

## Workflow

1. Confirm the input is normalized. If not, use `$audit-json-normalizer` first.
2. Read [report-blueprint.md](./references/report-blueprint.md).
3. Run `scripts/render_report.py` to draft the report.
4. Refine the output only where human judgment adds signal.
5. Keep claims tied to available data. If traffic, conversion, or revenue baselines are missing, avoid fabricating currency estimates.

## Writing Rules

- Open with the report title and the audited URL.
- Surface the weakest modules first.
- Keep recommendations tied to observed evidence from the payload.
- Convert scores into business language, but do not invent hidden measurements.
- When `include_cost_analysis` is requested without baseline business numbers, use effort and impact bands instead of revenue projections.
- Attach at least one success KPI to each recommended change.
- If the project has domain-specific operating rules, apply them only when the user explicitly provides them.

## Command

Technical report:

```bash
python3 /Users/matheuspuppe/.codex/skills/audit-report-writer/scripts/render_report.py /path/to/normalized.json --mode technical
```

Executive report with cost framing:

```bash
python3 /Users/matheuspuppe/.codex/skills/audit-report-writer/scripts/render_report.py /path/to/normalized.json --mode executive --include-cost-analysis
```

## References

Read [report-blueprint.md](./references/report-blueprint.md) for the required section order and tone.
