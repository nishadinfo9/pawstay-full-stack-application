import db from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"
import { signupValidationSchema } from "@/app/(auth)/signup/_components/signupValidation";
import { SignupUserType } from "./authType";

export const SignUp = async (reqData: SignupUserType) => {

    const result = signupValidationSchema.safeParse(reqData);

    if (!result.success) {
        return Response.json(
            { message: result.error.message || 'Invalid input' },
            { status: 409 }
        );
    }

    const existingUser = await findUserByEmail(result.data.email)

    if (existingUser) {
        return Response.json(
            { error: "User already exists" },
            { status: 409 }
        );
    }

    const hashedPassword = await hashPassword(result.data.password)

    await db.insert(users).values({
        fullName: result.data.fullName,
        email: result.data.email,
        password: hashedPassword,
        provider: result.data.provider || "credentials",
        externalId: result.data.externalId || null,
        role: "customer",
    });
}

const findUserByEmail = async (email: string) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    return user
}

const SALT_ROUNDS = 10;
const hashPassword = async (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};