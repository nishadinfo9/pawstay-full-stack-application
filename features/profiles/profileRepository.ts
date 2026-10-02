import db from "@/lib/db";
import { users } from "@/lib/schema/users";
import { eq } from "drizzle-orm";

//find user based on role and id
export async function findUserByEmail(email: string) {
    const user = await db.select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        avatar: users.avatar || '',
    }).from(users).where(eq(users.email, email)).limit(1);
    return user[0];
}