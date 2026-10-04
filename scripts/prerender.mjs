// After `vite build`, write the rendered page into dist/index.html and dist/hi/index.html.
// Crawlers then see the headings, copy and clinic details without running JavaScript.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, loadEnv } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const env = loadEnv("production", root, "");
const siteUrl = (env.VITE_SITE_URL ?? "https://talwardentalcare.com").replace(/\/$/, "");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label}`);
  return html.replace(pattern, replacement);
}

function setMeta(html, attr, key, value) {
  const pattern = new RegExp(
    `(<meta\\b[^>]*\\b${attr}=["']${key}["'][^>]*\\bcontent=["'])[\\s\\S]*?(["'])`,
    "i",
  );
  return replaceTag(html, pattern, `$1${escapeHtml(value)}$2`, `${attr}=${key}`);
}

function setHref(html, rel, href) {
  const pattern = new RegExp(
    `(<link\\b[^>]*\\brel=["']${rel}["'][^>]*\\bhref=["'])[^"']*(["'])`,
    "i",
  );
  return replaceTag(html, pattern, `$1${href}$2`, `link rel=${rel}`);
}

function assetLookup(manifest) {
  return Object.entries(manifest)
    .filter(([, meta]) => meta && meta.file)
    .sort((a, b) => b[0].length - a[0].length);
}

function rewriteAssets(html, entries, prefix) {
  return html.replace(/(\s(?:src|href)=")([^"]+)(")/g, (full, before, url, after) => {
    if (/^(?:https?:|data:|tel:|mailto:|#)/.test(url)) return full;
    if (url === "/" || url === "/hi" || url === "/hi/" || url.startsWith("/#")) return full;
    const clean = url.split("?")[0];
    const match = entries.find(([key]) => clean.endsWith(key));
    if (!match) return full;
    return `${before}${prefix}${match[1].file}${after}`;
  });
}

function pageHtml({ template, body, lang, seo, schema, entries }) {
  const prefix = lang === "hi" ? "../" : "./";
  const pageUrl = lang === "hi" ? `${siteUrl}/hi/` : `${siteUrl}/`;
  let html = template;
  html = replaceTag(html, /<html lang="[^"]*">/, `<html lang="${lang === "hi" ? "hi" : "en"}">`, "html lang");
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`, "title");
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:url", pageUrl);
  html = setMeta(html, "property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
  html = setHref(html, "canonical", pageUrl);
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json" id="ld-json-clinic">${json}</script>\n  </head>`,
  );
  const rendered = rewriteAssets(body, entries, prefix);
  html = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  if (lang === "hi") {
    html = html.replace(/(\s(?:src|href)=")\.\//g, "$1../");
  }
  return html;
}

const vite = await createServer({
  root,
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const { buildDentistSchema } = await vite.ssrLoadModule("/src/utils/structuredData.js");
  const { CLINIC } = await vite.ssrLoadModule("/src/config/site.js");
  const { content } = await vite.ssrLoadModule("/src/content/index.js");
  const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
  const entries = assetLookup(manifest);
  const template = readFileSync(join(dist, "index.html"), "utf8");

  for (const lang of ["en", "hi"]) {
    const schema = buildDentistSchema({
      clinic: CLINIC,
      siteUrl,
      description: content[lang].seo.description,
    });
    const html = pageHtml({
      template,
      body: render(lang),
      lang,
      seo: content[lang].seo,
      schema,
      entries,
    });
    if (!html.includes("<h1>") || !html.includes("ld-json-clinic")) {
      throw new Error(`prerender: ${lang} page is missing the heading or structured data`);
    }
    const file = lang === "hi" ? join(dist, "hi/index.html") : join(dist, "index.html");
    if (lang === "hi") mkdirSync(join(dist, "hi"), { recursive: true });
    writeFileSync(file, html);
  }
} finally {
  await vite.close();
}
