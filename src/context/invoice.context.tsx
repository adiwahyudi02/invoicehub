"use client";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { getItem, setItem } from "@/utils/localstorage.utils";
import { InvoiceType } from "@/lib/types/invoice";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage.constans";

interface InvoiceContextType {
  invoices: InvoiceType[];
  search: string;
  status: string;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  addInvoice: (invoice: InvoiceType) => { success: boolean; message: string };
  updateInvoice: (
    number: string,
    updatedData: Partial<InvoiceType>
  ) => { success: boolean; message: string };
  deleteInvoice: (number: string) => { success: boolean; message: string };
  getInvoiceByNumber: (number: string) => InvoiceType | undefined;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);

  // Use the custom hook for URL state management
  const [search, setSearch] = useSearchParamsState("search");
  const [status, setStatus] = useSearchParamsState("status");

  // Load invoices from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInvoices = getItem<InvoiceType[]>(LOCALSTORAGE_KEY.INVOICE);
      if (storedInvoices) {
        setInvoices(storedInvoices);
      }
    }
  }, []);

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter((invoice) => {
    const searchMatch = search
      ? invoice.number.toLowerCase().includes(search.toLowerCase()) ||
        invoice.name.toLowerCase().includes(search.toLowerCase())
      : true;

    const statusMatch = status ? invoice.status === status : true;

    return searchMatch && statusMatch;
  });

  const addInvoice = (invoice: InvoiceType) => {
    try {
      const updatedInvoices = [...invoices, invoice];
      setInvoices(updatedInvoices);
      setItem(LOCALSTORAGE_KEY.INVOICE, updatedInvoices);
      return { success: true, message: "Invoice added successfully!" };
    } catch {
      return { success: false, message: "Failed to add invoice." };
    }
  };

  const updateInvoice = (number: string, updatedData: Partial<InvoiceType>) => {
    try {
      const updatedInvoices = invoices.map((inv) =>
        inv.number === number ? { ...inv, ...updatedData } : inv
      );
      setInvoices(updatedInvoices);
      setItem(LOCALSTORAGE_KEY.INVOICE, updatedInvoices);
      return { success: true, message: "Invoice updated successfully!" };
    } catch {
      return { success: false, message: "Failed to update invoice." };
    }
  };

  const deleteInvoice = (number: string) => {
    try {
      const updatedInvoices = invoices.filter((inv) => inv.number !== number);
      setInvoices(updatedInvoices);
      setItem(LOCALSTORAGE_KEY.INVOICE, updatedInvoices);
      return { success: true, message: "Invoice deleted successfully!" };
    } catch {
      return { success: false, message: "Failed to delete invoice." };
    }
  };

  const getInvoiceByNumber = (number: string) => {
    return invoices.find((inv) => inv.number === number);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices: filteredInvoices,
        search,
        status,
        setSearch,
        setStatus,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoiceByNumber,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
};
