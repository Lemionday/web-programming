import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { config } from '../../conf/config';
import { Account, Session } from '../models/Session';
import { useLocalStorage } from './useLocalStorage';

async function loginAPI(accountData: Account) {
    try {
        // console.log(accountData)
        const result = await fetch(`${config.baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: accountData.username,
                password: accountData.password,
            }),
        });

        if (!result.ok) {
            console.log(result);
            alert(result);
            return;
        }

        return await result.json();
    } catch (err) {
        console.log(err);
    }
}

interface AuthContextType {
    session: Session;
    login: (user: Account) => void;
    logout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useLocalStorage<Session>("session", { token: "", account: undefined });
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (userData: Account) => {
        const res = await loginAPI(userData);
        setSession({ token: res.token, account: res.account });
        console.log(session);
        navigate("/dashboard");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setSession({ token: "", account: undefined });
        navigate("/", { replace: true });
    };

    const value = { session, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
};