import { PAGES } from "@/config/site";

/**
 * Strip index.html and a trailing slash so /hi, /hi/ and /hi/index.html match.
 * @param {string} pathname
 * @returns {string}
 */
function normalize(pathname) {
  const withoutFile = String(pathname || "/").replace(/\/index\.html$/, "");
  if (withoutFile.length > 1) return withoutFile.replace(/\/+$/, "");
  return withoutFile || "/";
}

/**
 * The Hindi site lives under /hi/, including treatment pages such as /hi/dr-anish-talwar/.
 * Any other path is English, regardless of a previously saved language choice.
 * @param {string} pathname
 * @returns {"hi" | "en"}
 */
export function languageFromLocation(pathname) {
  const path = normalize(pathname);
  if (path === "/hi" || path.startsWith("/hi/")) return "hi";
  return "en";
}

/**
 * Which page a URL is. Unknown paths are a not-found page.
 * @param {string} pathname
 * @returns {string}
 */
export function pageFromLocation(pathname) {
  let path = normalize(pathname);
  if (path === "/hi") path = "/";
  else if (path.startsWith("/hi/")) path = path.slice(3) || "/";
  if (path === "" || path === "/") return "home";
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return PAGES.find((page) => page.en === withSlash)?.id ?? "notFound";
}

/**
 * Crawlable URL for a language and page. Root-absolute so it works from any depth.
 * @param {string} code
 * @param {string} [pageId]
 */
export function languageHref(code, pageId = "home") {
  const page = PAGES.find((item) => item.id === pageId) ?? PAGES[0];
  return code === "hi" ? page.hi : page.en;
}

/**
 * Section links stay on the page when it has those sections, and point at the
 * homepage when it does not.
 * @param {string} pageId
 * @param {string} lang
 * @param {string} sectionId
 */
export function sectionHref(pageId, lang, sectionId) {
  if (pageId === "home") return `#${sectionId}`;
  return `${languageHref(lang, "home")}#${sectionId}`;
}
