/**
 * Static facts about the clinic and the site.
 * Change phone numbers, address, links and rating HERE. Components must not hard-code them.
 * (All visitor-facing wording lives in /content, one file per language.)
 */

/** Public URL of the deployed site, set through VITE_SITE_URL (see .env.example). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

export const CLINIC = {
  name: "Talwar Dental Care",
  doctorName: "Dr. Anish Talwar",
  phone: {
    display: "098290 76830",
    tel: "+919829076830",
    /** Country code + number, digits only. Used for wa.me links. */
    whatsapp: "919829076830",
  },
  address: {
    street: "79/14, Shipra Path, Sector 7, Mansarovar",
    locality: "Jaipur",
    region: "Rajasthan",
    postalCode: "302020",
    country: "IN",
  },
  /** schema.org opening hours. Keep in sync with `contact.hours` in /content. */
  openingHours: ["Mo-Su 09:00-18:00"],
  maps: {
    link: "https://maps.app.goo.gl/wAgUbgLkutKgJyAf6",
    embed:
      "https://www.google.com/maps?q=Talwar+Dental+Care+79/14+Shipra+Path+Mansarovar+Jaipur&output=embed",
  },
  /**
   * Overall rating shown in the reviews section.
   * Values were read from the clinic's Justdial listing. Replace them with the Google Business Profile
   * rating (and set `source` to "Google") once confirmed.
   */
  rating: { value: "4.9", count: 122, source: "Justdial" },
};

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
];
export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "talwar-lang";

/** DOM ids of the page sections. Used for ids, anchors and scrolling so they can never drift apart. */
export const SECTION_IDS = {
  top: "top",
  about: "about",
  services: "services",
  oneRoof: "oneroof",
  reviews: "reviews",
  contact: "contact",
};

/** Header navigation. `key` is the label key inside `content.nav`. */
export const NAV_LINKS = [
  { key: "about", sectionId: SECTION_IDS.about },
  { key: "services", sectionId: SECTION_IDS.services },
  { key: "clinic", sectionId: SECTION_IDS.oneRoof },
  { key: "reviews", sectionId: SECTION_IDS.reviews },
  { key: "contact", sectionId: SECTION_IDS.contact },
];
