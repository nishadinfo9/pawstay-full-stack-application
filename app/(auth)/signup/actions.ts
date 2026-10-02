"use server";

import { registerUser } from "@/features/auth/auth.service";
import { CreateUserInput } from "@/features/auth/auth.types";
import { signupSchema } from "@/features/auth/auth.validation";

export async function signupAction(data: CreateUserInput) {
    const validationResult =await signupSchema.safeParse(data);

    console.log('validationResult', validationResult)

    if (!validationResult.success) {
        throw new Error("Invalid input data");
    }

    const user = await registerUser(validationResult.data);

    return {
        user,
        success: true,
        message: "User registered successfully",
    };
}