import { useEffect } from "react";
import { CLINIC, SITE_URL } from "@/config/site";
import { languageHref } from "@/utils/languagePath";
import { useLanguage } from "@/hooks/useLanguage";
import { buildDentistSchema } from "@/utils/structuredData";

const LD_ID = "ld-json-clinic";

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps <title>, meta tags and structured data in sync with the active language.
 * Renders nothing. (Static fallbacks for crawlers that skip JavaScript live in index.html.)
 */
export default function Seo() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = t.seo.title;
    const pageUrl = `${SITE_URL}${languageHref(lang)}`;
    setMeta("name", "description", t.seo.description);
    setMeta("property", "og:title", t.seo.title);
    setMeta("property", "og:description", t.seo.description);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
    if (SITE_URL) setCanonical(pageUrl);

    let script = document.getElementById(LD_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = LD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(
      buildDentistSchema({ clinic: CLINIC, siteUrl: SITE_URL, description: t.seo.description }),
    );
  }, [lang, t]);

  return null;
}
