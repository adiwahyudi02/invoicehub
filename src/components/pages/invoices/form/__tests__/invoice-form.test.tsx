import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useInvoiceContext } from "@/context/invoice.context";
import { InvoiceForm } from "../invoice-form";
import { invoiceStatus } from "@/constants/invoice.constants";
import { formatCurrency } from "@/utils/currency.utils";

// Mocking the useInvoiceContext
jest.mock("@/context/invoice.context", () => ({
  useInvoiceContext: jest.fn(),
}));

const mockInvoice = {
  name: "Invoice 2",
  number: "INV001234567891234",
  dueDate: "15/03/2025",
  status: "pending",
  amount: "200000",
};

describe("InvoiceForm Component", () => {
  const addInvoice = jest.fn();
  const updateInvoice = jest.fn();
  const getInvoiceByNumber = jest.fn();

  beforeEach(() => {
    (useInvoiceContext as jest.Mock).mockReturnValue({
      addInvoice,
      updateInvoice,
      getInvoiceByNumber,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<InvoiceForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /status/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add invoice/i })
    ).toBeInTheDocument();
  });

  test("fills out the form and submits successfully", async () => {
    addInvoice.mockReturnValue({ success: true });

    render(<InvoiceForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockInvoice.name },
    });
    fireEvent.change(screen.getByLabelText(/number/i), {
      target: { value: mockInvoice.number },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: mockInvoice.dueDate },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: mockInvoice.amount },
    });
    fireEvent.mouseDown(
      screen.getByRole("combobox", {
        name: /status/i,
      })
    );
    fireEvent.click(
      screen.getByText(
        invoiceStatus.find((item) => item.value === mockInvoice.status)
          ?.label ?? ""
      )
    );

    fireEvent.click(screen.getByRole("button", { name: /add invoice/i }));

    await waitFor(() => {
      expect(addInvoice).toHaveBeenCalledWith(mockInvoice);

      expect(
        screen.getByText(/invoice added successfully/i)
      ).toBeInTheDocument();
    });
  });

  test("shows error message on submit failure", async () => {
    addInvoice.mockReturnValue({
      success: false,
      message: "Failed to add invoice",
    });

    render(<InvoiceForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockInvoice.name },
    });
    fireEvent.change(screen.getByLabelText(/number/i), {
      target: { value: mockInvoice.number },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: mockInvoice.dueDate },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: mockInvoice.amount },
    });
    fireEvent.mouseDown(
      screen.getByRole("combobox", {
        name: /status/i,
      })
    );
    fireEvent.click(
      screen.getByText(
        invoiceStatus.find((item) => item.value === mockInvoice.status)
          ?.label ?? ""
      )
    );

    fireEvent.click(screen.getByRole("button", { name: /add invoice/i }));

    await waitFor(() => {
      expect(screen.getByText(/error adding invoice/i)).toBeInTheDocument();
      expect(screen.getByText(/failed to add invoice/i)).toBeInTheDocument();
    });
  });

  test("prefills form fields when editing an existing invoice", () => {
    getInvoiceByNumber.mockReturnValue(mockInvoice);

    render(<InvoiceForm number={mockInvoice.number} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue(mockInvoice.name);
    expect(screen.getByLabelText(/number/i)).toHaveValue(mockInvoice.number);
    expect(screen.getByLabelText(/due date/i)).toHaveValue(mockInvoice.dueDate);
    expect(screen.getByLabelText(/amount/i)).toHaveValue(
      formatCurrency(mockInvoice.amount)
    );

    const selectStatus = screen.getByRole("combobox", {
      name: /status/i,
    });
    expect(selectStatus).toHaveTextContent(
      invoiceStatus.find((item) => item.value === mockInvoice.status)?.label ??
        ""
    );

    expect(
      screen.getByRole("button", { name: /edit invoice/i })
    ).toBeInTheDocument();
  });

  test("submits the form when editing an invoice", async () => {
    getInvoiceByNumber.mockReturnValue(mockInvoice);

    updateInvoice.mockReturnValue({ success: true });

    render(<InvoiceForm number={mockInvoice.number} />);

    fireEvent.click(screen.getByRole("button", { name: /edit invoice/i }));

    await waitFor(() => {
      expect(updateInvoice).toHaveBeenCalledWith(
        mockInvoice.number,
        mockInvoice
      );

      expect(
        screen.getByText(/invoice edited successfully/i)
      ).toBeInTheDocument();
    });
  });
});
