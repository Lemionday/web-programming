export enum Role {
    UserUnauthorized = 0,
    UserFromRegistryCenter,
    UserFromMainCenter,
    Admin
}

export interface Account {
    username: string;

    password?: string;

    avatar?: number;

    role?: Role;

    center?: string;
}

export interface Session {
    token: string;

    account?: Account
};