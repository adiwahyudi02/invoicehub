import { InvoiceFilter } from "@/components/pages/invoices/list/invoice-filter";
import { InvoiceTable } from "@/components/pages/invoices/list/invoice-table";
import { Title } from "@/components/ui/title";
import { Box } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Invoices",
};

export default function InvoicesListPage() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={4}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "start",
            sm: "center",
          },
          gap: 5,
        }}
      >
        <Title>My Invoices</Title>
        <InvoiceFilter />
      </Box>
      <InvoiceTable />
    </>
  );
}
