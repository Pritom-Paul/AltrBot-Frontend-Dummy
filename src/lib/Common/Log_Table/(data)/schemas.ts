import { z } from "zod";


export const logSchema = z.object({
    bot: z.string().nullable(),
    activity_type: z.string().nullable(),
    activity: z.string().nullable(),
    activity_time: z.string().nullable(),
});
export type Log = z.infer<typeof logSchema>;
// Exp Issuance Schema
export const expIssuanceSchema = z.object({
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

export type ExpIssuance = z.infer<typeof expIssuanceSchema>;

// Exp Download Schema
export const expDownloadSchema = z.object({
    ad_code: z.string().nullable(),
    exp_serial: z.string().nullable(),
    exp_year: z.string().nullable(),
    invoice_no: z.string().nullable(),
    status: z.string().nullable(),
});

export type ExpDownload = z.infer<typeof expDownloadSchema>;

// Map to associate schema types with their respective schemas
const schemaMap = new Map<string, z.ZodSchema>([
    ['logs', logSchema],
    ['exp_issuance', expIssuanceSchema],
    ['exp_download', expDownloadSchema],
]);

// Function to get schema based on type using the map
export function getSchema(type: string): z.ZodSchema {
    const schema = schemaMap.get(type);
    if (!schema) {
        throw new Error(`Unknown schema type: ${type}`);
    }
    return schema;
}
