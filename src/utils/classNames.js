/**
 * Joins truthy class names into one string.
 * @param {...(string|false|null|undefined)} parts
 * @returns {string}
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
