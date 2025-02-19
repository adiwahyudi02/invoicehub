import { formatCurrency, unformatCurrency } from "../currency.utils";

describe("formatCurrency", () => {
  it("should format a numeric string with default '.' separator", () => {
    expect(formatCurrency("1000")).toBe("1.000");
    expect(formatCurrency("1000000")).toBe("1.000.000");
  });

  it("should format a numeric string with custom ',' separator", () => {
    expect(formatCurrency("1000", ",")).toBe("1,000");
    expect(formatCurrency("1000000", ",")).toBe("1,000,000");
  });

  it("should return an empty string when input is empty", () => {
    expect(formatCurrency("")).toBe("");
  });

  it("should handle single-digit and two-digit numbers", () => {
    expect(formatCurrency("5")).toBe("5");
    expect(formatCurrency("50")).toBe("50");
  });
});

describe("unformatCurrency", () => {
  it("should remove separators and return a numeric string", () => {
    expect(unformatCurrency("1.000")).toBe("1000");
    expect(unformatCurrency("1.000.000")).toBe("1000000");
  });

  it("should remove custom ',' separator", () => {
    expect(unformatCurrency("1,000", ",")).toBe("1000");
    expect(unformatCurrency("1,000,000", ",")).toBe("1000000");
  });

  it("should return the same string if there are no separators", () => {
    expect(unformatCurrency("123456")).toBe("123456");
  });

  it("should handle empty input", () => {
    expect(unformatCurrency("")).toBe("");
  });
});
