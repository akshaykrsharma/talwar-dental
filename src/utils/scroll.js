/**
 * Smoothly scrolls to the element with the given id (instant for reduced-motion visitors).
 * @param {string} id
 */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

/** "#section" anchor for a section id. */
export const anchor = (id) => `#${id}`;
