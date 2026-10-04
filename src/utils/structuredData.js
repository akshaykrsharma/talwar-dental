/**
 * schema.org JSON-LD for the clinic (helps Google show address, phone and hours).
 * @param {object} args
 * @param {typeof import("../config/site.js").CLINIC} args.clinic
 * @param {string} args.siteUrl absolute site URL without trailing slash, or ""
 * @param {string} args.description
 * @returns {object}
 */
export function buildDentistSchema({ clinic, siteUrl, description }) {
  const url = siteUrl ? `${siteUrl}/` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": url ? `${url}#dentist` : undefined,
    name: clinic.name,
    description,
    url,
    image: siteUrl ? `${siteUrl}/og-image.jpg` : undefined,
    inLanguage: ["en", "hi"],
    areaServed: {
      "@type": "City",
      name: clinic.address.locality,
    },
    telephone: clinic.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    openingHours: clinic.openingHours,
    hasMap: clinic.maps.link,
    employee: {
      "@type": "Person",
      name: clinic.doctorName,
      jobTitle: "Dentist, Oral & Maxillofacial Surgeon",
    },
  };
}
