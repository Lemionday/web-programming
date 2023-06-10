export enum Role {
    UserUnauthorized = 0,
    UserFromRegistryCenter,
    UserFromMainCenter,
    Admin
}

export type Account = {
    username: string;
    password?: string;
    avatar?: number;
    role?: Role;
    center?: string;
}

export function RoleToString(role: Role | undefined) {
    switch (role) {
        case undefined:
            return "Người dùng chưa được xác thực"
        case Role.UserUnauthorized:
            return "Người dùng chưa được xác thực"
        case Role.UserFromMainCenter:
            return "Nhân viên cục đăng kiểm"
        case Role.UserFromRegistryCenter:
            return `Nhân viên trung tâm đăng kiểm`
        case Role.Admin:
            return "Quản trị viên"
        default:
            return "Tài khoản không xác định"
    }
}

export interface Session {
    token: string;
    account?: Account
}