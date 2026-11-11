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
    medicalSpecialty: "Oral & Maxillofacial Surgery",
    areaServed: [
      { "@type": "Place", name: "Mansarovar" },
      { "@type": "City", name: clinic.address.locality },
    ],
    telephone: clinic.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.latitude,
      longitude: clinic.geo.longitude,
    },
    openingHoursSpecification: clinic.openingHoursSpecification.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      ...hours,
    })),
    hasMap: clinic.maps.link,
    sameAs: clinic.sameAs,
    availableService: [
      { "@type": "MedicalProcedure", name: "Dental implant" },
      { "@type": "MedicalProcedure", name: "Root canal treatment" },
      { "@type": "MedicalProcedure", name: "Oral and maxillofacial surgery" },
    ],
    employee: {
      "@type": "Person",
      name: clinic.doctorName,
      jobTitle: "Dentist, Oral & Maxillofacial Surgeon",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "BDS",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MDS – Oral & Maxillofacial Surgery",
        },
      ],
      memberOf: clinic.memberships.map((name) => ({ "@type": "Organization", name })),
    },
  };
}

/**
 * Clinic schema, plus breadcrumbs and FAQs on a treatment or profile page.
 * The homepage stays a single Dentist node.
 */
export function buildPageSchema({
  clinic,
  siteUrl,
  description,
  pagePath = "/",
  pageName,
  homeName,
  faqs,
}) {
  const dentist = buildDentistSchema({ clinic, siteUrl, description });
  const isHome = pagePath === "/" || pagePath === "/hi/";
  const extras = [];

  if (siteUrl && !isHome && pageName) {
    const homePath = pagePath.startsWith("/hi/") ? "/hi/" : "/";
    extras.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeName || clinic.name,
          item: `${siteUrl}${homePath}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageName,
          item: `${siteUrl}${pagePath}`,
        },
      ],
    });
  }

  if (faqs?.length) {
    extras.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (!extras.length) return dentist;

  const { "@context": context, ...clinicNode } = dentist;
  return { "@context": context, "@graph": [clinicNode, ...extras] };
}
