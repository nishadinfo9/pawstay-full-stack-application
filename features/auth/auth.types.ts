export interface SignUpUserInput {
    fullName: string;
    email: string;
    password: string;
    provider?: 'google' | 'credentials';
    externalId?: string;
    avatar?: string;
}

export interface loginUserInput {
    email: string;
    password: string;
}
