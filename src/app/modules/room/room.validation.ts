import { z } from "zod";

const create = z.object({
  name: z
    .string({
      invalid_type_error: "Room name must be a string",
      required_error: "Room name is required",
    })
    .min(1, "Room name must be at least 1 character long"),
  roomNo: z
    .number({
      invalid_type_error: "Room number must be a number",
      required_error: "Room number is required",
    })
    .int()
    .positive("Room number must be a positive integer"),
  floorNo: z
    .number({
      invalid_type_error: "Floor number must be a number",
      required_error: "Floor number is required",
    })
    .int()
    .positive("Floor number must be a positive integer"),
  capacity: z
    .number({
      invalid_type_error: "Capacity must be a number",
      required_error: "Capacity is required",
    })
    .int()
    .positive("Capacity must be a positive integer"),
  pricePerSlot: z
    .number({
      invalid_type_error: "Price per slot must be a number",
      required_error: "Price per slot is required",
    })
    .positive("Price per slot must be a positive number"),
  amenities: z.array(
    z
      .string({
        invalid_type_error: "Amenity name must be a string",
        required_error: "Amenity name is required",
      })
      .min(1, "Amenity name is required")
  ),
  isDeleted: z.boolean().optional().default(false),
});

const update = z.object({
  name: z
    .string({
      invalid_type_error: "Room name must be a string",
      required_error: "Room name is required",
    })
    .min(1, "Room name must be at least 1 character long")
    .optional(),
  roomNo: z
    .number({
      invalid_type_error: "Room number must be a number",
      required_error: "Room number is required",
    })
    .int()
    .positive("Room number must be a positive integer")
    .optional(),
  floorNo: z
    .number({
      invalid_type_error: "Floor number must be a number",
      required_error: "Floor number is required",
    })
    .int()
    .positive("Floor number must be a positive integer")
    .optional(),
  capacity: z
    .number({
      invalid_type_error: "Capacity must be a number",
      required_error: "Capacity is required",
    })
    .int()
    .positive("Capacity must be a positive integer")
    .optional(),
  pricePerSlot: z
    .number({
      invalid_type_error: "Price per slot must be a number",
      required_error: "Price per slot is required",
    })
    .positive("Price per slot must be a positive number")
    .optional(),
  amenities: z
    .array(
      z
        .string({
          invalid_type_error: "Amenity name must be a string",
          required_error: "Amenity name is required",
        })
        .min(1, "Amenity name is required")
    )
    .optional(),
  isDeleted: z.boolean().optional().default(false),
});

export const RoomValidation = {
  create,
  update,
};
