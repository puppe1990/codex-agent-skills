#!/usr/bin/env python3
import argparse
import json
from pathlib import Path


MODULE_META = {
    "seo": "SEO",
    "performance": "Performance",
    "accessibility": "Accessibility",
    "security": "Security",
    "ux": "UX",
}


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def status_for_score(score: int) -> str:
    if score < 40:
        return "critical"
    if score < 70:
        return "needs_attention"
    if score < 85:
        return "acceptable"
    return "strong"


def priority_for_module(module_key: str, score: int, details: dict) -> str:
    missing_headers = details.get("missing_headers") or []
    if module_key == "security" and missing_headers:
        return "critical"
    if score < 40:
        return "critical"
    if score < 70:
        return "high"
    if score < 85:
        return "medium"
    return "low"


def merge_modules(data: dict) -> dict:
    merged = {}
    results = data.get("results") or {}
    for key, value in results.items():
        if isinstance(value, dict):
            merged[key] = value

    for item in data.get("detailed_results") or []:
        module_key = item.get("module")
        if not module_key:
            continue
        merged.setdefault(module_key, {})
        for field in ("score", "details", "recommendations"):
            if field not in merged[module_key] and field in item:
                merged[module_key][field] = item[field]

    return merged


def build_module_payload(module_key: str, module_data: dict) -> dict:
    score = int(round(module_data.get("score", 0)))
    details = module_data.get("details") or {}
    recommendations = module_data.get("recommendations") or []
    priority = priority_for_module(module_key, score, details)

    reason = f"Score {score} in {MODULE_META[module_key]}."
    if module_key == "security" and details.get("missing_headers"):
        reason = (
            f"Score {score} with missing security headers: "
            + ", ".join(details["missing_headers"][:4])
            + ("..." if len(details["missing_headers"]) > 4 else "")
        )

    return {
        "key": module_key,
        "label": MODULE_META[module_key],
        "score": score,
        "priority": priority,
        "status": status_for_score(score),
        "details": details,
        "recommendations": recommendations,
        "reason": reason,
    }


def build_ai_payload(data: dict) -> dict:
    claude = ((data.get("results") or {}).get("ai_insights") or {}).get("claude") or {}
    analysis = claude.get("analysis", "")
    excerpt = ""
    if analysis:
        for line in analysis.strip().splitlines():
            candidate = line.strip()
            if not candidate:
                continue
            if candidate.startswith("#") or candidate.startswith("```"):
                continue
            excerpt = candidate
            break
    return {
        "provider": claude.get("provider"),
        "model": claude.get("model"),
        "tokens_used": claude.get("tokens_used"),
        "has_analysis": bool(analysis),
        "analysis_excerpt": excerpt[:240],
    }


def normalize(data: dict, source_file: Path) -> dict:
    merged_modules = merge_modules(data)
    modules = []
    for module_key in MODULE_META:
        if module_key in merged_modules:
            modules.append(build_module_payload(module_key, merged_modules[module_key]))

    if "score" in data:
        overall_score = int(round(data["score"]))
    else:
        scores = [module["score"] for module in modules]
        overall_score = int(round(sum(scores) / len(scores))) if scores else 0

    top_priorities = sorted(
        (
            {
                "module": module["key"],
                "label": module["label"],
                "score": module["score"],
                "priority": module["priority"],
                "reason": module["reason"],
            }
            for module in modules
            if module["priority"] in {"critical", "high", "medium"}
        ),
        key=lambda item: (
            ["critical", "high", "medium", "low"].index(item["priority"]),
            item["score"],
        ),
    )[:5]

    return {
        "schema_version": "1.0",
        "report_context": {
            "id": data.get("id"),
            "url": data.get("url"),
            "status": data.get("status"),
            "created_at": data.get("created_at"),
            "completed_at": data.get("completed_at"),
            "source_file": str(source_file),
        },
        "overall_score": overall_score,
        "module_order": [module["key"] for module in modules],
        "modules": modules,
        "top_priorities": top_priorities,
        "ai_insights": build_ai_payload(data),
    }


def main():
    parser = argparse.ArgumentParser(description="Normalize raw website audit JSON.")
    parser.add_argument("input", help="Path to the raw report JSON file.")
    parser.add_argument("--output", help="Path to write normalized JSON.")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    normalized = normalize(load_json(input_path), input_path)
    payload = json.dumps(normalized, ensure_ascii=False, indent=2)

    if args.output:
        output_path = Path(args.output).expanduser().resolve()
        output_path.write_text(payload + "\n", encoding="utf-8")
    else:
        print(payload)


if __name__ == "__main__":
    main()
