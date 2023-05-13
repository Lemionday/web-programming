import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { config } from '../../conf/config';
import { AccountDataType } from '../models/Account';
import { Session } from 'inspector';
import { SessionStatus } from '../models/SessionStatus';
import { Role } from '../models/Roles';

async function loginAPI(accountData: AccountDataType) {
    try {
        const result = await fetch(`${config.baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
        });

        if (!result.ok) {
            console.log(result);
            alert(result);
            return;
        }

        // const resJson = await result.json();
        // return resJson["token"];
        return await result.json();
    } catch (err) {
        console.log(err);
    }
}

interface AuthContextType {
    session: SessionStatus;
    login: (user: AccountDataType) => void;
    logout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // const [token, setToken] = useState(null);
    // const [token, setToken] = useState<string>("");
    const [session, setSession] = useState<SessionStatus>({ token: "1", role: Role.UserFromMainCenter });
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (userData: AccountDataType) => {
        const resToken = await loginAPI(userData);
        setSession(resToken);
        navigate("/dashboard");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setSession((sessionStatus) => ({ token: "", role: sessionStatus.role }));
        navigate("/", { replace: true });
    };

    const value = { session, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
};