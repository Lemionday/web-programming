import React from 'react';
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

export function AuthLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}