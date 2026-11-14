import { describe, expect, it } from "vitest";
import { CLINIC } from "@/config/site";
import { buildDentistSchema, buildPageSchema } from "./structuredData";

describe("buildDentistSchema", () => {
  const schema = buildDentistSchema({
    clinic: CLINIC,
    siteUrl: "https://example.com",
    description: "desc",
  });

  it("describes the clinic as a schema.org Dentist", () => {
    expect(schema["@type"]).toBe("Dentist");
    expect(schema.telephone).toBe("+919829076830");
    expect(schema.address.postalCode).toBe("302020");
    expect(schema.url).toBe("https://example.com/");
    expect(schema.geo.latitude).toBe(CLINIC.geo.latitude);
    expect(schema.geo.longitude).toBe(CLINIC.geo.longitude);
    expect(schema.sameAs).toContain(
      "https://www.practo.com/jaipur/clinic/talwar-s-dental-care-mansarovar",
    );
    expect(schema.employee["@type"]).toBe("Person");
    expect(schema.employee.name).toBe("Dr. Anish Talwar");
    expect(schema.areaServed.map((area) => area.name)).toEqual(["Mansarovar", "Jaipur"]);
    expect(schema.availableService.map((service) => service.name)).toContain("Dental implant");
    expect(schema.employee.hasCredential.map((item) => item.name)).toEqual([
      "BDS",
      "MDS – Oral & Maxillofacial Surgery",
    ]);
    expect(schema).not.toHaveProperty("aggregateRating");
  });

  it("uses continuous weekday hours and shorter Sunday hours", () => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    expect(schema.openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: weekdays,
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "13:30",
      },
    ]);
    expect(schema).not.toHaveProperty("openingHours");
  });

  it("derives hours from the clinic rather than hardcoding a schedule", () => {
    const hours = { dayOfWeek: ["Friday"], opens: "11:00", closes: "12:00" };
    const custom = buildDentistSchema({
      clinic: { ...CLINIC, openingHoursSpecification: [hours] },
      siteUrl: "https://example.com",
      description: "desc",
    });
    expect(custom.openingHoursSpecification).toEqual([
      { "@type": "OpeningHoursSpecification", ...hours },
    ]);
  });

  it("adds breadcrumbs and questions on a treatment page", () => {
    const page = buildPageSchema({
      clinic: CLINIC,
      siteUrl: "https://example.com",
      description: "desc",
      pagePath: "/dental-implants-mansarovar-jaipur/",
      pageName: "Dental implants",
      homeName: "Talwar Dental Care",
      faqs: [{ q: "How long?", a: "It depends on the plan." }],
    });
    const types = page["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["Dentist", "BreadcrumbList", "FAQPage"]);
    expect(page["@graph"][1].itemListElement[1].item).toBe(
      "https://example.com/dental-implants-mansarovar-jaipur/",
    );
    expect(page["@graph"][2].mainEntity[0].name).toBe("How long?");
    expect(page).not.toHaveProperty("aggregateRating");
  });

  it("keeps the homepage as a single Dentist node", () => {
    const page = buildPageSchema({
      clinic: CLINIC,
      siteUrl: "https://example.com",
      description: "desc",
      pagePath: "/",
    });
    expect(page["@type"]).toBe("Dentist");
    expect(page).not.toHaveProperty("@graph");
  });

  it("omits url and image when the site URL is not configured", () => {
    const s = buildDentistSchema({ clinic: CLINIC, siteUrl: "", description: "d" });
    expect(JSON.parse(JSON.stringify(s))).not.toHaveProperty("url");
    expect(JSON.parse(JSON.stringify(s))).not.toHaveProperty("image");
  });
});
