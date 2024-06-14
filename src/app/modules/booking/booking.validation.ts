import { z } from "zod";

const create = z.object({
  room: z.string().min(1, "Room ID is required"),
  slots: z.array(
    z.string({
      invalid_type_error: "Slot ID must be a string",
      required_error: "Slot ID is required",
    })
  ),
  user: z
    .string({
      invalid_type_error: "User ID must be a string",
      required_error: "User ID is required",
    })
    .min(1),
  date: z.date().default(() => new Date()),
  isDeleted: z.boolean().optional().default(false),
  isConfirmed: z
    .enum(["confirmed", "unconfirmed", "canceled"])
    .default("unconfirmed"),
  totalAmount: z
    .number()
    .nonnegative("Total amount must be a non-negative number")
    .default(0),
});

const update = z.object({
  room: z.string().min(1, { message: "Room ID is required" }).optional(),
  slots: z
    .array(
      z
        .string({
          invalid_type_error: "Slot ID must be a string",
          required_error: "Slot ID is required",
        })
        .min(1)
    )
    .optional(),
  user: z
    .string({
      invalid_type_error: "User ID must be a string",
      required_error: "User ID is required",
    })
    .min(1)
    .optional(),
  date: z
    .date()
    .default(() => new Date())
    .optional(),
  isDeleted: z.boolean().default(false).optional(),
  isConfirmed: z
    .enum(["confirmed", "unconfirmed", "canceled"])
    .default("unconfirmed")
    .optional(),
  totalAmount: z
    .number()
    .nonnegative({ message: "Total amount must be a non-negative number" })
    .default(0)
    .optional(),
});

export const BookingValidator = {
  create,
  update,
};
