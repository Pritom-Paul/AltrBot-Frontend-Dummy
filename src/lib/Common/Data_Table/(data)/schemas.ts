import { z } from "zod";

// Exp Issuance Schema
export const expIssuanceSchema = z.object({
    lc_no: z.string().nullable(),
    commodity: z.string().nullable().optional(),
    incoterm: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    unit: z.string().nullable().optional(),
    quantity: z.string().nullable().optional(),
    invoice_no: z.string().nullable().optional(),
    invoice_date: z.string().nullable().optional(),
    invoice_amount: z.string().nullable().optional(),
    trans_doc: z.string().nullable().optional(),
    port: z.string().nullable().optional(),
    signatory: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
});

export type ExpIssuance = z.infer<typeof expIssuanceSchema>;

// Exp Download Schema
export const expDownloadSchema = z.object({
    ad_code: z.string().nullable().optional(),
    exp_serial: z.string().nullable().optional(),
    exp_year: z.string().nullable().optional(),
    invoice_no: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
});

export type ExpDownload = z.infer<typeof expDownloadSchema>;

// FCR Schema
export const fcrSchema = z.object({
    invoice_no: z.string().nullable().optional(),
    invoice_date: z.string().nullable().optional(),
    exporters_ref: z.string().nullable().optional(),
    hs_code: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    composition: z.string().nullable().optional(),
    quantity: z.string().nullable().optional(),
    po_no: z.string().nullable().optional(),
    country_iso: z.string().nullable().optional(),
   status: z.string().nullable().optional()
});

export type FCR = z.infer<typeof fcrSchema>;


// Booking Schema
export const bookingSchema = z.object({
    po_no: z.string().nullable().optional(),
    order_no: z.string().nullable().optional(),
    item: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    country_iso: z.string().nullable().optional(),
    country_name: z.string().nullable().optional(),
    country_code: z.string().nullable().optional(),
    no_of_pcs_per_pack: z.string().nullable().optional(),
    quantity_in_pack: z.string().nullable().optional(),
    quantity_in_pcs: z.string().nullable().optional(),
    quantity: z.string().nullable().optional(),
    invoice_average_price: z.string().nullable().optional(),
    currency_iso: z.string().nullable().optional(),
    currency_name: z.string().nullable().optional(),
    currency_code: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    delivery_time: z.string().nullable().optional(),
    s_c_no: z.string().nullable().optional(),
    lc_no: z.string().nullable().optional(),
    bin: z.string().nullable().optional(),
    ad_code: z.string().nullable().optional(),
    commodity_code: z.string().nullable().optional(),
    incoterm: z.string().nullable().optional(),
    unit_code: z.string().nullable().optional(),
    unit: z.string().nullable().optional(),
    area_code: z.string().nullable().optional(),
    invoice_no: z.string().nullable().optional(),
    invoice_date: z.string().nullable().optional(),
    invoice_amount: z.string().nullable().optional(),
    cmt_amount: z.string().nullable().optional(),
    freight: z.string().nullable().optional(),
    insurance: z.string().nullable().optional(),
    other_charges: z.string().nullable().optional(),
    carrier_vessel: z.string().nullable().optional(),
    dest_port: z.string().optional(),
    trans_doc_type: z.string().nullable().optional(),
    trans_doc_no: z.string().nullable().optional(),
    trans_doc_date: z.string().nullable().optional(),
    ship_port: z.string().nullable().optional(),
    sector: z.string().nullable().optional(),
    fob_amount: z.string().nullable().optional(),
    signatory_id: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
    bank_ref_no: z.string().nullable().optional(),
    exp_serial: z.string().nullable().optional(),
    exp_year: z.string().nullable().optional(),
    full_exp: z.string().nullable().optional(),
    issue_date: z.string().nullable().optional(),
    exp_status: z.string().nullable().optional(),
    booking_status: z.string().nullable().optional(),
    request_id: z.string().nullable().optional(),
    summary_marks: z.string().nullable().optional(),
    summary_desc: z.string().nullable().optional(),
    no_of_pcs_in_pack: z.string().nullable().optional(),
    status: z.string().nullable().optional(),

    purchaseorderbooking: z.object({
        id: z.number().nullable(),
        summary_marks: z.string().nullable().optional(),
        summary_desc: z.string().nullable().optional(),
        no_of_pcs_in_pack: z.string().nullable().optional(),
        status: z.string().nullable().optional()
    }).nullable().optional()

});

export type Booking = z.infer<typeof bookingSchema>;


// Map to associate schema types with their respective schemas
const schemaMap = new Map<string, z.ZodSchema>([
    ['exp_issuance', expIssuanceSchema],
    ['exp_download', expDownloadSchema],
    ['fcr', fcrSchema],
    ['booking', bookingSchema]
]);

// Function to get schema based on type using the map
export function getSchema(type: string): z.ZodSchema {
    const schema = schemaMap.get(type);
    if (!schema) {
        throw new Error(`Unknown schema type: ${type}`);
    }
    return schema;
}
