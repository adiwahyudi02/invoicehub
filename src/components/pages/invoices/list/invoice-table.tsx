"use client";

import { Card, CardContent, Chip, Typography } from "@mui/material";
import { Column, TableClient } from "@/components/ui/table-client";
import { InvoiceType } from "@/lib/types/invoice";
import { formatDate } from "@/utils/date.utils";
import { formatCurrency } from "@/utils/currency.utils";
import InvoiceTableAction from "./invoice-table-actions";
import { useInvoiceContext } from "@/context/invoice.context";

const columns: Column<InvoiceType>[] = [
  {
    label: "Name",
    render: (row) => (
      <>
        <Typography>{row.name}</Typography>
        <Typography color="text.secondary" fontWeight="600">
          {row.number}
        </Typography>
      </>
    ),
  },
  {
    label: "DueDate",
    render: (row) => formatDate(row.dueDate),
    align: "center",
  },
  {
    label: "Status",
    align: "center",
    render: (row) => {
      switch (row.status) {
        case "paid":
          return <Chip label="Paid" color="success" />;
        case "pending":
          return <Chip label="Pending" color="warning" />;
        case "unpaid":
          return <Chip label="Unpaid" color="error" />;
        default:
          return "-";
      }
    },
  },
  {
    label: "Amount",
    render: (row) => `Rp. ${formatCurrency(row.amount)}`,
    align: "center",
  },
  {
    label: "Actions",
    render: (row) => <InvoiceTableAction row={row} />,
    align: "center",
  },
];

export const InvoiceTable: React.FC = () => {
  const { invoices } = useInvoiceContext();

  return (
    <Card>
      <CardContent>
        <TableClient data={invoices} columns={columns} />
      </CardContent>
    </Card>
  );
};
