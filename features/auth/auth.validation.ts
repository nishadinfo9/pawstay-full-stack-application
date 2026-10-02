import * as z from "zod";

export const signupSchema = z.object({
  fullName: z.string({ message: "Full name is required" }).min(1, { message: "Full name is required" }),
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;




export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;




export const socialSchema = z.object({
  fullName: z.string({ message: "Full name is required" }).min(1, { message: "Full name is required" }),
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
  provider: z.enum(["credentials", "google"], { message: "Invalid provider" }),
  externalId: z.string(),
});

export type SocialSchema = z.infer<typeof socialSchema>;