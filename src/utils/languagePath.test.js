import { describe, expect, it } from "vitest";
import { languageFromLocation, languageHref } from "./languagePath";

describe("language paths", () => {
  it("treats /hi/ as the Hindi page and everything else as English", () => {
    expect(languageFromLocation("/hi/")).toBe("hi");
    expect(languageFromLocation("/hi")).toBe("hi");
    expect(languageFromLocation("/hi/index.html")).toBe("hi");
    expect(languageFromLocation("/")).toBeNull();
    expect(languageFromLocation("/index.html")).toBeNull();
  });

  it("links each language to its own crawlable URL", () => {
    expect(languageHref("hi")).toBe("/hi/");
    expect(languageHref("en")).toBe("/");
  });
});
