import { z } from "zod";
import { invoiceSchema } from "../schemas/invoice.schema";

export type InvoiceType = z.infer<typeof invoiceSchema>;
