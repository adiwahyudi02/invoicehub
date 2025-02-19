import { formatDate } from "../date.utils";

describe("formatDate", () => {
  it("should format a valid date string correctly", () => {
    expect(formatDate("01/01/2024")).toBe("Jan 01, 2024");
    expect(formatDate("25/12/2023")).toBe("Dec 25, 2023");
    expect(formatDate("15/08/2022")).toBe("Aug 15, 2022");
  });

  it("should return '-' for invalid date strings", () => {
    expect(formatDate("abcd/ef/ghij")).toBe("-"); // Non-numeric input
    expect(formatDate("12-12-2024")).toBe("-"); // Incorrect format
    expect(formatDate("12/12")).toBe("-"); // Missing year
    expect(formatDate("")).toBe("-"); // Empty string
  });
});
