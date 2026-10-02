import { createUser, findUserByEmail } from "./auth.repository";
import { SignUpUserInput } from "./auth.types";
import { LoginSchema } from "./auth.validation";
import { hashPassword, isPasswordCorrect } from "./password.service";

export const registerUser = async (data: SignUpUserInput) => {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await createUser({ ...data, password: hashedPassword });

    return newUser[0];
}

export async function authenticateUser(data: LoginSchema) {
    const user = await findUserByEmail(data.email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await isPasswordCorrect(data.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}
