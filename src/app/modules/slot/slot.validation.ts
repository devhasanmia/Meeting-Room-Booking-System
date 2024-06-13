import { z } from "zod";

const slotValidationSchema = z
  .object({
    room: z.string(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Invalid start time format (HH:MM)"),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Invalid end time format (HH:MM)"),
    isBooked: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [endHour, endMinute] = data.endTime.split(":").map(Number);
      return (
        startHour < endHour ||
        (startHour === endHour && startMinute < endMinute)
      );
    },
    {
      message: "End time must be later than start time",
      path: ["endTime"],
    }
  );

export const SlotValidation = {
  slotValidationSchema,
};
