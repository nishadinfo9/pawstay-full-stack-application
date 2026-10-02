'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getProfile } from "@/features/profiles/profileService";
import { Profile } from "@/features/profiles/profileType";
import { getServerSession } from "next-auth";

export async function profileActions():Promise<Profile> {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
        throw new Error("Unauthorized")
    }

    const profile = await getProfile(session?.user.email);
    return profile;
}

