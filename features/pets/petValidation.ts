import { z } from "zod";

export const petSchema = z.object({
  petName: z
    .string()
    .min(1, "Pet name is required")
    .max(255, "Pet name must be less than 255 characters"),

  type: z
    .string()
    .min(1, "Pet type is required")
    .max(100, "Pet type must be less than 100 characters"),

  breed: z
    .string()
    .min(1, "Breed is required")
    .max(100, "Breed must be less than 100 characters"),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(0, "Age cannot be negative"),

  gender: z
    .string()
    .min(1, "Gender is required")
    .max(50, "Gender must be less than 50 characters"),

  image: z
    .string()
    .optional(),

  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;