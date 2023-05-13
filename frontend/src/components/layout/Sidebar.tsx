import React from 'react';

import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ToggleDarkModeButton from '../buttons/ToggleDarkMode';
import { useColorScheme } from '../hooks/useColorScheme';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import EmojiTransportationTwoToneIcon from '@mui/icons-material/EmojiTransportationTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../models/Roles';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';

export default function SideBar() {
    const { collapseSidebar } = useProSidebar();
    const { session } = useAuth();
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: 'green',
                        alignItems: 'center',
                    }
                }}>
                <Menu >
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => { collapseSidebar(); }}
                        rootStyles={{
                            textAlign: "right",
                        }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>
                    {session.role === Role.UserFromMainCenter ?
                        (<>
                            <MenuItem icon={<SpaceDashboardTwoToneIcon />} component={<Link to="/dashboard" />}> Trang chủ</MenuItem>
                            <SubMenu icon={<GroupTwoToneIcon />} label="Accounts">
                                <MenuItem
                                    icon={<PersonAddAltTwoToneIcon />}
                                    component={<Link to="/register" />}
                                >Tạo tài khoản mới</MenuItem>
                                <MenuItem icon={<AccountTreeTwoToneIcon />}
                                    component={<Link to="/accounts" />}
                                >Danh sách tài khoản</MenuItem>
                            </SubMenu>
                            <SubMenu icon={<EmojiTransportationTwoToneIcon />} label="Cars Registry">
                                <MenuItem
                                    icon={<LeaderboardTwoToneIcon />}
                                    component={<Link to="/statistics" />} >
                                    Thống kê
                                </MenuItem>
                                <MenuItem
                                    icon={<TrendingUpTwoToneIcon />}
                                    component={<Link to="/predictions" />}>
                                    Dự đoán
                                </MenuItem>
                            </SubMenu>
                        </>) : (
                            <MenuItem icon={<AppRegistrationTwoToneIcon />} component={<Link to="/publish_registry" />}>Cấp giấy đăng kiểm</MenuItem>

                        )
                    }
                </Menu>
            </Sidebar>
            <main>
                <Outlet />
            </main>
        </div>
    );
}