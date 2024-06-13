import { z } from "zod";

const slotValidationSchema = z.object({
    room: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid start time format'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid end time format'),
    isBooked: z.boolean(),
});

export const SlotValidation = {
    slotValidationSchema,
}
