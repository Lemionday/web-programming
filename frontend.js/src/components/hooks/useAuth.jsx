import React, { createContext, useContext, useMemo, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { config } from '../../conf/config';

let AuthContext = createContext();

async function loginAPI(accountData) {
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

        const resJson = await result.json();
        return resJson["token"];
    } catch (err) {
        console.log(err);
    }
}

export function AuthProvider({ children }) {
    // const [token, setToken] = useState(null);
    const [token, setToken] = useState(1);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (userData) => {
        const resToken = await loginAPI(userData);
        setToken(resToken);
        navigate("/dashboard");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setToken(null);
        navigate("/", { replace: true });
    };

    const value = { token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
};