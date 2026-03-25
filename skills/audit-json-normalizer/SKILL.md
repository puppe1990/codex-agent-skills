---
name: audit-json-normalizer
description: Normalize raw website audit JSON into a stable module-based schema before reporting. Use when the input is a JSON file like Lighthouse-style audit exports, internal audit API payloads, or files similar to relatorio-8.json and you need consistent fields for SEO, performance, accessibility, security, UX, and AI insights.
---

# Audit JSON Normalizer

Use this skill to turn heterogeneous audit payloads into one canonical object that is easy to inspect, compare, and pass into a reporting skill.

## When To Use

Use this skill when the user provides:
- A raw audit JSON file.
- A copied JSON payload from an internal website analysis tool.
- A result object that has `results`, `detailed_results`, `score`, `url`, and optional `ai_insights`.

Do not use this skill for writing the final narrative report. Its job is to standardize the payload first.

## Output Contract

Produce a normalized JSON object with:
- `schema_version`
- `report_context`
- `overall_score`
- `module_order`
- `modules`
- `top_priorities`
- `ai_insights`

Keep module keys stable:
- `seo`
- `performance`
- `accessibility`
- `security`
- `ux`

## Workflow

1. Inspect the source JSON and confirm the source path.
2. Prefer `results` as the primary source for module data.
3. Use `detailed_results` as fallback when a module is missing or incomplete.
4. Run `scripts/normalize_report.py` to build the canonical output.
5. Verify that scores, recommendations, and key details survived the normalization.
6. If a required module is absent, keep it out of `modules` and note the omission explicitly instead of inventing data.

## Priority Rules

Assign priority from score and risk:
- `critical` for score under `40`, or obvious security gaps like missing HSTS/CSP.
- `high` for score `40-69`.
- `medium` for score `70-84`.
- `low` for score `85+`.

Keep the generated priorities deterministic. Do not overrule the script unless the payload contains stronger evidence.

## Command

Use:

```bash
python3 /Users/matheuspuppe/.codex/skills/audit-json-normalizer/scripts/normalize_report.py /path/to/report.json
```

Optional output path:

```bash
python3 /Users/matheuspuppe/.codex/skills/audit-json-normalizer/scripts/normalize_report.py /path/to/report.json --output /path/to/normalized.json
```

## References

Read [schema.md](./references/schema.md) when you need the exact normalized shape or field mapping rules.
