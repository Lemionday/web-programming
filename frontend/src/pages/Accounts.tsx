import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Alert,
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/useAuth';
import { Account, Role, RoleToString } from '../components/models/Session';
import { GetAllWithAuthentication } from "../components/shared/actions";
import { config } from '../conf/config';

function AvatarAndUsername({ username, avatar }: { username: string, avatar?: number }) {
    return (
        <div className="flex items-center gap-3">
            <Avatar
                src={`${config.baseUrl}/avatar/${String(avatar)}.svg`}
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

function DeleteAccountButton({ onClick }: { onClick: () => Promise<void> }) {
    return (
        <Tooltip content="Xóa tài khoản">
            <IconButton variant="text" color="red"
                onClick={async () => await onClick()}
            >
                <TrashIcon className="h-4 w-4" />
            </IconButton>
        </Tooltip>
    )
}

const columnHelper = createColumnHelper<Account>();

function AccountsTable() {
    const auth = useAuth();
    const [accounts, setAccounts] = useState<Account[]>(() => []);
    const [alert, setAlert] = useState({ msg: "", error: false })

    useEffect(() => {
        (async function () {
            try {
                const data = await GetAllWithAuthentication<Account>({ url: `${config.baseUrl}/account/getall`, token: auth.session.token })
                setAccounts(data);
            }
            catch (error) {
                console.log(error)
            };
        })()

    }, []);

    const columns = useMemo(() => [
        columnHelper.accessor(row => row.username, {
            id: "username",
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
            id: "role",
            header: 'Vai trò',
            cell: info => {
                return RoleToString(info.getValue())
            }
        }),

        columnHelper.accessor(row => row.center, { header: 'Trung tâm' }),

        columnHelper.display({
            header: () => null,
            id: "actions",
            cell: info => {
                const auth = useAuth()

                return (
                    <>
                        <DeleteAccountButton
                            onClick={async () => {
                                const username = info.row.getValue("username")
                                if (info.row.getValue("role") === Role.Admin) {
                                    setAlert({ msg: "Không thể xóa tài khoản quản trị viên", error: true })
                                    return
                                }

                                const res = await fetch(`${config.baseUrl}/account/delete/${username}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `Bearer ${auth.session.token}`
                                    }
                                })

                                if (res.ok) {
                                    setAccounts(accounts => accounts.filter((acc) => acc.username !== username))
                                    setAlert({ msg: `Xóa tài khoản ${username} thành công!`, error: false })
                                } else {
                                    console.log(res)
                                }
                            }} />
                    </>
                )
            }
        })
    ], [])

    const table = useReactTable({
        data: accounts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true,
    })

    return (
        <div className="flex flex-col items-center gap-4">
            <Alert
                className="w-1/2 items-center"
                open={alert.msg !== ""}
                variant="outlined"
                color={alert.error ? "red" : "green"}
                icon={alert.error ? <ExclamationCircleIcon className="h-6 w-6" /> : <CheckCircleIcon className="h-6 w-6" />}
                onClose={() => setAlert({ msg: "", error: false })}>{alert.msg}
            </Alert>
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
                                <td key={cell.id} className="p-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center gap-4">
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trang trước
                </Button>
                <Typography color="gray" className="font-normal">
                    Trang <strong className="text-blue-gray-900">{table.getState().pagination.pageIndex + 1}</strong> trên {" "}
                    <strong className="text-blue-gray-900">{table.getPageCount()}</strong>
                </Typography>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function AccountsPage() {
    const navigate = useNavigate();

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
                        <Button className="flex items-center gap-3" color="blue" size="sm"
                            onClick={() => { navigate("/account/register") }}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm tài khoản
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="w-full h-full px-0">
                <AccountsTable />
            </CardBody >
        </Card >
    );
}