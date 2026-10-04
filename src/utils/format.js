/**
 * Replaces {name} placeholders in a string.
 * Unknown placeholders are left untouched so missing values are easy to spot.
 * @param {string} template
 * @param {Record<string, string|number>} values
 * @returns {string}
 */
export function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match,
  );
}

/**
 * First visible character of a name (safe for Hindi and emoji).
 * @param {string} name
 * @returns {string}
 */
export function initialOf(name) {
  return [...name.trim()][0] ?? "";
}
