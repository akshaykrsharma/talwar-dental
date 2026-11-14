import { describe, expect, it } from "vitest";
import { PAGES } from "@/config/site";
import { languageFromLocation, languageHref, pageFromLocation, sectionHref } from "./languagePath";

describe("language paths", () => {
  it("treats /hi/ as the Hindi page and everything else as English", () => {
    expect(languageFromLocation("/hi/")).toBe("hi");
    expect(languageFromLocation("/hi")).toBe("hi");
    expect(languageFromLocation("/hi/index.html")).toBe("hi");
    expect(languageFromLocation("/hi/dr-anish-talwar/")).toBe("hi");
    expect(languageFromLocation("/")).toBe("en");
    expect(languageFromLocation("/index.html")).toBe("en");
    expect(languageFromLocation("/dr-anish-talwar/")).toBe("en");
  });

  it("links each language to its own crawlable URL", () => {
    expect(languageHref("hi")).toBe("/hi/");
    expect(languageHref("en")).toBe("/");
    expect(languageHref("hi", "implants")).toBe("/hi/dental-implants-mansarovar-jaipur/");
    expect(languageHref("en", "rct")).toBe("/root-canal-treatment-mansarovar/");
    expect(languageHref("hi", "crowns")).toBe("/hi/dental-crowns-mansarovar-jaipur/");
    expect(languageHref("en", "cleaning")).toBe("/teeth-cleaning-mansarovar-jaipur/");
  });

  it("reads the page id from English and Hindi paths", () => {
    expect(pageFromLocation("/")).toBe("home");
    expect(pageFromLocation("/hi/")).toBe("home");
    expect(pageFromLocation("/dr-anish-talwar/")).toBe("doctor");
    expect(pageFromLocation("/hi/dr-anish-talwar/index.html")).toBe("doctor");
    expect(pageFromLocation("/dental-implants-mansarovar-jaipur")).toBe("implants");
    expect(pageFromLocation("/hi/root-canal-treatment-mansarovar/")).toBe("rct");
    expect(pageFromLocation("/oral-surgery-mansarovar-jaipur/")).toBe("surgery");
    expect(pageFromLocation("/hi/gum-treatment-mansarovar-jaipur/")).toBe("gums");
    expect(pageFromLocation("/unknown")).toBe("notFound");
    expect(pageFromLocation("/hi/not-a-real-page/")).toBe("notFound");
  });

  it("keeps section links on the homepage and points other pages back to it", () => {
    expect(sectionHref("home", "en", "contact")).toBe("#contact");
    expect(sectionHref("implants", "en", "contact")).toBe("/#contact");
    expect(sectionHref("implants", "hi", "about")).toBe("/hi/#about");
  });

  it("has a unique English and Hindi path for every page", () => {
    const paths = PAGES.flatMap((page) => [page.en, page.hi]);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
