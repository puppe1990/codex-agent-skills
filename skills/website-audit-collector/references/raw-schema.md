# Raw Audit Schema

## Goal

Emit a raw report JSON that mirrors the shape expected by `audit-json-normalizer`.

## Required Shape

```json
{
  "id": 1,
  "url": "https://example.com",
  "score": 82,
  "status": "completed",
  "created_at": "2026-03-25T00:00:00.000Z",
  "completed_at": "2026-03-25T00:00:30.000Z",
  "results": {
    "seo": { "score": 90, "details": {}, "recommendations": [] },
    "performance": { "score": 70, "details": {}, "recommendations": [] },
    "accessibility": { "score": 88, "details": {}, "recommendations": [] },
    "security": { "score": 80, "details": {}, "recommendations": [] },
    "ux": { "score": 65, "details": {}, "recommendations": [] }
  },
  "detailed_results": []
}
```

## Heuristic Notes

- `security.score` should not be perfect for local HTTP URLs even if security headers are present.
- `ux.score` is heuristic and should be based on structure, not subjective design taste.
- `recommendations` should be brief, evidence-backed, and generated only from observed signals.

## Local Environment Rule

For `localhost`, `127.0.0.1`, and similar local URLs:
- set `uses_https` based on the actual scheme
- mention when HTTPS findings are limited by local environment
- do not treat missing public TLS as equivalent to a production defect unless the user asked for production-readiness assessment
