import { z } from "zod";

const userValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  phone: z.string({
    invalid_type_error: "Phone must be a string",
    required_error: "Phone is required",
  }),

  address: z.string({
    invalid_type_error: "Address must be a string",
    required_error: "Address is required",
  }),
  role: z.enum(["user", "admin"]).default("user"),
});

export const validateUser = {
  create: userValidation,
};
