import { describe, expect, it } from "vitest";
import { initialOf, interpolate } from "./format";
import { cx } from "./classNames";

describe("interpolate", () => {
  it("fills placeholders", () => {
    expect(
      interpolate("Based on {count} ratings on {source}", { count: 122, source: "Justdial" }),
    ).toBe("Based on 122 ratings on Justdial");
  });
  it("leaves unknown placeholders visible", () => {
    expect(interpolate("Hi {name}", {})).toBe("Hi {name}");
  });
});

describe("initialOf", () => {
  it("handles English and Hindi names", () => {
    expect(initialOf("Dk Goel")).toBe("D");
    expect(initialOf("स्निग्धा")).toBe("स");
    expect(initialOf("")).toBe("");
  });
});

describe("cx", () => {
  it("drops falsy values", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });
});
