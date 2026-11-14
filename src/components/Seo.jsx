import { useEffect } from "react";
import PropTypes from "prop-types";
import { CLINIC, SITE_URL } from "@/config/site";
import { languageHref } from "@/utils/languagePath";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPageSchema } from "@/utils/structuredData";

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
export default function Seo({ pageId = "home" }) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (pageId === "notFound") {
      const missing = t.notFound.seo;
      document.title = missing.title;
      setMeta("name", "description", missing.description);
      setMeta("name", "robots", "noindex, follow");
      setMeta("property", "og:title", missing.title);
      setMeta("property", "og:description", missing.description);
      setMeta("property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.getElementById(LD_ID)?.remove();
      return;
    }

    setMeta("name", "robots", "index, follow");
    const page = pageId === "home" ? null : t.pages[pageId];
    const seo = page ? page.seo : t.seo;
    document.title = seo.title;
    const pagePath = languageHref(lang, pageId);
    const pageUrl = `${SITE_URL}${pagePath}`;
    setMeta("name", "description", seo.description);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
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
      buildPageSchema({
        clinic: CLINIC,
        siteUrl: SITE_URL,
        description: seo.description,
        pagePath,
        pageName: page?.title,
        homeName: t.clinicName,
        faqs: page?.faqs,
      }),
    );
  }, [lang, t, pageId]);

  return null;
}

Seo.propTypes = {
  pageId: PropTypes.string,
};
