---
name: website-audit-collector
description: Collect a raw website audit JSON from a URL using Lighthouse, HTTP headers, and HTML heuristics. Use when the user gives a URL instead of a prebuilt report and you need a raw audit payload with SEO, performance, accessibility, security, and UX modules that can be passed to a normalizer or report writer.
---

# Website Audit Collector

Use this skill to turn a live URL into a raw audit payload. It is the collection layer for the reporting stack.

## When To Use

Use this skill when the input is:
- a local URL such as `http://localhost:3001`
- a staging or production URL
- a request to audit a website without an existing JSON report

Do not use this skill if the user already provided a report JSON that contains module scores and recommendations.

## What It Produces

The script emits a raw JSON file with:
- `id`
- `url`
- `score`
- `status`
- `created_at`
- `completed_at`
- `results.seo`
- `results.performance`
- `results.accessibility`
- `results.security`
- `results.ux`
- `detailed_results`

This format is intentionally compatible with `$audit-json-normalizer`.

## Workflow

1. Audit the target URL with Lighthouse.
2. Fetch the page HTML and response headers.
3. Compute heuristic SEO, security, and UX details from the HTML and headers.
4. Merge everything into the raw report schema.
5. Save the raw JSON to disk and pass it to `$audit-json-normalizer`.

## Collection Rules

- Use Lighthouse category scores for `seo`, `performance`, and `accessibility`.
- Use header and protocol analysis for `security`.
- Use HTML structure heuristics for `ux`.
- If the target is a local HTTP URL such as `localhost`, explicitly note that HTTPS findings are environment-limited.
- Prefer conservative recommendations. Do not invent business KPIs or AI analysis during collection.

## Command

Basic use:

```bash
node /Users/matheuspuppe/.codex/skills/website-audit-collector/scripts/collect_audit.js http://localhost:3001 --output /tmp/raw-audit.json
```

Then continue the stack:

```bash
python3 /Users/matheuspuppe/.codex/skills/audit-json-normalizer/scripts/normalize_report.py /tmp/raw-audit.json --output /tmp/normalized-audit.json
python3 /Users/matheuspuppe/.codex/skills/audit-report-writer/scripts/render_report.py /tmp/normalized-audit.json --mode technical
```

## References

Read [raw-schema.md](./references/raw-schema.md) for the emitted raw structure and heuristic rules.
