"use server";

import { formSchema } from "./validation";


export async function submitForm(formData: FormData) {
    const data = {
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    };

    console.log(data)

    const result = formSchema.safeParse(data)

    console.log('result', result)

    if (!result.success) {
        return { error: "Invalid form data" };
    }

    return { success: true };

}