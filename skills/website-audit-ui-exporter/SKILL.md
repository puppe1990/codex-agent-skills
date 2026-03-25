---
name: website-audit-ui-exporter
description: Export normalized website audit data into a UI-ready JSON contract for dashboards, detail pages, and report viewers. Use when the interface needs structured cards, module summaries, priority blocks, analysis settings, and optional markdown in a single payload instead of raw normalized data.
---

# Website Audit UI Exporter

Use this skill after normalization, and optionally after report writing, to produce one JSON payload that a UI can render directly.

## When To Use

Use this skill when:
- the frontend needs a single report object ready to display
- you want cards, badges, priorities, and metadata without doing UI-side transformation
- you want to bundle normalized module data with generated markdown

Do not use this skill to collect or normalize audit data. It is the final presentation export layer.

## What It Produces

The exporter emits a JSON payload with:
- `report`
- `analysis_config`
- `summary_cards`
- `module_cards`
- `priority_board`
- `report_sections`
- `raw`

If markdown is supplied, it also includes:
- `report.markdown`
- `report_sections.ai_summary` when available

## Export Rules

- Preserve the normalized audit as the source of truth under `raw.normalized`.
- Convert score ranges into UI variants such as `success`, `warning`, and `danger`.
- Keep module order stable.
- If the source URL is local, expose that fact in `analysis_config.environment`.
- If a markdown report is provided, store it without reformatting.

## Command

Without markdown:

```bash
node /Users/matheuspuppe/.codex/skills/website-audit-ui-exporter/scripts/export_ui_report.js /tmp/normalized-audit.json --output /tmp/ui-report.json
```

With markdown:

```bash
node /Users/matheuspuppe/.codex/skills/website-audit-ui-exporter/scripts/export_ui_report.js /tmp/normalized-audit.json --markdown /tmp/report.md --output /tmp/ui-report.json
```

## References

Read [ui-contract.md](./references/ui-contract.md) for the exported shape and display mapping rules.
