import { describe, expect, it } from "vitest";
import { content } from "./index";
import { ICON_NAMES } from "@/components/ui/iconData";
import { HERO_SLIDES } from "@/components/sections/Hero/heroSlideData";

/** Returns every key path in an object, e.g. "hero.stats.0.value". */
function paths(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((v, i) => paths(v, `${prefix}${i}.`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => paths(v, `${prefix}${k}.`));
  }
  return [prefix.slice(0, -1)];
}

const placeholders = (text) => [...String(text).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe("translations", () => {
  it("English and Hindi have exactly the same structure", () => {
    expect(paths(content.hi)).toEqual(paths(content.en));
  });

  it("has no empty strings", () => {
    for (const lang of ["en", "hi"]) {
      const flat = paths(content[lang]);
      for (const path of flat) {
        const value = path.split(".").reduce((o, k) => o[k], content[lang]);
        expect(value, `${lang}: ${path}`).not.toBe("");
      }
    }
  });

  it("uses the same {placeholders} in both languages", () => {
    expect(placeholders(content.hi.reviews.basis)).toEqual(placeholders(content.en.reviews.basis));
  });

  it("Hindi copy actually contains Devanagari text", () => {
    expect(content.hi.hero.title).toMatch(/[\u0900-\u097F]/);
    expect(content.hi.services.items.every((s) => /[\u0900-\u097F]/.test(s.title))).toBe(true);
  });

  it("every service and 'one roof' item has a matching icon", () => {
    for (const lang of ["en", "hi"]) {
      for (const { id } of [...content[lang].services.items, ...content[lang].oneRoof.items]) {
        expect(ICON_NAMES, `icon for "${id}"`).toContain(id);
      }
    }
  });

  it("every hero slide has a caption in both languages", () => {
    for (const lang of ["en", "hi"]) {
      const ids = content[lang].hero.slideshow.slides.map((s) => s.id);
      for (const { id } of HERO_SLIDES) expect(ids).toContain(id);
    }
  });

  describe("reviews", () => {
    for (const lang of ["en", "hi"]) {
      it(`${lang}: every review has a name, a topic and a quote`, () => {
        for (const review of content[lang].reviews.items) {
          expect(review.name.trim(), "name").not.toBe("");
          expect(review.topic.trim(), "topic").not.toBe("");
          expect(review.quote.trim().length, `quote of ${review.name}`).toBeGreaterThan(20);
        }
      });

      it(`${lang}: no reviewer appears twice`, () => {
        const names = content[lang].reviews.items.map((r) => r.name.toLowerCase());
        expect(new Set(names).size).toBe(names.length);
      });

      it(`${lang}: keeps cards a similar length so the scrolling row looks even`, () => {
        for (const review of content[lang].reviews.items) {
          expect(review.quote.length, review.name).toBeLessThanOrEqual(320);
        }
      });
    }

    it("contains no owner replies (only the patients' own words)", () => {
      const replyMarkers = [
        /response from the owner/i,
        /^thank you[ ,]/i,
        /we(?:'|’)re (?:so )?glad/i,
      ];
      for (const review of content.en.reviews.items) {
        for (const marker of replyMarkers) {
          expect(review.quote, review.name).not.toMatch(marker);
        }
      }
    });
  });
});
