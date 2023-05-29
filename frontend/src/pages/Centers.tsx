import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { config } from '../conf/config';
import { Card, Typography, CardFooter, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
interface Center {
    idx: number;
    id: string
    name: string;
    address: string;
}
interface ColumnData {
    dataKey: keyof Center;
    label: any;
    justify?: boolean;
    width: number | string;
}

const columns: ColumnData[] = [
    {
        width: '5%',
        label: 'Stt',
        dataKey: 'idx',
        justify: true,
    },
    {
        width: 'h-10',
        label: <span>Mã số</span>,
        dataKey: "id",
        justify: true,
    },
    {
        width: '50%',
        label: "Tên trung tâm",
        dataKey: "name",
    },
    {
        width: '35%',
        label: "Địa chỉ",
        dataKey: "address",
    }
];

function fixedHeaderContent() {
    return (
        <tr>
            {columns.map((column) => (
                <th key={column.dataKey} className=" dark:bg-gray-800 p-5">
                    <Typography
                        variant="small"
                        className="font-normal leading-none opacity-70 text-lg"
                    >
                        {column.label}
                    </Typography>
                </th>
            ))}
        </tr>
    );
}

function rowContent(_index: number, row: Center) {
    return (
        <>
            {columns.map((column) => (
                <td
                    className="dark:text-gray-400 text-lg"
                    key={column.dataKey}
                    align={column.justify ? 'center' : 'left'}
                >
                    <Typography variant="small" className="font-normal">
                        {row[column.dataKey]}
                    </Typography>
                </td>
            ))}
        </>
    );
}

function PagingTable() {
    const [centers, setCenters] = useState<Center[]>(() => [])
    const last_id = useRef<string[]>([""])
    const page_number = useRef<number>(0)
    const idx = useRef<number>(1)

    async function fetchData(forward?: boolean): Promise<Center[] | undefined> {
        try {
            if (forward === false) {
                page_number.current -= 1;
                if (page_number.current <= 0) {
                    page_number.current = 0;
                }
            } else {
                page_number.current += 1;
                if (page_number.current >= last_id.current.length) {
                    page_number.current = last_id.current.length - 1;
                }
            }

            let id = last_id.current.at(page_number.current) as string;
            if (id === undefined) {
                id = "";
            }

            const res = await fetch(`${config.baseUrl}/centers?` + new URLSearchParams({
                last_id: id,
            }));

            if (!res.ok) return

            idx.current = 1;
            const data = await res.json();
            let toReturn: Center[] = []
            for (const center of data.centers) {
                toReturn.push({
                    idx: idx.current,
                    id: center.id,
                    name: center.name,
                    address: center.address,
                });
                idx.current += 1;
            }

            if (page_number.current === last_id.current.length - 1) {
                last_id.current.push(data.last_id);
            }

            return toReturn;
        }
        catch (error) {
            return
        };
    }

    // const loadMore = useCallback((forward: boolean) => {
    //     return setTimeout(async () => {
    //         const data = await fetchData(forward);
    //         if (data !== undefined) setCenters(data);
    //     }, 300);
    // }, [centers]);
    async function loadMore(forward: boolean) {
        const data = await fetchData(forward);
        if (data !== undefined) setCenters(data);
    }

    useEffect(() => {
        (async () => {
            loadMore(true)
        })()
        // const timeout = loadMore(true);
        // return () => clearTimeout(timeout);
    }, []);

    return (
        <Card className="h-full w-full mx-auto rounded-3xl dark:bg-gray-700  p-4">
            <TableVirtuoso
                // endReached={loadMore}
                className='w-full'
                data={centers}
                components={{
                    Table: (props) => (
                        <table className='w-full h-full text-top'{...props} />
                    ),

                    TableRow: ({ item: _item, ...props }) => <tr className="even:bg-blue-gray-50/50"{...props} />,

                    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
                        <tbody {...props} ref={ref} />
                    )),
                }}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
            <CardFooter className="flex items-center justify-between  p-4">
                <Typography variant="small" color="blue-gray"
                    className="dark:text-gray-400 text-lg"
                >
                    Trang {page_number.current + 1}
                </Typography>
                <div className="flex">
                    <Button
                        variant="text"
                        className="dark:text-gray-400 flex items-center gap-2"
                        onClick={async () => await loadMore(false)}
                        disabled={page_number.current === 0}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trang trước
                    </Button>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="dark:text-gray-400 flex items-center gap-2"
                        onClick={async () => await loadMore(true)}
                    // disabled={!isFirst}
                    >
                        Trang sau <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function CentersListPage() {
    return (
        <div className='flex flex-col w-screen h-screen dark:text-gray-400'>
            <Typography variant="h1" color="green" className="mb-2 text-center">
                Danh sách các trung tâm đăng kiểm
            </Typography>
            <div className="flex-1 w-full mx-auto bg-inherit p-5" >
                <PagingTable />
            </div>
        </div>
    );
}