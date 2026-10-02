import db from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {  SignUpUserInput } from "./auth.types";

export const findUserByEmail = async (email: string) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return user;
}

export async function findUserById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
}

export async function createUser(user: SignUpUserInput) {
    return db.insert(users).values(user).returning()
}


export async function updateUser(id: string, user: Partial<SignUpUserInput>) {
    return db.update(users).set(user).where(eq(users.id, id)).returning();
}