import { InvoiceForm } from "@/components/pages/invoices/form/invoice-form";
import { Title } from "@/components/ui/title";
import { Metadata } from "next";

interface InvoicesEditPageProps {
  params: Promise<{ number: string }>;
}

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function InvoicesEdit({ params }: InvoicesEditPageProps) {
  const number = (await params).number;

  return (
    <>
      <Title mb={4}>Add Invoice</Title>
      <InvoiceForm number={number} />
    </>
  );
}
