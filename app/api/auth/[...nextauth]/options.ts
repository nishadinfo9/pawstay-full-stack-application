import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import { isPasswordCorrect } from "@/features/auth/password.service";
import { findUserByEmail } from "@/features/auth/auth.repository";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
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

                console.log('user', user)

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
        async jwt({ token, user, account }) {
            console.log('account', account)
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            console.log('session', session)
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
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