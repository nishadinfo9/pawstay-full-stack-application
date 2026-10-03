import db from "@/lib/db";
import { pets, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { CreatePetRepositoryInput } from "./petTypes";


export async function createPetRepository(
    data: CreatePetRepositoryInput
) {
    return db
        .insert(pets)
        .values({
            user_id: data.userId,
            petName: data.petName,
            type: data.type,
            breed: data.breed,
            age: data.age,
            gender: data.gender,
            image: data.image,
            notes: data.notes,
        })
        .returning();
}

export async function findPetsByUserIdRepository(
    userId: string
) {
    return db
        .select({
            id:pets.id,
            owner: users.fullName,
            petName: pets.petName,
            type: pets.type,
            breed: pets.breed,
            age: pets.age,
            gender: pets.gender,
            image: pets.image,
        })
        .from(pets)
        .where(eq(pets.user_id, userId))
        .innerJoin(users, eq(pets.user_id, users.id))
        
}

export async function findPetByIdRepository(
    petId: string
) {
    const result = await db
        .select()
        .from(pets)
        .where(eq(pets.id, petId))
        .limit(1);

    return result[0] ?? null;
}