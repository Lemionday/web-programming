import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomeLayout() {
    const auth = useAuth();

    if (auth.session.token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}