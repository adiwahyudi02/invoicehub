import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InvoiceProvider, useInvoiceContext } from "../invoice.context";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage.constans";
import { getItem, setItem } from "@/utils/localstorage.utils";
import { InvoiceType } from "@/lib/types/invoice";

// Mock localStorage utils
jest.mock("@/utils/localstorage.utils", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock useSearchParamsState hook
jest.mock("@/hooks/useSearchParamsState", () => ({
  useSearchParamsState: jest.fn().mockReturnValue(["", jest.fn()]),
}));

const mockInvoice: InvoiceType = {
  number: "INV-001",
  name: "Test Invoice",
  status: "pending",
  amount: "1000",
  dueDate: "2024-07-28",
};

const TestComponent = () => {
  const {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceByNumber,
  } = useInvoiceContext();

  return (
    <div>
      <button onClick={() => addInvoice(mockInvoice)}>Add Invoice</button>
      <button onClick={() => updateInvoice("INV-001", { status: "paid" })}>
        Update Invoice
      </button>
      <button onClick={() => deleteInvoice("INV-001")}>Delete Invoice</button>
      <p data-testid="invoice-count">{invoices.length}</p>
      <p data-testid="invoice-status">
        {getInvoiceByNumber("INV-001")?.status || "not found"}
      </p>
    </div>
  );
};

describe("InvoiceProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds an invoice", () => {
    render(
      <InvoiceProvider>
        <TestComponent />
      </InvoiceProvider>
    );

    fireEvent.click(screen.getByText("Add Invoice"));

    expect(screen.getByTestId("invoice-count")).toHaveTextContent("1");
    expect(setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY.INVOICE, [
      mockInvoice,
    ]);
  });

  it("updates an invoice", () => {
    (getItem as jest.Mock).mockReturnValue([mockInvoice]);

    render(
      <InvoiceProvider>
        <TestComponent />
      </InvoiceProvider>
    );

    fireEvent.click(screen.getByText("Update Invoice"));

    expect(screen.getByTestId("invoice-status")).toHaveTextContent("paid");
    expect(setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY.INVOICE, [
      { ...mockInvoice, status: "paid" },
    ]);
  });

  it("deletes an invoice", () => {
    (getItem as jest.Mock).mockReturnValue([mockInvoice]);

    render(
      <InvoiceProvider>
        <TestComponent />
      </InvoiceProvider>
    );

    fireEvent.click(screen.getByText("Delete Invoice"));

    expect(screen.getByTestId("invoice-count")).toHaveTextContent("0");
    expect(setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY.INVOICE, []);
  });

  it("retrieves an invoice by number", () => {
    (getItem as jest.Mock).mockReturnValue([mockInvoice]);

    render(
      <InvoiceProvider>
        <TestComponent />
      </InvoiceProvider>
    );

    expect(screen.getByTestId("invoice-status")).toHaveTextContent("pending");
  });
});
