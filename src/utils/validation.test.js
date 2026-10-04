import { describe, expect, it } from "vitest";
import { isValidName, normalizeIndianMobile, validateBooking } from "./validation";

describe("normalizeIndianMobile", () => {
  it.each([
    ["9829076830", "9829076830"],
    ["098290 76830", "9829076830"],
    ["+91 98290-76830", "9829076830"],
    ["919829076830", "9829076830"],
    ["  98290 76830  ", "9829076830"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it("does not strip a legitimate number that merely starts with 91", () => {
    // regression: the first version removed "91" from the front of any number
    expect(normalizeIndianMobile("9123456789")).toBe("9123456789");
  });

  it.each(["", "12345", "5829076830", "98290768301", "abcdefghij", "+44 7911 123456"])(
    "rejects %j",
    (input) => {
      expect(normalizeIndianMobile(input)).toBe("");
    },
  );
});

describe("isValidName", () => {
  it("needs at least two visible characters", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("  ")).toBe(false);
    expect(isValidName("A")).toBe(false);
    expect(isValidName("अनीश")).toBe(true);
    expect(isValidName("Ravi")).toBe(true);
  });
});

describe("validateBooking", () => {
  const messages = { nameError: "name!", phoneError: "phone!" };

  it("returns no errors for valid input", () => {
    expect(validateBooking({ name: "Ravi", phone: "9829076830" }, messages)).toEqual({});
  });

  it("returns localized messages for each invalid field", () => {
    expect(validateBooking({ name: "", phone: "123" }, messages)).toEqual({
      name: "name!",
      phone: "phone!",
    });
  });
});
