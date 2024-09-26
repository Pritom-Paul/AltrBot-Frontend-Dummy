import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	bot: z.string().nullable(),
	activity_type: z.string().nullable(),
	activity: z.string().nullable(),
	activity_time: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
