import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import { isPasswordCorrect } from "@/features/auth/password.service";
import { createUser, findUserByEmail } from "@/features/auth/auth.repository";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        ),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials,) {
                console.log({ credentials })
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await findUserByEmail(credentials.email)

                if (!user) {
                    return null;
                }

                const isPasswordValid = await isPasswordCorrect(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await findUserByEmail(user.email as string);
                if (!existingUser) {
                    await createUser({
                        fullName: user.name as string,
                        email: user.email as string,
                        password: 'google password',
                        avatar: user.image as string,
                        provider: account.provider,
                        externalId: user.id,
                    });
                }
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                const dbUser = await findUserByEmail(user.email as string);
                if (dbUser) {
                    token.id = dbUser.id
                    token.email = dbUser.email
                    token.role = dbUser.role
                    token.fullName = dbUser.fullName
                }
            }
            return token;
        },

        async session({ session, token }) {
                console.log("SESSION CALLBACK TOKEN:", token);
            session.user = {
                id: token.id,
                email: token.email,
                role: token.role as "admin" | "customer",
                fullName: token.fullName,
            };
             console.log("SESSION CALLBACK RESULT:", session);
            return session;
        },
    },

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: 'jwt',
    },


    secret: process.env.NEXTAUTH_SECRET as string,
}