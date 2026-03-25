#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

function usage() {
  console.error("Usage: collect_audit.js <url> [--output /path/to/raw-report.json]");
  process.exit(1);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (!args.length) usage();
  const url = args[0];
  let output = null;
  for (let i = 1; i < args.length; i += 1) {
    if (args[i] === "--output") {
      output = args[i + 1];
      i += 1;
    }
  }
  return { url, output };
}

function runLighthouse(url, outputPath) {
  execFileSync(
    "npx",
    [
      "lighthouse",
      url,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox",
      "--output=json",
      `--output-path=${outputPath}`,
    ],
    { stdio: "inherit" }
  );
  return JSON.parse(fs.readFileSync(outputPath, "utf8"));
}

async function fetchText(url, method = "GET") {
  const response = await fetch(url, {
    method,
    redirect: "follow",
  });
  const text = method === "HEAD" ? "" : await response.text();
  return { response, text };
}

function countMatches(source, regex) {
  return (source.match(regex) || []).length;
}

function extractMatch(source, regex) {
  const match = source.match(regex);
  return match ? match[1].trim() : null;
}

function textFromHtml(fragment) {
  return fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function summarizeOg(html) {
  const og = {};
  for (const tag of ["og:url", "og:type", "og:title", "og:site_name", "og:description", "og:image"]) {
    const escaped = tag.replace(":", "\\:");
    const r1 = new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i");
    const r2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["']`, "i");
    const match = html.match(r1) || html.match(r2);
    if (match) og[tag] = match[1].trim();
  }
  return og;
}

function categoryScore(lh, id) {
  return Math.round(((lh.categories[id] && lh.categories[id].score) || 0) * 100);
}

function ratingFromScore(score) {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

function buildRecommendations(report, isLocal) {
  const seo = report.results.seo;
  if (!seo.details.has_canonical) seo.recommendations.push("Canonical ausente. Adicione canonical para consolidar sinais de indexação.");
  if ((seo.details.meta_description_length || 0) < 140) seo.recommendations.push("Meta description curta. Mire algo mais próximo de 150-160 caracteres.");
  if (seo.details.missing_essential_og.length) seo.recommendations.push(`Open Graph essencial ausente: ${seo.details.missing_essential_og.join(", ")}.`);
  if (seo.details.images_without_alt > 0) seo.recommendations.push(`Existem ${seo.details.images_without_alt} imagens sem alt.`);

  const performance = report.results.performance;
  const lcp = performance.details.core_web_vitals.lcp.value;
  if (lcp > 2.5) performance.recommendations.push(`LCP alto (${lcp}s). Otimize imagem hero, preload e recursos críticos.`);
  for (const opp of performance.details.top_opportunities.slice(0, 3)) {
    if (opp.savings_ms > 0) performance.recommendations.push(`${opp.title} (economia estimada: ${opp.savings_ms}ms)`);
  }

  const accessibility = report.results.accessibility;
  if (accessibility.details.landmarks.nav === 0) accessibility.recommendations.push("Tag <nav> não encontrada. Considere adicionar navegação principal.");
  if (accessibility.details.buttons_without_text > 0) accessibility.recommendations.push(`${accessibility.details.buttons_without_text} botões sem texto ou aria-label.`);
  if (accessibility.details.empty_links > 0) accessibility.recommendations.push(`${accessibility.details.empty_links} links sem texto. Adicione texto descritivo.`);
  if (!accessibility.details.has_skip_link) accessibility.recommendations.push("Link de 'pular para conteúdo' não encontrado.");

  const security = report.results.security;
  if (isLocal && !security.details.uses_https) {
    security.recommendations.push("Ambiente local está em HTTP. Em produção, validar HTTPS e HSTS no domínio final.");
  } else if (!security.details.uses_https) {
    security.recommendations.push("HTTPS não detectado. Forçar HTTPS deve ser prioridade.");
  }
  for (const header of security.details.missing_headers) {
    security.recommendations.push(`${header} não configurado.`);
  }

  const ux = report.results.ux;
  if (!ux.details.has_nav) ux.recommendations.push("Nenhuma navegação principal foi detectada. Adicione navegação clara.");
  if (!ux.details.has_footer) ux.recommendations.push("Tag <footer> não encontrada. Adicione rodapé com informações importantes.");
  if (ux.details.cta_count === 0) ux.recommendations.push("CTA principal não foi detectado pelo critério textual simples; revise a clareza do convite principal.");
  if ((ux.details.responsive_ratio || 0) < 0.6) ux.recommendations.push("Baixa proporção de imagens responsivas. Use srcset, sizes ou <picture>.");
}

async function main() {
  const { url, output } = parseArgs(process.argv);
  const parsedUrl = new URL(url);
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname);
  const tempLighthouse = path.join(os.tmpdir(), `website-audit-${Date.now()}.json`);

  const [lh, getResult, headResult] = await Promise.all([
    Promise.resolve().then(() => runLighthouse(url, tempLighthouse)),
    fetchText(url, "GET"),
    fetchText(url, "HEAD"),
  ]);

  const html = getResult.text;
  const headers = headResult.response.headers;

  const title = extractMatch(html, /<title[^>]*>([^<]+)<\/title>/i);
  const metaDescription =
    extractMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    extractMatch(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const canonical =
    extractMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    extractMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);

  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)]
    .map((m) => textFromHtml(m[1]))
    .filter(Boolean);
  const images = [...html.matchAll(/<img\b([^>]*)>/gi)].map((m) => m[1]);
  const imagesWithoutAlt = images.filter((attrs) => !/\balt\s*=/.test(attrs)).length;
  const responsiveImages = images.filter((attrs) => /\bsrcset\s*=/.test(attrs)).length;
  const hasNav = /<nav\b/i.test(html);
  const hasMain = /<main\b/i.test(html);
  const hasFooter = /<footer\b/i.test(html);
  const hasSearch = /type=["']search["']|role=["']search["']|aria-label=["'][^"']*search/i.test(html);
  const hasBreadcrumb = /breadcrumb/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const viewportContent =
    extractMatch(html, /<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i) || "";
  const navCount = countMatches(html, /<nav\b/gi);
  const formCount = countMatches(html, /<form\b/gi);
  const ctaCount = countMatches(html, /(fale conosco|solicitar demo|teste gratis|comece agora|agendar demo|get started|request demo)/gi);
  const contentText = textFromHtml(
    html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  );
  const contentDensity = Number(((contentText.length / Math.max(html.length, 1)) * 100).toFixed(2));
  const lang = extractMatch(html, /<html[^>]+lang=["']([^"']+)["']/i);
  const emptyLinks = [...html.matchAll(/<a\b[^>]*>(.*?)<\/a>/gis)].filter(
    (m) => textFromHtml(m[1]).length === 0
  ).length;
  const buttonsWithoutText = [...html.matchAll(/<button\b([^>]*)>(.*?)<\/button>/gis)].filter((m) => {
    const attrs = m[1] || "";
    const body = textFromHtml(m[2] || "");
    return !body && !/aria-label\s*=/.test(attrs);
  }).length;
  const inputsWithoutLabels = [...html.matchAll(/<input\b([^>]*)>/gi)].filter((m) => {
    const attrs = m[1] || "";
    return !/aria-label\s*=/.test(attrs) && !/type\s*=\s*["']hidden["']/.test(attrs);
  }).length;
  const inlineStyles = countMatches(html, /style\s*=/gi);
  const og = summarizeOg(html);
  const missingEssentialOg = ["og:title", "og:description", "og:image"].filter((key) => !og[key]);

  const performance = lh.categories.performance || { auditRefs: [] };
  const audits = lh.audits || {};
  const opportunities = (performance.auditRefs || [])
    .map((ref) => audits[ref.id])
    .filter((audit) => audit && typeof audit.numericValue === "number" && /opportunity|metric|informative/.test(audit.scoreDisplayMode || ""))
    .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
    .slice(0, 3)
    .map((audit) => ({
      title: audit.title,
      savings_ms: Math.round(audit.numericValue || 0),
      description: audit.description || "",
    }));

  const securityHeaders = [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "x-xss-protection",
    "content-security-policy",
    "referrer-policy",
    "permissions-policy",
  ];
  const presentHeaders = {};
  const missingHeaders = [];
  for (const header of securityHeaders) {
    const value = headers.get(header);
    const label = header
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("-")
      .replace("X-Xss-Protection", "X-XSS-Protection")
      .replace("Content-Security-Policy", "Content-Security-Policy")
      .replace("Strict-Transport-Security", "Strict-Transport-Security")
      .replace("Permissions-Policy", "Permissions-Policy");
    if (value) presentHeaders[label] = value;
    else missingHeaders.push(label);
  }

  const headerCoverage = Object.keys(presentHeaders).length / securityHeaders.length;
  let securityScore = Math.round(headerCoverage * 80 + (parsedUrl.protocol === "https:" ? 20 : 0));
  if (isLocal && parsedUrl.protocol !== "https:") securityScore = Math.min(securityScore, 85);

  const uxScore = [
    hasMain ? 15 : 0,
    hasNav ? 15 : 0,
    hasFooter ? 10 : 0,
    hasViewport ? 10 : 0,
    formCount > 0 ? 10 : 0,
    ctaCount > 0 ? 15 : 0,
    responsiveImages > 0 ? 15 : 0,
    hasBreadcrumb ? 5 : 0,
    hasSearch ? 5 : 0,
  ].reduce((sum, value) => sum + value, 0);

  const report = {
    id: Date.now(),
    url,
    score: Math.round(
      (categoryScore(lh, "seo") +
        categoryScore(lh, "performance") +
        categoryScore(lh, "accessibility") +
        securityScore +
        uxScore) /
        5
    ),
    status: "completed",
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    results: {
      seo: {
        score: categoryScore(lh, "seo"),
        details: {
          title,
          h1_tags: h1Matches,
          h1_count: h1Matches.length,
          h2_count: countMatches(html, /<h2\b/gi),
          h3_count: countMatches(html, /<h3\b/gi),
          robots_meta: extractMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i),
          title_length: title ? title.length : 0,
          total_images: images.length,
          canonical_url: canonical,
          has_canonical: Boolean(canonical),
          open_graph_tags: og,
          meta_description: metaDescription,
          open_graph_empty: Object.entries(og).filter(([, value]) => !value).map(([key]) => key),
          images_without_alt: imagesWithoutAlt,
          missing_essential_og: missingEssentialOg,
          meta_description_length: metaDescription ? metaDescription.length : 0,
        },
        recommendations: [],
      },
      performance: {
        score: categoryScore(lh, "performance"),
        details: {
          fcp: { unit: "seconds", value: Number((((audits["first-contentful-paint"] || {}).numericValue || 0) / 1000).toFixed(2)) },
          tbt: { unit: "ms", value: Math.round(((audits["total-blocking-time"] || {}).numericValue || 0)) },
          tti: { unit: "seconds", value: Number((((audits["interactive"] || {}).numericValue || 0) / 1000).toFixed(2)) },
          speed_index: { unit: "seconds", value: Number((((audits["speed-index"] || {}).numericValue || 0) / 1000).toFixed(2)) },
          core_web_vitals: {
            cls: {
              value: Number((((audits["cumulative-layout-shift"] || {}).numericValue || 0)).toFixed(3)),
              rating: ratingFromScore(Math.round((((audits["cumulative-layout-shift"] || {}).score || 0) * 100))),
            },
            lcp: {
              unit: "seconds",
              value: Number((((audits["largest-contentful-paint"] || {}).numericValue || 0) / 1000).toFixed(2)),
              rating: ratingFromScore(Math.round((((audits["largest-contentful-paint"] || {}).score || 0) * 100))),
            },
          },
          top_opportunities: opportunities,
        },
        recommendations: [],
      },
      accessibility: {
        score: categoryScore(lh, "accessibility"),
        details: {
          landmarks: {
            nav: navCount,
            main: hasMain ? 1 : 0,
            footer: hasFooter ? 1 : 0,
            header: countMatches(html, /<header\b/gi),
          },
          empty_links: emptyLinks,
          total_links: countMatches(html, /<a\b/gi),
          has_skip_link: /skip to content|pular para conteudo|pular para conteúdo/i.test(html),
          decorative_images: countMatches(html, /role=["']presentation["']|aria-hidden=["']true["']/gi),
          total_form_inputs: countMatches(html, /<input\b/gi),
          has_lang_attribute: Boolean(lang),
          images_missing_alt: imagesWithoutAlt,
          buttons_without_text: buttonsWithoutText,
          inputs_without_labels: inputsWithoutLabels,
          elements_with_inline_styles: inlineStyles,
        },
        recommendations: [],
      },
      security: {
        score: securityScore,
        details: {
          protocol: parsedUrl.protocol.replace(":", ""),
          uses_https: parsedUrl.protocol === "https:",
          server_header: headers.get("server") || "",
          missing_headers: missingHeaders,
          present_headers: presentHeaders,
          insecure_cookies: [],
          local_environment: isLocal,
        },
        recommendations: [],
      },
      ux: {
        score: uxScore,
        details: {
          has_main: hasMain,
          has_nav: hasNav,
          cta_count: ctaCount,
          nav_count: navCount,
          form_count: formCount,
          has_footer: hasFooter,
          has_search: hasSearch,
          has_viewport: hasViewport,
          total_images: images.length,
          has_breadcrumb: hasBreadcrumb,
          content_density: contentDensity,
          responsive_ratio: images.length ? Number((responsiveImages / images.length).toFixed(2)) : 0,
          viewport_content: viewportContent,
          responsive_images: responsiveImages,
          has_loading_indicators: /loading/i.test(html),
        },
        recommendations: [],
      },
    },
    detailed_results: [],
  };

  buildRecommendations(report, isLocal);

  const payload = JSON.stringify(report, null, 2);
  if (output) {
    fs.writeFileSync(output, payload);
  } else {
    process.stdout.write(payload + "\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
