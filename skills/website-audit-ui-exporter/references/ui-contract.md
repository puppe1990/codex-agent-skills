# UI Contract

## Goal

Provide a single JSON payload that a frontend can render with minimal transformation.

## Shape

```json
{
  "report": {
    "id": 1,
    "url": "https://example.com",
    "status": "completed",
    "overall_score": 78,
    "overall_variant": "warning",
    "created_at": "...",
    "completed_at": "...",
    "markdown": "# optional"
  },
  "analysis_config": {
    "analysis_type": "technical",
    "modules": ["seo", "performance", "accessibility", "security", "ux"],
    "include_ai_insights": true,
    "include_cost_analysis": true,
    "environment": "local"
  },
  "summary_cards": [],
  "module_cards": [],
  "priority_board": [],
  "report_sections": {},
  "raw": {
    "normalized": {}
  }
}
```

## Variant Mapping

- `success` for score `85+`
- `warning` for score `60-84`
- `danger` for score `<60`

## Summary Cards

Required cards:
- overall score
- top risk
- top quick win
- modules covered

## Module Cards

Each module card should include:
- `key`
- `label`
- `score`
- `variant`
- `priority`
- `status`
- `headline`
- `recommendations`
- `kpi`

## Priority Board

Each priority entry should include:
- `module`
- `label`
- `priority`
- `score`
- `reason`
- `effort`
- `impact`

## Report Sections

Suggested keys:
- `executive_summary`
- `top_priorities`
- `ai_summary`
- `markdown`
