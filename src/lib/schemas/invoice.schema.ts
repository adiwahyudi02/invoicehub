import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  number: z.string().min(10),
  amount: z.string().min(1, { message: "Amount is required" }),
  dueDate: z
    .string()
    .min(1, { message: "Due Date is required" })
    .refine((date) => date !== "Invalid Date", {
      message: "Due Date is required",
    }),
  status: z.string().min(1, { message: "Status is required" }),
});
