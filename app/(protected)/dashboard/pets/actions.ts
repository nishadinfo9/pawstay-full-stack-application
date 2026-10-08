"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { findPetsByUserIdRepository } from "@/features/pets/petRepository";
import { createPetService } from "@/features/pets/petService";
import { petSchema } from "@/features/pets/petValidation";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getMyPetAction() {
    const session = await getServerSession(authOptions)
    if (!session?.user.id) throw new Error("Unauthorized")

    return findPetsByUserIdRepository(session.user.id);
}


export async function createPetAction(
    formData: FormData
) {
    const session = await getServerSession(authOptions)
    if (!session?.user.id) throw new Error("Unauthorized");

    const data = {
        petName: formData.get("petName"),
        type: formData.get("type"),
        breed: formData.get("breed"),
        age: Number(formData.get("age")),
        gender: formData.get("gender"),
        image: formData.get("image") || undefined,
        notes: formData.get("notes") || undefined,
    };

    const result = petSchema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };

    }
    await createPetService({
        userId: session.user.id,
        ...result.data,
    });

    revalidatePath('/dashboard/pets')

    return {
        success: true,
        errors: {},
    };
}