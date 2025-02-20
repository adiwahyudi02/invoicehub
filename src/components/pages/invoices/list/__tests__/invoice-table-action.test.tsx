import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useInvoiceContext } from "@/context/invoice.context";
import { useToast } from "@/context/toast.context";
import "@testing-library/jest-dom";
import InvoiceTableAction from "../invoice-table-actions";

jest.mock("next/link", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, ...rest }: any) => <a {...rest}>{children}</a>,
}));

jest.mock("@/context/invoice.context", () => ({
  useInvoiceContext: jest.fn(),
}));

jest.mock("@/context/toast.context", () => ({
  useToast: jest.fn(),
}));

describe("InvoiceTableAction", () => {
  const mockDeleteInvoice = jest.fn();
  const mockShowToast = jest.fn();
  const mockRow = {
    name: "Test",
    number: "INV20250219113429435",
    amount: "1000",
    dueDate: "28/02/2025",
    status: "paid",
  };

  beforeEach(() => {
    (useInvoiceContext as jest.Mock).mockReturnValue({
      deleteInvoice: mockDeleteInvoice,
    });

    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders menu icon button", () => {
    render(<InvoiceTableAction row={mockRow} />);

    const menuButton = screen.getByRole("button", {
      name: /menu/i,
    });
    expect(menuButton).toBeInTheDocument();
  });

  it("opens menu when menu icon button is clicked", () => {
    render(<InvoiceTableAction row={mockRow} />);

    const menuButton = screen.getByRole("button", {
      name: /menu/i,
    });

    fireEvent.click(menuButton);

    const editMenuItem = screen.getByText("Edit");
    const deleteMenuItem = screen.getByText("Delete");

    expect(editMenuItem).toBeInTheDocument();
    expect(deleteMenuItem).toBeInTheDocument();
  });

  it("closes menu when delete is clicked and opens confirmation modal", () => {
    render(<InvoiceTableAction row={mockRow} />);

    const menuButton = screen.getByRole("button", {
      name: /menu/i,
    });

    fireEvent.click(menuButton);

    const deleteMenuItem = screen.getByText("Delete");

    fireEvent.click(deleteMenuItem);

    const confirmationModal = screen.getByRole("dialog");
    expect(confirmationModal).toBeInTheDocument();
  });

  it("calls deleteInvoice and showToast when confirming deletion", () => {
    mockDeleteInvoice.mockReturnValue({
      success: true,
      message: "Invoice deleted successfully",
    });

    render(<InvoiceTableAction row={mockRow} />);

    const menuButton = screen.getByRole("button", {
      name: /menu/i,
    });

    fireEvent.click(menuButton);

    const deleteMenuItem = screen.getByText("Delete");
    fireEvent.click(deleteMenuItem);

    const confirmDeleteButton = screen.getByRole("button", {
      name: /delete/i,
    });

    fireEvent.click(confirmDeleteButton);

    expect(mockDeleteInvoice).toHaveBeenCalledWith(mockRow.number);
    expect(mockShowToast).toHaveBeenCalledWith(
      "Invoice deleted successfully",
      "success"
    );
  });

  it("shows error toast when deletion fails", () => {
    mockDeleteInvoice.mockReturnValue({
      success: false,
      message: "Failed to delete invoice",
    });

    render(<InvoiceTableAction row={mockRow} />);

    const menuButton = screen.getByRole("button", {
      name: /menu/i,
    });

    fireEvent.click(menuButton);

    const deleteMenuItem = screen.getByText("Delete");
    fireEvent.click(deleteMenuItem);

    const confirmDeleteButton = screen.getByRole("button", {
      name: /delete/i,
    });

    fireEvent.click(confirmDeleteButton);

    expect(mockDeleteInvoice).toHaveBeenCalledWith(mockRow.number);
    expect(mockShowToast).toHaveBeenCalledWith(
      "Failed to delete invoice",
      "error"
    );
  });
});
