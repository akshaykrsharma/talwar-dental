import { describe, expect, it } from "vitest";
import { buildBookingLines, buildWhatsAppUrl } from "./whatsapp";

const labels = {
  whatsappIntro: "Hello",
  whatsappName: "Name",
  whatsappPhone: "Phone",
  whatsappService: "Treatment",
  whatsappNote: "Note",
};

describe("buildBookingLines", () => {
  it("lists the details in order and trims whitespace", () => {
    const lines = buildBookingLines(
      { name: " Ravi ", phone: " 98290 76830 ", serviceName: "Dental implants", note: "" },
      labels,
    );
    expect(lines).toEqual([
      "Hello",
      "Name: Ravi",
      "Phone: 98290 76830",
      "Treatment: Dental implants",
    ]);
  });

  it("adds the note only when there is one", () => {
    const lines = buildBookingLines(
      { name: "R", phone: "1", serviceName: "X", note: " evening please " },
      labels,
    );
    expect(lines.at(-1)).toBe("Note: evening please");
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds an encoded wa.me link with one message line per line", () => {
    const url = buildWhatsAppUrl("919829076830", ["Hello", "Name: अनीश & co"]);
    expect(url.startsWith("https://wa.me/919829076830?text=")).toBe(true);
    const text = decodeURIComponent(url.split("?text=")[1]);
    expect(text).toBe("Hello\nName: अनीश & co");
  });
});
