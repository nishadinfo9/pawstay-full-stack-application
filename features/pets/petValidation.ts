import { z } from "zod";

export const petSchema = z.object({
  petName: z
    .string()
    .min(3, "Pet name at least 3 character")
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
    .number({
      error: "Age is required",
    })
    .min(1, "Age must be at least 1"),

  gender: z
    .enum(["male", "female"], {
      error: "Gender is required",
    }),

  image: z
    .string()
    .optional(),

  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;