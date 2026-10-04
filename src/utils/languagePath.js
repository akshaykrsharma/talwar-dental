/**
 * The Hindi page lives at /hi/ so Google can index it separately from English.
 * Any other path is the English page.
 * @param {string} pathname
 * @returns {"hi" | null}
 */
export function languageFromLocation(pathname) {
  const withoutFile = String(pathname || "/").replace(/\/index\.html$/, "");
  const path = withoutFile.length > 1 ? withoutFile.replace(/\/+$/, "") : withoutFile;
  if (path === "/hi" || path.endsWith("/hi")) return "hi";
  return null;
}

/** Crawlable URL for a language. Root-absolute so it works from / and from /hi/. */
export function languageHref(code) {
  return code === "hi" ? "/hi/" : "/";
}
