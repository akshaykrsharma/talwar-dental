/**
 * Builds a wa.me link that opens WhatsApp with a ready-made message.
 * @param {string} number country code + number, digits only
 * @param {string[]} lines message lines
 * @returns {string}
 */
export function buildWhatsAppUrl(number, lines) {
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds the booking message lines from form values and localized labels.
 * @param {{name: string, phone: string, serviceName: string, note?: string}} values
 * @param {{whatsappIntro: string, whatsappName: string, whatsappPhone: string, whatsappService: string, whatsappNote: string}} labels
 * @returns {string[]}
 */
export function buildBookingLines(values, labels) {
  const lines = [
    labels.whatsappIntro,
    `${labels.whatsappName}: ${values.name.trim()}`,
    `${labels.whatsappPhone}: ${values.phone.trim()}`,
    `${labels.whatsappService}: ${values.serviceName}`,
  ];
  if (values.note?.trim()) lines.push(`${labels.whatsappNote}: ${values.note.trim()}`);
  return lines;
}
