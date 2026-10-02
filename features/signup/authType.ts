export type Role = "customer" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  provider: string | null;
  externalId: string | null;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignupUserType {
  fullName: string;
  email: string;
  password: string
  role: string
  avatar?: string
  provider?: string
  externalId?: string
}