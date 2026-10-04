import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, LANGUAGES } from "@/config/site";
import { getContent } from "@/content";
import { languageFromLocation } from "@/utils/languagePath";
import { readStorage, writeStorage } from "@/utils/storage";
import { LanguageContext } from "./languageContextValue";

const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

function getInitialLanguage() {
  if (typeof window !== "undefined") {
    const fromPath = languageFromLocation(window.location.pathname);
    if (fromPath) return fromPath;
  }
  const saved = readStorage(LANGUAGE_STORAGE_KEY);
  return isSupported(saved) ? saved : DEFAULT_LANGUAGE;
}

/** Holds the active language, remembers it between visits and keeps <html lang> in sync. */
export function LanguageProvider({ children, initialLang }) {
  const [lang, setLangState] = useState(() =>
    initialLang && isSupported(initialLang) ? initialLang : getInitialLanguage(),
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    writeStorage(LANGUAGE_STORAGE_KEY, lang);
  }, [lang]);

  useEffect(() => {
    const onPop = () => {
      const fromPath = languageFromLocation(window.location.pathname);
      setLangState(fromPath ?? DEFAULT_LANGUAGE);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setLang = useCallback((code) => {
    if (isSupported(code)) setLangState(code);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const index = LANGUAGES.findIndex((l) => l.code === current);
      return LANGUAGES[(index + 1) % LANGUAGES.length].code;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: getContent(lang) }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialLang: PropTypes.oneOf(["en", "hi"]),
};
