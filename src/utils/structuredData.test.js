import { describe, expect, it } from "vitest";
import { CLINIC } from "@/config/site";
import { buildDentistSchema } from "./structuredData";

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
  });

  it("omits url and image when the site URL is not configured", () => {
    const s = buildDentistSchema({ clinic: CLINIC, siteUrl: "", description: "d" });
    expect(JSON.parse(JSON.stringify(s))).not.toHaveProperty("url");
    expect(JSON.parse(JSON.stringify(s))).not.toHaveProperty("image");
  });
});
