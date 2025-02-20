import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useInvoiceContext } from "@/context/invoice.context";
import { InvoiceFilter } from "../invoice-filter";

jest.mock("@/context/invoice.context", () => ({
  useInvoiceContext: jest.fn(),
}));

describe("InvoiceFilter", () => {
  const mockSetSearch = jest.fn();
  const mockSetStatus = jest.fn();

  beforeEach(() => {
    (useInvoiceContext as jest.Mock).mockReturnValue({
      search: "",
      status: "",
      setSearch: mockSetSearch,
      setStatus: mockSetStatus,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search input and status select field", () => {
    render(<InvoiceFilter />);

    const searchInput = screen.getByPlaceholderText("Search");
    const statusSelect = screen.getByPlaceholderText("All Status");

    expect(searchInput).toBeInTheDocument();
    expect(statusSelect).toBeInTheDocument();
  });

  it("updates search value on input change", () => {
    render(<InvoiceFilter />);

    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Invoice123" } });

    expect(mockSetSearch).toHaveBeenCalledWith("Invoice123");
  });

  it("updates status value on select change", () => {
    render(<InvoiceFilter />);

    const statusSelect = screen.getByPlaceholderText("All Status");

    fireEvent.change(statusSelect, { target: { value: "paid" } });

    expect(mockSetStatus).toHaveBeenCalledWith("paid");
  });
});
