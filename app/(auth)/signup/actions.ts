"use server";

import { registerUser } from "@/features/auth/auth.service";
import { SignUpUserInput } from "@/features/auth/auth.types";
import { signupSchema } from "@/features/auth/auth.validation";

export async function signupAction(data: SignUpUserInput) {
    const validationResult = signupSchema.safeParse(data);

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