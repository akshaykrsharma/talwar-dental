import { createContext } from "react";

/** Holds { lang, t, setLang, toggleLang }. Use the useLanguage() hook instead of reading it directly. */
export const LanguageContext = createContext(null);
