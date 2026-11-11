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
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
    { dayOfWeek: ["Sunday"], opens: "10:00", closes: "13:30" },
  ],
  maps: {
    link: "https://maps.app.goo.gl/wAgUbgLkutKgJyAf6",
    embed:
      "https://www.google.com/maps?q=Talwar+Dental+Care+79/14+Shipra+Path+Mansarovar+Jaipur&output=embed",
  },
  /**
   * Public place pin for 79/14, Shipra Path (same address and phone as this clinic).
   * Latitude and longitude, in that order.
   */
  geo: { latitude: 26.86248, longitude: 75.77355 },
  memberships: [
    "Association of Oral and Maxillofacial Surgeons of India",
    "Indian Dental Association",
    "International Congress of Oral Implantologists",
  ],
  /** Profiles that already name this clinic. Used in structured data. */
  sameAs: [
    "https://maps.app.goo.gl/wAgUbgLkutKgJyAf6",
    "https://www.practo.com/jaipur/clinic/talwar-s-dental-care-mansarovar",
    "https://www.timesmed.com/Doctor/Jaipur/dr-anish-talwar-62113",
    "https://kivihealth.com/iam/anish.talwar.3534",
    "https://www.drlogy.com/jaipur/clinic/talwar-s-dental-care",
  ],
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

/**
 * Crawlable pages. English and Hindi share a slug so each pair can point at each other.
 * `en` and `hi` are root-absolute paths with a trailing slash.
 */
export const PAGES = [
  { id: "home", en: "/", hi: "/hi/" },
  { id: "doctor", en: "/dr-anish-talwar/", hi: "/hi/dr-anish-talwar/" },
  {
    id: "implants",
    en: "/dental-implants-mansarovar-jaipur/",
    hi: "/hi/dental-implants-mansarovar-jaipur/",
  },
  {
    id: "rct",
    en: "/root-canal-treatment-mansarovar/",
    hi: "/hi/root-canal-treatment-mansarovar/",
  },
];

/** DOM ids of the page sections. Used for ids, anchors and scrolling so they can never drift apart. */
export const SECTION_IDS = {
  top: "top",
  about: "about",
  services: "services",
  oneRoof: "oneroof",
  reviews: "reviews",
  contact: "contact",
};

/**
 * Header navigation. A `pageId` is its own indexable URL. A `sectionId` scrolls
 * to a block on the homepage.
 */
export const NAV_LINKS = [
  { key: "about", pageId: "doctor" },
  { key: "implants", pageId: "implants" },
  { key: "rct", pageId: "rct" },
  { key: "reviews", sectionId: SECTION_IDS.reviews },
  { key: "contact", sectionId: SECTION_IDS.contact },
];
