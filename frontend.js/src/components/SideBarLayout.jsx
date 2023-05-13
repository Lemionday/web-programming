import React from 'react';

import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function SideBarLayout() {
    const { collapseSidebar } = useProSidebar();

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => { collapseSidebar(); }}
                        style={{ textAlign: "right" }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>
                    <MenuItem component={<Link to="/dashboard" />}> Dashboard</MenuItem>
                    <MenuItem component={<Link to="/register" />}> Create new Account</MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <Outlet />
            </main>
        </div >
    );
}