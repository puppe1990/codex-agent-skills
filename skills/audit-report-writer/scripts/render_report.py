#!/usr/bin/env python3
import argparse
import json
from pathlib import Path


PRIORITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def effort_impact(module_key: str, priority: str):
    if module_key == "security" and priority == "critical":
        return ("baixo a médio", "alto", "imediata")
    if module_key == "performance":
        return ("médio", "alto", "alta")
    if module_key == "seo":
        return ("baixo", "médio", "média")
    if module_key == "accessibility":
        return ("baixo", "médio", "média")
    if module_key == "ux":
        return ("médio", "médio a alto", "alta")
    return ("médio", "médio", "média")


def module_kpi(module_key: str) -> str:
    mapping = {
        "seo": "CTR orgânico, impressões e posição média das URLs priorizadas.",
        "performance": "LCP abaixo de 2.5s e redução de JavaScript não utilizado.",
        "accessibility": "Zero links vazios, zero botões sem rótulo e presença de skip link.",
        "security": "Cabeçalhos críticos configurados e cobertura total de HTTPS/HSTS.",
        "ux": "Maior cobertura de navegação, footer e imagens responsivas.",
    }
    return mapping.get(module_key, "Definir KPI específico para o módulo.")


def top_modules(data: dict):
    modules = data.get("modules") or []
    return sorted(modules, key=lambda item: (PRIORITY_ORDER[item["priority"]], item["score"]))


def summarize_value(value):
    if isinstance(value, dict):
        keys = list(value.keys())[:3]
        return "{%s}" % ", ".join(keys)
    if isinstance(value, list):
        preview = ", ".join(str(item) for item in value[:3])
        suffix = "..." if len(value) > 3 else ""
        return f"[{preview}{suffix}]"
    return str(value)


def render_module_table(modules):
    lines = [
        "| Módulo | Score | Prioridade | Status |",
        "|---|---:|---|---|",
    ]
    for module in modules:
        lines.append(
            f"| {module['label']} | {module['score']} | {module['priority']} | {module['status']} |"
        )
    return "\n".join(lines)


def render_priorities(modules):
    lines = []
    for module in modules[:3]:
        effort, impact, urgency = effort_impact(module["key"], module["priority"])
        lines.append(
            f"- **{module['label']} ({module['score']})**: {module['reason']} "
            f"Esforço {effort}, impacto {impacto_text(impact)}, urgência {urgency}."
        )
    return "\n".join(lines)


def impacto_text(value: str) -> str:
    return value


def render_module_sections(modules):
    sections = []
    for module in modules:
        recs = module.get("recommendations") or []
        top_recs = recs[:3]
        details = module.get("details") or {}
        evidence = (
            ", ".join(f"{key}={summarize_value(value)}" for key, value in list(details.items())[:4])
            or "sem detalhes adicionais"
        )
        section = [
            f"### {module['label']} ({module['score']})",
            f"Status: `{module['status']}`. Prioridade: `{module['priority']}`.",
            f"Evidências principais: {evidence}.",
        ]
        if top_recs:
            section.append("Recomendações:")
            for rec in top_recs:
                section.append(f"- {rec}")
        section.append(f"KPI sugerido: {module_kpi(module['key'])}")
        sections.append("\n".join(section))
    return "\n\n".join(sections)


