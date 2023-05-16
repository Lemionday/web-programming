import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ProSidebarProvider } from 'react-pro-sidebar';
import SideBarLayout from '../../SideBarLayout';

export default function ProtectedLayout() {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div>
            <SideBarLayout>
                <Outlet />
            </SideBarLayout>
        </div>
    );
}