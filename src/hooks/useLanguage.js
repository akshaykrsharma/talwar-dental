import { useContext } from "react";
import { LanguageContext } from "@/context/languageContextValue";

/**
 * Access the active language and its copy.
 * @returns {{lang: "en"|"hi", t: typeof import("@/content/en.js").default, setLang: (code: string) => void, toggleLang: () => void}}
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
