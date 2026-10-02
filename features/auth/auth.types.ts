export interface CreateUserInput {
    fullName: string;
    email: string;
    password: string;
    provider?: string;
    externalId?: string;
}

export interface authenticateUserInput {
    email: string;
    password: string;
}