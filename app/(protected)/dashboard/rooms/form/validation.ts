import z from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long"),
});

export type FormSchema = z.infer<typeof formSchema>;