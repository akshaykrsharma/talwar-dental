// After `vite build`, write each language and page into dist, plus the sitemap.
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
    .replace(/"/g, "&quot;")
    // React escapes apostrophes too; match it so heading checks line up.
    .replace(/'/g, "&#x27;");

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

function setHreflang(html, lang, href) {
  const pattern = new RegExp(
    `(<link\\b[^>]*\\brel=["']alternate["'][^>]*\\bhreflang=["']${lang}["'][^>]*\\bhref=["'])[^"']*(["'])`,
    "i",
  );
  return replaceTag(html, pattern, `$1${href}$2`, `hreflang=${lang}`);
}

/** ./ from the site root becomes ../ or ../../ from a nested page. */
function assetPrefix(pagePath) {
  const depth = pagePath.split("/").filter(Boolean).length;
  return depth === 0 ? "./" : "../".repeat(depth);
}

function assetLookup(manifest) {
  return Object.entries(manifest)
    .filter(([, meta]) => meta && meta.file)
    .sort((a, b) => b[0].length - a[0].length);
}

function rewriteAssets(html, entries, prefix) {
  return html.replace(/(\s(?:src|href)=")([^"]+)(")/g, (full, before, url, after) => {
    if (/^(?:https?:|data:|tel:|mailto:|#)/.test(url)) return full;
    if (url.startsWith("/") && !url.startsWith("/assets/")) return full;
    const clean = url.split("?")[0];
    const match = entries.find(([key]) => clean.endsWith(key));
    if (!match) return full;
    return `${before}${prefix}${match[1].file}${after}`;
  });
}

function pageHtml({ template, body, lang, path, alternate, seo, schema, entries }) {
  const prefix = assetPrefix(path);
  const pageUrl = `${siteUrl}${path}`;
  let html = template;
  html = replaceTag(
    html,
    /<html lang="[^"]*">/,
    `<html lang="${lang === "hi" ? "hi" : "en"}">`,
    "html lang",
  );
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`,
    "title",
  );
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:url", pageUrl);
  html = setMeta(html, "property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
  html = setHref(html, "canonical", pageUrl);
  html = setHreflang(html, "en", `${siteUrl}${alternate.en}`);
  html = setHreflang(html, "hi", `${siteUrl}${alternate.hi}`);
  html = setHreflang(html, "x-default", `${siteUrl}${alternate.en}`);
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json" id="ld-json-clinic">${json}</script>\n  </head>`,
  );
  const rendered = rewriteAssets(body, entries, prefix);
  html = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  if (prefix !== "./") html = html.replace(/(\s(?:src|href)=")\.\//g, `$1${prefix}`);
  return html;
}

function sitemapXml(pages) {
  const urls = pages
    .flatMap((page) => [page.en, page.hi])
    .map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
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
  const { buildPageSchema } = await vite.ssrLoadModule("/src/utils/structuredData.js");
  const { CLINIC, PAGES } = await vite.ssrLoadModule("/src/config/site.js");
  const { content } = await vite.ssrLoadModule("/src/content/index.js");
  const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
  const entries = assetLookup(manifest);
  const template = readFileSync(join(dist, "index.html"), "utf8");

  for (const page of PAGES) {
    for (const lang of ["en", "hi"]) {
      const path = page[lang];
      const pageContent = page.id === "home" ? null : content[lang].pages[page.id];
      const seo = pageContent ? pageContent.seo : content[lang].seo;
      const schema = buildPageSchema({
        clinic: CLINIC,
        siteUrl,
        description: seo.description,
        pagePath: path,
        pageName: pageContent?.title,
        homeName: content[lang].clinicName,
        faqs: pageContent?.faqs,
      });
      const html = pageHtml({
        template,
        body: render(lang, page.id),
        lang,
        path,
        alternate: page,
        seo,
        schema,
        entries,
      });
      const heading =
        page.id === "home" ? content[lang].hero.title : content[lang].pages[page.id].title;
      if (!html.includes(escapeHtml(heading)) || !html.includes("ld-json-clinic")) {
        throw new Error(`prerender: ${lang} ${path} is missing the heading or structured data`);
      }
      if (!html.includes(`<link rel="canonical" href="${siteUrl}${path}"`)) {
        throw new Error(`prerender: ${lang} ${path} canonical is wrong`);
      }
      const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
      mkdirSync(join(file, ".."), { recursive: true });
      writeFileSync(file, html);
    }
  }

  const missing = content.en.notFound;
  let notFoundHtml = pageHtml({
    template,
    body: render("en", "notFound"),
    lang: "en",
    path: "/404.html",
    alternate: { en: "/", hi: "/hi/" },
    seo: missing.seo,
    schema: buildPageSchema({
      clinic: CLINIC,
      siteUrl,
      description: missing.seo.description,
      pagePath: "/",
    }),
    entries,
  });
  notFoundHtml = setMeta(notFoundHtml, "name", "robots", "noindex, follow");
  notFoundHtml = notFoundHtml.replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, "");
  if (
    !notFoundHtml.includes(escapeHtml(missing.title)) ||
    notFoundHtml.includes('rel="canonical"')
  ) {
    throw new Error("prerender: 404.html is missing its heading or still has a canonical link");
  }
  writeFileSync(join(dist, "404.html"), notFoundHtml);

  const sitemap = sitemapXml(PAGES);
  writeFileSync(join(dist, "sitemap.xml"), sitemap);
  writeFileSync(join(root, "public/sitemap.xml"), sitemap);
} finally {
  await vite.close();
}
