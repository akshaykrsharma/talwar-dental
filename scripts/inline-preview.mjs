// Turns a normal Vite build (dist-single/) into ONE self-contained index.html:
// CSS and JS are inlined and every image/font file is embedded as a data URI.
// Handy for sharing a preview by email/WhatsApp. Not used for the real deployment (use `npm run build`).
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../dist-single/", import.meta.url));
const MIME = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const assetDir = join(dir, "assets");
const binaries = readdirSync(assetDir).filter((f) => MIME[extname(f)]);

const toDataUri = (file) =>
  `data:${MIME[extname(file)]};base64,${readFileSync(join(assetDir, file)).toString("base64")}`;

/**
 * Replaces references to built asset files with data URIs.
 * Handles the two forms Vite emits: new URL(`file`, import.meta.url).href (JS) and url(./file) (CSS).
 */
function embedAssets(text) {
  return text
    .replace(/new URL\(`([^`]+)`,\s*import\.meta\.url\)\.href/g, (match, file) =>
      binaries.includes(file) ? `\`${toDataUri(file)}\`` : match,
    )
    .replace(/url\((['"]?)\.?\/?([^)'"]+)\1\)/g, (match, _q, file) =>
      binaries.includes(file) ? `url(${toDataUri(file)})` : match,
    );
}

let html = readFileSync(join(dir, "index.html"), "utf8");

html = html.replace(
  /<link rel="stylesheet"[^>]*href="\.?\/?(assets\/[^"]+\.css)"[^>]*>/g,
  (_, file) => {
    return `<style>${embedAssets(readFileSync(join(dir, file), "utf8"))}</style>`;
  },
);

let moduleScript = "";
html = html.replace(
  /<script type="module"[^>]*src="\.?\/?(assets\/[^"]+\.js)"[^>]*><\/script>/g,
  (_, file) => {
    const js = embedAssets(readFileSync(join(dir, file), "utf8")).replace(
      /<\/script/gi,
      "<\\/script",
    );
    moduleScript = `<script type="module">${js}</script>`;
    return "";
  },
);
// The module must run after #root exists, so it goes at the end of <body>.
// (a replacer function, because bundled code contains `$` sequences that String.replace would interpret)
html = html.replace("</body>", () => `${moduleScript}\n</body>`);

// Public files referenced from <head> (icons, manifest) are not needed in a preview.
html = html.replace(/<link rel="(?:icon|apple-touch-icon|manifest)"[^>]*>\s*/g, "");

writeFileSync(join(dir, "index.html"), html);
for (const name of readdirSync(dir)) {
  if (name !== "index.html") rmSync(join(dir, name), { recursive: true, force: true });
}
if (!existsSync(join(dir, "index.html"))) throw new Error("preview build failed");
console.log(`dist-single/index.html  ${(html.length / 1024 / 1024).toFixed(2)} MB`);
