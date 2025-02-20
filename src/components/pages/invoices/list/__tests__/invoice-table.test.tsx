import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useInvoiceContext } from "@/context/invoice.context";
import { InvoiceType } from "@/lib/types/invoice";
import { InvoiceTable } from "../invoice-table";
import { ToastProvider } from "@/context/toast.context";

jest.mock("@/context/invoice.context", () => ({
  useInvoiceContext: jest.fn(),
}));

const mockInvoices: InvoiceType[] = [
  {
    name: "Invoice 1",
    number: "INV-001",
    dueDate: "28/02/2025",
    status: "paid",
    amount: "100000",
  },
  {
    name: "Invoice 2",
    number: "INV-002",
    dueDate: "15/03/2025",
    status: "pending",
    amount: "200000",
  },
  {
    name: "Invoice 3",
    number: "INV-003",
    dueDate: "20/03/2025",
    status: "unpaid",
    amount: "300000",
  },
];

describe("InvoiceTable", () => {
  beforeEach(() => {
    (useInvoiceContext as jest.Mock).mockReturnValue({
      invoices: mockInvoices,
    });
  });

  it("renders the table with invoices data", async () => {
    render(
      <ToastProvider>
        <InvoiceTable />
      </ToastProvider>
    );

    // Check if table headers are rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("DueDate")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    await waitFor(() => {
      // Check if the first invoice is rendered
      expect(screen.getByText("Invoice 1")).toBeInTheDocument();
      expect(screen.getByText("INV-001")).toBeInTheDocument();
      expect(screen.getByText("Feb 28, 2025")).toBeInTheDocument();
      expect(screen.getByText("Paid")).toBeInTheDocument();
      expect(screen.getByText("Rp. 100.000")).toBeInTheDocument();

      // Check if the second invoice is rendered
      expect(screen.getByText("Invoice 2")).toBeInTheDocument();
      expect(screen.getByText("INV-002")).toBeInTheDocument();
      expect(screen.getByText("Mar 15, 2025")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Rp. 200.000")).toBeInTheDocument();

      // Check if the third invoice is rendered
      expect(screen.getByText("Invoice 3")).toBeInTheDocument();
      expect(screen.getByText("INV-003")).toBeInTheDocument();
      expect(screen.getByText("Mar 20, 2025")).toBeInTheDocument();
      expect(screen.getByText("Unpaid")).toBeInTheDocument();
      expect(screen.getByText("Rp. 300.000")).toBeInTheDocument();
    });
  });
});
