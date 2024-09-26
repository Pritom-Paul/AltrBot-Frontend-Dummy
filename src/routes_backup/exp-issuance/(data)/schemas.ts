import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	lc_no: z.string().nullable(),
	commodity: z.string().nullable(),
	incoterm: z.string().nullable(),
	country: z.string().nullable(),
	unit: z.string().nullable(),
	quantity: z.string().nullable(),
	invoice_no: z.string().nullable(),
	invoice_date: z.string().nullable(),
	invoice_amount: z.string().nullable(),
	trans_doc: z.string().nullable(),
	port: z.string().nullable(),
	signatory: z.string().nullable(),
	status: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
