import en from "./en.js";
import hi from "./hi.js";

/** All translations, keyed by language code. */
export const content = { en, hi };

/**
 * Returns the copy for a language, falling back to English for unknown codes.
 * @param {"en"|"hi"} lang
 */
export function getContent(lang) {
  return content[lang] ?? content.en;
}
