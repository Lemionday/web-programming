import { TrashIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/useAuth';
import { Account, Role, RoleToString } from '../components/models/Session';
import { config } from '../conf/config';

function AvatarAndUsername({ username, avatar }: { username: string, avatar?: number }) {
    return (
        <div className="flex items-center gap-3">
            <Avatar
                src={`./src/assets/avatar/${String(avatar)}.svg`}
                alt={username} size="sm" />
            <div className="flex flex-col">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {username}
                </Typography>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                >
                    {`${username}@carres.com`}
                </Typography>
            </div>
        </div>
    );
}

function DeleteAccount({ username }: { username: string }) {
    return (
        <Tooltip content="Edit User">
            <IconButton variant="text" color="red" onClick={() => console.log(username)}>
                <TrashIcon className="h-4 w-4" />
            </IconButton>
        </Tooltip>
    )
}

const columnHelper = createColumnHelper<Account>();

const columns = [
    columnHelper.accessor(row => row.username, {
        id: 'username',
        cell: info => {
            const data = info.row.original
            return (
                <>
                    <AvatarAndUsername username={data.username} avatar={data.avatar} />
                </>
            )
        },
        header: 'Tài khoản'
    }),
    columnHelper.accessor(row => row.role, {
        id: 'role',
        cell: info => RoleToString(info.getValue()),
        header: 'Vai trò'
    }),
    columnHelper.accessor(row => row.center, {
        id: "center",
        cell: info => info.getValue(),
        header: 'Trung tâm'
    }),
    columnHelper.display({
        header: () => null,
        id: "actions",
        cell: info => <DeleteAccount username={info.row.getValue("username")} />
    })
]

interface DataAPI<T> {
    data: T[];
}

function AccountsTable({ data }: DataAPI<Account>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (

        <table className="mt-4 w-full min-w-max table-auto text-left no-scrollbar">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : (<>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {/* {" "}
                                                    {index !== columns.length - 1 && (
                                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                    )} */}
                                        </>)}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="even:bg-blue-gray-50/50">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    );
}

export default function AccountsPage() {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState<Account[]>(() => []);
    const last_id = useRef<string[]>([""])
    const auth = useAuth();
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const current_page_number = useRef<number>(0)

    async function fetchData(forward: boolean) {
        try {
            if (forward === false) {
                current_page_number.current -= 1;
                if (current_page_number.current <= 0) {
                    current_page_number.current = 0;
                }
            } else {
                current_page_number.current += 1;
                if (current_page_number.current >= last_id.current.length) {
                    current_page_number.current = last_id.current.length - 1;
                }
            }

            let id = last_id.current.at(current_page_number.current) as string;
            if (id === undefined) {
                id = "";
            }
            const res = await fetch(`${config.baseUrl}/accounts?` + new URLSearchParams({
                last_id: id,
            }), {
                headers: {
                    "Authorization": `Bearer ${auth.session.token}`,
                },
            });

            if (!res.ok) return;

            const data = await res.json();
            let toReturn: Account[] = []
            for (const account of data.accounts) {
                const isAdmin = (account.role === Role.Admin);

                let temp: Account = {
                    username: account.username,
                    avatar: account.avatar,
                    role: account.role,
                    center: isAdmin ? "Quản trị" : account.center,
                };
                toReturn.push(temp);
            }

            if (data["total_number_pages"]) {
                setTotalNumberOfPages(Math.ceil(data["total_number_pages"] / toReturn.length))
                console.log(totalNumberOfPages)
            }

            if (current_page_number.current === last_id.current.length - 1) {
                last_id.current.push(data.last_id);
            }

            setAccounts([...toReturn]);
        }
        catch (error) {
            return [];
        };
    }

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            fetchData(true);
        }, 200);
    }, [setAccounts]);

    useEffect(() => {
        const timeout = loadMore();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Danh sách tài khoản
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Các thông tin cơ bản về các tài khoản trên hệ thống
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {/* <Button variant="outlined" color="blue-gray" size="sm">
                            view all */}
                        {/* </Button> */}
                        <Button className="flex items-center gap-3" color="blue" size="sm"
                            onClick={() => { navigate("/account/register") }}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm tài khoản
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="w-full h-full px-0">
                <AccountsTable data={accounts} />
            </CardBody >

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Trang {current_page_number.current + 1} trên {totalNumberOfPages}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" color="blue-gray" size="sm"
                        onClick={() => fetchData(false)}>
                        Trang trước
                    </Button>
                    <Button variant="outlined" color="blue-gray" size="sm"
                        onClick={() => fetchData(true)}>
                        Trang sau
                    </Button>
                </div>
            </CardFooter>
        </Card >
    );
}