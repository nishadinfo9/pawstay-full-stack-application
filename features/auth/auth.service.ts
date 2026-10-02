import { createUser, findUserByEmail } from "./auth.repository";
import { authenticateUserInput, CreateUserInput } from "./auth.types";
import { hashPassword, isPasswordCorrect } from "./password.service";

export const registerUser = async (data: CreateUserInput) => {
    console.log('data', data)
    const existingUser = await findUserByEmail(data.email);
    console.log('existingUser', existingUser)
    // যদি user already exists → error
    if (existingUser) {
        throw new Error("User already exists");
    }

    // password hash করো
    const hashedPassword = await hashPassword(data.password);

    // createUser() call করো
    const newUser = await createUser({ ...data, password: hashedPassword });

    // created user return করো
    return newUser[0];
}

export async function authenticateUser(data: authenticateUserInput) {
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