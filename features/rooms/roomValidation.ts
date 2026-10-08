import { z } from "zod";

export const createRoomSchema = z.object({
  roomName: z
    .string()
    .trim()
    .min(1, "Room name is required")
    .max(255, "Room name must be less than 255 characters"),

  type: z
    .string()
    .trim()
    .min(1, "Room type is required")
    .max(100, "Room type must be less than 100 characters"),

  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine(
      (value) => !Number.isNaN(Number(value)),
      "Price must be a valid number"
    )
    .refine(
      (value) => Number(value) > 0,
      "Price must be greater than 0"
    ),

  isAvailable: z.boolean(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;