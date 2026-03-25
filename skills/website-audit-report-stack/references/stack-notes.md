# Stack Notes

## Trigger

Use this stack when the user asks for:
- a technical website audit report
- an executive website audit report
- a report derived from a raw JSON payload
- a report similar to an internal audit dashboard

## Contract Between Skills

- `website-audit-collector` receives a URL and emits raw audit JSON.
- `audit-json-normalizer` receives the raw payload and emits canonical JSON.
- `audit-report-writer` receives canonical JSON and emits markdown.
- `website-audit-ui-exporter` receives canonical JSON plus optional markdown and emits UI-ready JSON.

## Minimum Final Output

The final report should contain:
- audited URL
- overall score
- module score breakdown
- top priorities
- KPI-linked next steps

Optional additions:
- AI insight summary
- effort and impact framing
- cost-analysis bands
