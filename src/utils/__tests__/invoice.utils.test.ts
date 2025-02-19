import { generateInvoiceNumber } from "../invoice.utils";

describe("generateInvoiceNumber", () => {
  it("should generate a unique invoice number with the correct format", () => {
    const invoiceNumber = generateInvoiceNumber();
    const regex = /^INV\d{17}$/; // Matches "INVYYYYMMDDHHMMSSmmm"

    expect(invoiceNumber).toMatch(regex);
  });
});
