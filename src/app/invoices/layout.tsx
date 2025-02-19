import { InvoiceProvider } from "@/context/invoice.context";
import { ReactNode, Suspense } from "react";

export default function InvoicesLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <InvoiceProvider>{children}</InvoiceProvider>
    </Suspense>
  );
}
