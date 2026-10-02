import { findUserByEmail } from "./profileRepository";


export const getProfile = async (email: string) => {
    const user = await findUserByEmail(email)
    return user;
}