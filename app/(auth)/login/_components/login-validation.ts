import * as z from "zod"

export const loginValidationSchema = z.object({
  email: z.string({message: 'Email is required'}).email(),
  password: z.string({message: 'Password is required'}).min(6).max(100),
})

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>
