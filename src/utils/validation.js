/**
 * Normalises an Indian mobile number to its 10 national digits.
 * Accepts spaces/dashes and the prefixes +91, 91 and 0.
 * Returns "" when the input cannot be a mobile number.
 * @param {string} input
 * @returns {string}
 */
export function normalizeIndianMobile(input) {
  let digits = String(input).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    if (!digits.startsWith("+91")) return "";
    digits = digits.slice(3);
  } else if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return /^[6-9]\d{9}$/.test(digits) ? digits : "";
}

export const isValidName = (name) => String(name).trim().length >= 2;

/**
 * Validates the booking form.
 * @param {{name: string, phone: string}} values
 * @param {{nameError: string, phoneError: string}} messages localized error texts
 * @returns {{name?: string, phone?: string}} empty object when valid
 */
export function validateBooking(values, messages) {
  const errors = {};
  if (!isValidName(values.name)) errors.name = messages.nameError;
  if (!normalizeIndianMobile(values.phone)) errors.phone = messages.phoneError;
  return errors;
}