def render_technical(data: dict, include_cost_analysis: bool, include_ai: bool) -> str:
    context = data["report_context"]
    modules = top_modules(data)
    weakest = ", ".join(f"{module['label']} ({module['score']})" for module in modules[:3])
    lines = [
        f"# Análise Técnica Completa - {context['url']}",
        "",
        "## Resumo Executivo",
        f"Score geral: **{data['overall_score']}**. Os módulos que mais exigem atenção neste ciclo são {weakest}.",
        "A recomendação é tratar primeiro riscos estruturais e métricas que bloqueiam confiança, rastreabilidade ou conversão.",
        "",
        "## Score por Módulo",
        render_module_table(modules),
        "",
        "## Prioridades Imediatas",
        render_priorities(modules),
        "",
        "## Análise por Módulo",
        render_module_sections(modules),
        "",
        "## Impacto e KPI",
    ]

    for module in modules[:5]:
        effort, impact, urgency = effort_impact(module["key"], module["priority"])
        lines.append(
            f"- {module['label']}: esforço {effort}, impacto {impact}, urgência {urgency}. KPI: {module_kpi(module['key'])}"
        )

    if include_cost_analysis:
        lines.extend(
            [
                "",
                "## Leitura de Esforço e Retorno",
                "Sem baseline de tráfego ou receita, a análise de custo deve ficar em bandas de esforço e impacto.",
            ]
        )
        for module in modules[:3]:
            effort, impact, urgency = effort_impact(module["key"], module["priority"])
            lines.append(
                f"- {module['label']}: esforço {effort}, impacto {impact}, janela recomendada {urgency}."
            )

    if include_ai and data.get("ai_insights", {}).get("has_analysis"):
        ai = data["ai_insights"]
        lines.extend(
            [
                "",
                "## Insights de IA",
                f"Fonte detectada: {ai.get('provider') or 'não informada'} / {ai.get('model') or 'modelo não informado'}.",
                f"Resumo do insight original: {ai.get('analysis_excerpt') or 'sem resumo disponível'}.",
            ]
        )

    lines.extend(
        [
            "",
            "## Próximos Passos",
            "- Corrigir primeiro o que reduz confiança, cobertura ou conversão.",
            "- Amarrar cada ajuste a um KPI observável antes do deploy.",
            "- Revisar semanalmente para decidir entre continuar, ajustar ou encerrar o experimento.",
        ]
    )
    return "\n".join(lines)


def render_executive(data: dict, include_cost_analysis: bool, include_ai: bool) -> str:
    context = data["report_context"]
    modules = top_modules(data)
    lines = [
        f"# Resumo Executivo - {context['url']}",
        "",
        "## Onde está o risco",
    ]
    for module in modules[:2]:
        lines.append(f"- {module['label']} ({module['score']}): {module['reason']}")

    lines.extend(["", "## Onde está o ganho rápido"])
    quick_wins = [module for module in modules if module["priority"] in {"medium", "low"}][:2]
    if not quick_wins:
        quick_wins = modules[2:4]
    for module in quick_wins:
        effort, impact, _ = effort_impact(module["key"], module["priority"])
        lines.append(f"- {module['label']}: esforço {effort}, impacto {impact}.")

    lines.extend(["", "## Plano de 2 a 4 semanas"])
    for module in modules[:3]:
        effort, impact, urgency = effort_impact(module["key"], module["priority"])
        lines.append(
            f"- Priorizar {module['label']} com esforço {effort}, impacto {impact} e urgência {urgency}. KPI: {module_kpi(module['key'])}"
        )

    if include_cost_analysis:
        lines.extend(["", "## Leitura de Esforço"])
        for module in modules[:3]:
            effort, impact, _ = effort_impact(module["key"], module["priority"])
            lines.append(f"- {module['label']}: esforço {effort}, impacto esperado {impact}.")

    if include_ai and data.get("ai_insights", {}).get("has_analysis"):
        ai = data["ai_insights"]
        lines.extend(["", "## Sinal de IA", f"- {ai.get('analysis_excerpt') or 'Sem resumo do insight.'}"])

    lines.extend(
        [
            "",
            "## Decisão recomendada",
            "Atacar primeiro o menor score com maior risco estrutural, capturar quick wins de SEO/CTR em seguida e revisar o impacto em um ciclo semanal.",
        ]
    )
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Render a website audit report from normalized JSON.")
    parser.add_argument("input", help="Path to normalized JSON.")
    parser.add_argument("--mode", choices=["technical", "executive"], default="technical")
    parser.add_argument("--include-cost-analysis", action="store_true")
    parser.add_argument("--exclude-ai", action="store_true")
    args = parser.parse_args()

    data = load_json(Path(args.input).expanduser().resolve())
    include_ai = not args.exclude_ai

    if args.mode == "technical":
        print(render_technical(data, args.include_cost_analysis, include_ai))
    else:
        print(render_executive(data, args.include_cost_analysis, include_ai))


if __name__ == "__main__":
    main()
