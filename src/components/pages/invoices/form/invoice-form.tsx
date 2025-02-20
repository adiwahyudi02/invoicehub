"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/text-field";
import { DateField } from "@/components/ui/date-field";
import { SelectField } from "@/components/ui/select-field";
import { Add, Edit } from "@mui/icons-material";
import { generateInvoiceNumber } from "@/utils/invoice.utils";
import { invoiceSchema } from "@/lib/schemas/invoice.schema";
import { InvoiceType } from "@/lib/types/invoice";
import { Alert, AlertProps } from "@/components/ui/alert";
import React, { useEffect, useState } from "react";
import { invoiceStatus } from "@/constants/invoice.constants";
import { useInvoiceContext } from "@/context/invoice.context";
import { formatCurrency, unformatCurrency } from "@/utils/currency.utils";

const defaultValues = {
  name: "",
  amount: "",
  dueDate: "",
  status: "",
  number: generateInvoiceNumber(),
};

interface InvoiceFormProps {
  number?: string;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ number }) => {
  const isEdit = !!number;
  const { addInvoice, updateInvoice, getInvoiceByNumber } = useInvoiceContext();

  const [alertContent, setAlertContent] = useState<Omit<AlertProps, "onClose">>(
    {
      show: false,
      title: "",
      description: "",
    }
  );

  const { control, handleSubmit, reset } = useForm<InvoiceType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const onSubmit = async (data: InvoiceType) => {
    const payload = {
      ...data,
      amount: unformatCurrency(data.amount),
    };

    let result;

    if (isEdit) {
      result = updateInvoice(payload.number, payload); // Update invoice
      if (result.success) {
        setAlertContent({
          show: true,
          title: "Invoice edited successfully!",
          description:
            "You can view and manage your invoice in the 'My Invoices' section.",
        });
      } else {
        setAlertContent({
          show: true,
          title: "Error editing invoice",
          description: result.message || "An unknown error occurred.",
        });
      }
    } else {
      result = addInvoice(payload); // Add new invoice
      if (result.success) {
        reset({ ...defaultValues, number: generateInvoiceNumber() });

        setAlertContent({
          show: true,
          title: "Invoice added successfully!",
          description:
            "You can view and manage your invoice in the 'My Invoices' section.",
        });
      } else {
        setAlertContent({
          show: true,
          title: "Error adding invoice",
          description: result.message || "An unknown error occurred.",
        });
      }
    }
  };

  const handleOnCloseAlert = () => {
    setAlertContent((prev) => ({ ...prev, show: false }));
  };

  // Pre-fill form if editing an existing invoice
  useEffect(() => {
    if (isEdit && number) {
      const existingInvoice = getInvoiceByNumber(number);
      if (existingInvoice) {
        reset({
          name: existingInvoice.name,
          number: existingInvoice.number,
          amount: formatCurrency(existingInvoice.amount),
          dueDate: existingInvoice.dueDate,
          status: existingInvoice.status,
        });
      }
    } else {
      reset({ ...defaultValues, number: generateInvoiceNumber() });
    }
  }, [isEdit, number, getInvoiceByNumber, reset]);

  return (
    <>
      <Card component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
        <CardHeader title="Invoice Form" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                control={control}
                name="name"
                label="Name"
                placeholder="Enter your invoice name"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                control={control}
                name="number"
                label="Number"
                placeholder="Enter your invoice number"
                prefix="INV"
                regex={/[^0-9]/g}
                required
                disabled={isEdit}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <DateField
                name="dueDate"
                control={control}
                label="Due Date"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                control={control}
                name="amount"
                label="Amount"
                placeholder="Enter your amount"
                currencySeparator="."
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <SelectField
                name="status"
                label="Invoice Status"
                placeholder="Choose the status"
                control={control}
                required
                options={invoiceStatus}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            startIcon={isEdit ? <Edit /> : <Add />}
          >
            {isEdit ? "Edit" : "Add"} Invoice
          </Button>
        </CardActions>
      </Card>

      <Alert {...alertContent} onClose={handleOnCloseAlert} />
    </>
  );
};
