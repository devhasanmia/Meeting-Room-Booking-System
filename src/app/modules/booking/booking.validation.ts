import { z } from "zod";
const create = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD",
  }),
  slots: z.array(z.string()),
  room: z.string({
    invalid_type_error: "Room ID must be a string",
    required_error: "Room ID is required",
  }),
  user: z.string({
    invalid_type_error: "User ID must be a string",
    required_error: "User ID is required",
  }),
  totalAmount: z.number().default(0),
  isConfirmed: z
    .enum(["confirmed", "unconfirmed", "canceled"])
    .default("unconfirmed"),
  isDeleted: z.boolean().default(false),
});

const update = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    })
    .optional(),
  slots: z
    .array(
      z.string({
        invalid_type_error: "Slot ID must be a string",
        required_error: "Slot ID is required",
      })
    )
    .optional(),
  room: z
    .string({
      invalid_type_error: "Room ID must be a string",
      required_error: "Room ID is required",
    })
    .optional(),
  user: z
    .string({
      invalid_type_error: "User ID must be a string",
      required_error: "User ID is required",
    })
    .optional(),
  totalAmount: z.number().optional(),
  isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  isDeleted: z.boolean().optional(),
});

export const BookingValidator = {
  create,
  update,
};
