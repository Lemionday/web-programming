import {
    HomeIcon, IdentificationIcon, ListBulletIcon, PresentationChartBarIcon,
    PresentationChartLineIcon,
    TableCellsIcon,
    UserIcon,
    UserPlusIcon
} from "@heroicons/react/24/outline";
import {
    PowerIcon
} from "@heroicons/react/24/solid";
import {
    Accordion, AccordionBody, AccordionHeader, Avatar, Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography
} from "@material-tailwind/react";
import React, { ElementType } from "react";


import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { config } from "../../conf/config";
import { useAuth } from "../hooks/useAuth";
import { Role } from "../models/Session";

type ItemProps = {
    Icon: ElementType
    iconProps: {
        strokeWidth: number
    }
    name: string
    href?: string
}

function ItemList({ Icon, iconProps, href, name }: ItemProps) {
    const navigate = useNavigate();
    return (
        <ListItem onClick={() => {
            if (href !== undefined) navigate(href)
        }}>
            <ListItemPrefix>
                <Icon className={`h-5 w-5 stroke-${iconProps.strokeWidth}`} />
            </ListItemPrefix>
            {name}
        </ListItem>
    )
}

function NestedItemList({ children }: { children: ItemProps[] }) {
    return (
        <List className="p-0 ms-4">
            {children.map((child) => (<ItemList key={child.name} Icon={child.Icon} iconProps={child.iconProps} name={child.name} href={child.href} />))}
        </List>
    )
}

type AccordionSidebarProps = {
    open: number,
    open_idx: number,
    handleOpen: (value: number) => void,
    children: ItemProps[],
    parent: ItemProps
}

function AccordionSidebar({ open, open_idx, handleOpen, parent, children }: AccordionSidebarProps) {
    return (
        <Accordion
            open={open === open_idx}
            icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === open_idx ? "rotate-180" : ""}`}
                />
            }>
            <ListItem className="p-0" selected={open === open_idx}>
                <AccordionHeader onClick={() => handleOpen(open_idx)} className="border-b-0 p-3">
                    <ListItemPrefix>
                        <parent.Icon className="h-7 w-7" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                        {parent.name}
                    </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <NestedItemList children={children} />
            </AccordionBody>
        </Accordion>
    )
}

export default function SideBar() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const car_register = {
        parent: {
            name: "Đăng kiểm xe",
            Icon: IdentificationIcon,
            iconProps: {
                strokeWidth: 3
            }
        },
        children: [
            {
                Icon: ListBulletIcon,
                iconProps: {
                    strokeWidth: 2
                },
                href: "/car/listall",
                name: "Danh sách toàn bộ xe"
            },
            {
                Icon: PresentationChartBarIcon,
                iconProps: {
                    strokeWidth: 2
                },
                href: "/car/statistics/registered",
                name: "Thống kê xe đăng kiểm"
            },
            {
                Icon: PresentationChartLineIcon,
                iconProps: {
                    strokeWidth: 2
                },
                href: "/car/statistics/invalidated",
                name: "Thống kê xe hết hạn đăng kiểm"
            }
        ]
    }

    const accounts = {
        parent: {
            name: "Tài khoản",
            Icon: UserIcon,
            iconProps: {
                strokeWidth: 3
            }
        },
        children: [{
            Icon: UserPlusIcon,
            iconProps: {
                strokeWidth: 2
            },
            href: "/account/register",
            name: "Tạo tài khoản"
        },
        {
            Icon: TableCellsIcon,
            iconProps: {
                strokeWidth: 2
            },
            href: "/accounts",
            name: "Danh sách tài khoản"
        }
        ]
    }
    return (
        <div className="flex flex-row">
            <Card className="ml-2 my-2 h-[calc(100vh-1rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="flex items-center mx-auto">
                    <Avatar
                        src={`${config.publicUrl}/avatar/${String(auth.session.account?.avatar)}.svg`}
                        withBorder={true}
                        color="green"
                        className="p-1"
                        size="xl"
                        alt="avatar" />
                    <div className="ms-2">
                        <Typography variant="h6">{auth.session.account?.username}</Typography>
                        <Typography variant="small" color="gray" className="font-normal">{auth.session.account?.center}</Typography>
                    </div>
                </div>

                <List>
                    <ListItem onClick={() => navigate("/dashboard")}>
                        <ListItemPrefix>
                            <HomeIcon className={`h-7 w-7 stroke-2`} />
                        </ListItemPrefix>
                        Trang chủ
                    </ListItem>

                    <AccordionSidebar
                        parent={car_register.parent}
                        children={car_register.children}
                        open={open} open_idx={1}
                        handleOpen={handleOpen} />

                    {auth.session.account?.role! >= Role.UserFromMainCenter ?
                        <AccordionSidebar
                            parent={accounts.parent}
                            children={accounts.children}
                            open={open}
                            open_idx={2}
                            handleOpen={handleOpen} />
                        : null
                    }

                    {/* <Accordion
                        open={open === 3}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <CogIcon className="h-7 w-7" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Cài đặt
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0 ms-4">
                                <ListItem>
                                    <ListItemPrefix>
                                        <Switch defaultChecked={isDark} onClick={() => setIsDark(!isDark)} />
                                    </ListItemPrefix>
                                    Chế độ tối
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion> */}

                    <hr className="my-2 border-blue-gray-50" />
                    {/* <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Inbox
                        <ListItemSuffix>
                            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem> */}
                    <ListItem onClick={() => { auth.logout() }}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Đăng xuất
                    </ListItem>
                </List >
            </Card >
            <main className="flex-1 my-2">
                <Outlet />
            </main>
        </div>
    );
}