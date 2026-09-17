import * as z from "zod"

export const signupValidationSchema = z.object({
    fullName: z.string({ message: "Full name is required" }).min(1, { message: "Full name is required" }),
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" })
})