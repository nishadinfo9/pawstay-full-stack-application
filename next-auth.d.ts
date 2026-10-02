import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    role: "admin" | "customer";
    fullName: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      role: "admin" | "customer";
      fullName: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "admin" | "customer";
    fullName: string;
  }
}