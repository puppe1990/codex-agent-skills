# Normalized Audit Schema

## Goal

Map a raw website audit JSON into one stable structure for downstream report generation.

## Canonical Shape

```json
{
  "schema_version": "1.0",
  "report_context": {
    "id": 8,
    "url": "https://www.example.com",
    "status": "completed",
    "created_at": "2026-03-25T02:31:15.227137+00:00",
    "completed_at": "2026-03-25T02:32:16.992302+00:00",
    "source_file": "/absolute/path/report.json"
  },
  "overall_score": 70,
  "module_order": ["seo", "performance", "accessibility", "security", "ux"],
  "modules": [
    {
      "key": "seo",
      "label": "SEO",
      "score": 93,
      "priority": "low",
      "status": "strong",
      "details": {},
      "recommendations": []
    }
  ],
  "top_priorities": [
    {
      "module": "security",
      "label": "Security",
      "score": 35,
      "priority": "critical",
      "reason": "Score 35 with missing security headers."
    }
  ],
  "ai_insights": {
    "provider": "Anthropic Claude",
    "model": "claude-haiku-4-5",
    "tokens_used": 5859,
    "has_analysis": true,
    "analysis_excerpt": "..."
  }
}
```

## Mapping Rules

- Use `results.<module>` first.
- If `results.<module>` is missing, search `detailed_results[]` by `module`.
- `report_context.source_file` must always be the input path.
- Preserve `details` and `recommendations` as-is when possible.
- `status` labels:
  - `critical` for score under 40
  - `needs_attention` for 40-69
  - `acceptable` for 70-84
  - `strong` for 85+

## Special Cases

- If `ai_insights.claude.analysis` exists, do not rewrite it in the normalized object. Store only provider metadata and a short excerpt.
- If the input has both `results` and `detailed_results`, do not duplicate content.
- If `score` is missing at the top level, compute `overall_score` as the rounded mean of available module scores.
