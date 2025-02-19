import { InvoiceForm } from "@/components/pages/invoices/form/invoice-form";
import { Title } from "@/components/ui/title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Invoice",
};

export default function InvoicesAddPage() {
  return (
    <>
      <Title mb={4}>Add Invoice</Title>
      <InvoiceForm />
    </>
  );
}
