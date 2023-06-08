import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import {
    Button,
    IconButton,
    Input,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {
    PaginationState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React from "react";
import { Car } from "../../components/models/Car";
import { FormatDateToString, capitalizeFirstLetter } from "../../components/util/util";
import { useData } from "./Statistics";
import { daysBetweenDate } from "../../components/util/util";

const columnHelper = createColumnHelper<Car>();

const columns = [
    columnHelper.accessor(row => row.manufacturer, {
        id: 'manufacturer',
        cell: info => capitalizeFirstLetter(info.getValue()!),
        header: 'Nhà sản xuất'
    }),

    columnHelper.accessor("model", {
        header: 'Phiên bản xe',
        cell: info => capitalizeFirstLetter(info.getValue()!),
    }),

    columnHelper.accessor("least_recently_registered", {
        header: () => <span>Thời gian đăng kiểm gần nhất</span>,
        cell: info => FormatDateToString(info.getValue()!),
    }),

    columnHelper.accessor("plate", { header: 'Biển số' }),

    columnHelper.accessor(row => row.invalidate_date, {
        id: "invalidate_date",
        cell: info => {
            const invalidated_date = info.getValue()!
            let daysLeft: string
            const daysleft = daysBetweenDate(invalidated_date, new Date())
            if (daysleft < 0) {
                daysLeft = `${-daysleft} ngày trước`
            } else {
                daysLeft = `còn ${daysleft} ngày`
            }
            return `${FormatDateToString(invalidated_date)} (${daysLeft})`
        },
        header: 'Hạn đăng kiểm'
    }),

    columnHelper.display({
        header: () => null,
        id: "actions",
        cell: info => {
            return <Tooltip content="Car Information">
                <IconButton
                    variant="text"
                    color="green"
                    onClick={function () {
                        console.log(info.row.getValue("plate"))
                    }}>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>
        }
    })
]

export default function DaysLeftUntilInvalidatedTable() {
    const { carsSortByInvalidatedDate } = useData()
    const [globalFilter, setGlobalFilter] = React.useState('')
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 40,
        })
    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setGlobalFilter(value)
    };

    const table = useReactTable({
        data: carsSortByInvalidatedDate,
        columns,
        state: {
            globalFilter,
            pagination
        },
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true,
    })

    return (
        <div className="w-full flex flex-col items-center gap-4 mt-10">

            <div className="flex w-full">
                <Input
                    className="flex-1"
                    label="Tìm kiếm"
                    value={globalFilter}
                    onChange={handleFilterChange} />

                <select id="countries" className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[40, 60, 80, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

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
                                <td key={cell.id} className="px-4 py-2">
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
                    Trang tiếp
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div >
    );
}