// findUserByEmail()
// findUserById()
// createUser()
// updateUser()

import db from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { CreateUserInput } from "./auth.types";

export const findUserByEmail = async (email: string) => {
    console.log('email', email)
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return user;
}

export async function findUserById(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
}

export async function createUser(user: CreateUserInput) {
    return db.insert(users).values(user).returning();
}

export async function updateUser(id: number, user: Partial<CreateUserInput>) {
    return db.update(users).set(user).where(eq(users.id, id)).returning();
}