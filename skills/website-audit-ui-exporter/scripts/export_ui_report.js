#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function usage() {
  console.error("Usage: export_ui_report.js <normalized.json> [--markdown /path/report.md] [--mode technical|executive] [--output /path/ui-report.json]");
  process.exit(1);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (!args.length) usage();
  const input = args[0];
  let output = null;
  let markdown = null;
  let mode = "technical";
  for (let i = 1; i < args.length; i += 1) {
    if (args[i] === "--output") {
      output = args[i + 1];
      i += 1;
    } else if (args[i] === "--markdown") {
      markdown = args[i + 1];
      i += 1;
    } else if (args[i] === "--mode") {
      mode = args[i + 1];
      i += 1;
    }
  }
  return { input, output, markdown, mode };
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function variantForScore(score) {
  if (score >= 85) return "success";
  if (score >= 60) return "warning";
  return "danger";
}

function effortImpact(moduleKey, priority) {
  if (moduleKey === "security" && priority === "critical") return { effort: "baixo a médio", impact: "alto" };
  if (moduleKey === "performance") return { effort: "médio", impact: "alto" };
  if (moduleKey === "seo") return { effort: "baixo", impact: "médio" };
  if (moduleKey === "accessibility") return { effort: "baixo", impact: "médio" };
  if (moduleKey === "ux") return { effort: "médio", impact: "médio a alto" };
  return { effort: "médio", impact: "médio" };
}

function moduleKpi(moduleKey) {
  const map = {
    seo: "CTR orgânico, impressões e posição média.",
    performance: "LCP abaixo de 2.5s e menor carga JS.",
    accessibility: "Zero links vazios, rótulos válidos e skip link presente.",
    security: "HTTPS/HSTS válidos e cabeçalhos críticos ativos.",
    ux: "Mais cobertura de navegação, footer e imagens responsivas.",
  };
  return map[moduleKey] || "Definir KPI específico para o módulo.";
}

function firstRecommendation(module) {
  return (module.recommendations && module.recommendations[0]) || module.reason || "Sem recomendação prioritária.";
}

function extractExecutiveSummary(markdown) {
  if (!markdown) return null;
  const match = markdown.match(/## Resumo Executivo\s+([\s\S]*?)(\n## |\s*$)/i) || markdown.match(/## Onde está o risco\s+([\s\S]*?)(\n## |\s*$)/i);
  return match ? match[1].trim() : null;
}

function extractAiSummary(normalized, markdown) {
  if (normalized.ai_insights && normalized.ai_insights.analysis_excerpt) return normalized.ai_insights.analysis_excerpt;
  if (!markdown) return null;
  const match = markdown.match(/## (Insights de IA|Sinal de IA)\s+([\s\S]*?)(\n## |\s*$)/i);
  return match ? match[2].trim() : null;
}

function buildUiPayload(normalized, markdown, mode) {
  const modules = normalized.modules || [];
  const priorities = normalized.top_priorities || [];
  const sortedByWeakest = [...modules].sort((a, b) => a.score - b.score);
  const topRisk = sortedByWeakest[0] || null;
  const quickWin = [...modules]
    .filter((module) => module.priority === "medium" || module.priority === "low")
    .sort((a, b) => a.score - b.score)[0] || sortedByWeakest[1] || topRisk;

  const sourceUrl = ((normalized.report_context || {}).url) || "";
  const hostname = sourceUrl ? new URL(sourceUrl).hostname : "";
  const environment = ["localhost", "127.0.0.1", "::1"].includes(hostname) ? "local" : "remote";

  return {
    report: {
      id: normalized.report_context && normalized.report_context.id,
      url: sourceUrl,
      status: normalized.report_context && normalized.report_context.status,
      overall_score: normalized.overall_score,
      overall_variant: variantForScore(normalized.overall_score || 0),
      created_at: normalized.report_context && normalized.report_context.created_at,
      completed_at: normalized.report_context && normalized.report_context.completed_at,
      markdown: markdown || null,
    },
    analysis_config: {
      analysis_type: mode,
      modules: normalized.module_order || modules.map((module) => module.key),
      include_ai_insights: Boolean(normalized.ai_insights && normalized.ai_insights.has_analysis),
      include_cost_analysis: Boolean(markdown && /Leitura de Esforço e Retorno|Leitura de Esforço/i.test(markdown)),
      environment,
    },
    summary_cards: [
      {
        key: "overall_score",
        label: "Score Geral",
        value: normalized.overall_score,
        variant: variantForScore(normalized.overall_score || 0),
      },
      {
        key: "top_risk",
        label: "Maior Risco",
        value: topRisk ? `${topRisk.label} (${topRisk.score})` : "N/A",
        variant: topRisk ? variantForScore(topRisk.score) : "warning",
      },
      {
        key: "quick_win",
        label: "Quick Win",
        value: quickWin ? `${quickWin.label} (${quickWin.score})` : "N/A",
        variant: quickWin ? variantForScore(quickWin.score) : "warning",
      },
      {
        key: "module_count",
        label: "Módulos",
        value: modules.length,
        variant: "info",
      },
    ],
    module_cards: modules.map((module) => ({
      key: module.key,
      label: module.label,
      score: module.score,
      variant: variantForScore(module.score),
      priority: module.priority,
      status: module.status,
      headline: firstRecommendation(module),
      recommendations: module.recommendations || [],
      kpi: moduleKpi(module.key),
      details: module.details || {},
    })),
    priority_board: priorities.map((item) => ({
      module: item.module,
      label: item.label,
      priority: item.priority,
      score: item.score,
      reason: item.reason,
      ...effortImpact(item.module, item.priority),
    })),
    report_sections: {
      executive_summary: extractExecutiveSummary(markdown),
      top_priorities: priorities,
      ai_summary: extractAiSummary(normalized, markdown),
      markdown: markdown || null,
    },
    raw: {
      normalized,
    },
  };
}

function main() {
  const { input, output, markdown, mode } = parseArgs(process.argv);
  const normalizedPath = path.resolve(input);
  const normalized = loadJson(normalizedPath);
  const markdownText = markdown ? fs.readFileSync(path.resolve(markdown), "utf8") : null;
  const payload = buildUiPayload(normalized, markdownText, mode);
  const serialized = JSON.stringify(payload, null, 2);
  if (output) {
    fs.writeFileSync(path.resolve(output), serialized + "\n");
  } else {
    process.stdout.write(serialized + "\n");
  }
}

main();
