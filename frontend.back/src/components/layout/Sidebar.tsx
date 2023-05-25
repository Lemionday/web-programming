import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import EmojiTransportationTwoToneIcon from '@mui/icons-material/EmojiTransportationTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses, useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../models/Roles';

export default function SideBar() {
    const { collapseSidebar } = useProSidebar();
    const { session } = useAuth();
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                backgroundColor="#8fd6e8"
                rtl={false}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        alignItems: 'center',
                        color: '#03131a'
                    }
                }}>
                <Menu >
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => { collapseSidebar(); }}
                        rootStyles={{
                            textAlign: "right",
                            color: '#03131a'
                        }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>
                    {session.role >= Role.UserFromMainCenter ?
                        (<>
                            <MenuItem icon={<SpaceDashboardTwoToneIcon />} component={<Link to="/dashboard" />}> Trang chủ</MenuItem>
                            {session.role === Role.Admin} ?
                            <SubMenu icon={<GroupTwoToneIcon />} label="Accounts" >
                                <MenuItem
                                    icon={<PersonAddAltTwoToneIcon />}
                                    component={<Link to="/register" />}
                                >Tạo tài khoản mới</MenuItem>
                                <MenuItem icon={<AccountTreeTwoToneIcon />}
                                    component={<Link to="/accounts" />}
                                >Danh sách tài khoản</MenuItem>
                            </SubMenu> : <></>
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
            <main style={{ marginLeft: '5rem' }}>
                <Outlet />
            </main>
        </div>
    );
}