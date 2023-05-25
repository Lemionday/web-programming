import { Role } from "./Roles";

export interface SessionStatus {
    token: string,
    role: Role
};