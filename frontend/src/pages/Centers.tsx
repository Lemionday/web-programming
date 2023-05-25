import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';
import { config } from '../conf/config';
import { Card, Typography } from "@material-tailwind/react";

interface Center {
    idx: number;
    id: string
    name: string;
    address: string;
}
interface ColumnData {
    dataKey: keyof Center;
    label: string;
    numeric?: boolean;
    width: number | string;
}

const columns: ColumnData[] = [
    {
        width: '5%',
        label: 'Stt',
        dataKey: 'idx',
        numeric: true,
    },
    {
        width: '10%',
        label: "Mã số",
        dataKey: "id",
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

const VirtuosoTableComponents: TableComponents<Center> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),

    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),

    TableHead,

    TableRow: ({ item: _item, ...props }) => <TableRow className="even:bg-teal-700 odd:bg-gray-900"{...props} />,

    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: Center) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <>
                    <TableCell
                        className="dark:text-gray-400 text-lg"
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                </>
            ))}
        </React.Fragment>
    );
}

interface DataAPI<T> {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<Center[]>>;
    fetchData: () => Promise<never[] | undefined>;
}

function InfiniteScroll({ data, setData, fetchData }: DataAPI<Center>) {

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            fetchData();
        }, 200);
    }, [setData]);

    useEffect(() => {
        const timeout = loadMore();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Card className="h-screen w-screen mx-auto rounded-3xl shadow-md">
            <TableVirtuoso
                endReached={loadMore}
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Card>
    );
}

export default function CentersListPage() {
    const [accounts, setAccounts] = useState<Center[]>(() => []);
    const last_id = useRef<string>("");
    const idx = useRef<number>(1);

    async function fetchData() {
        try {
            const res = await fetch(`${config.baseUrl}/centers?` + new URLSearchParams({
                last_id: last_id.current,
            }));

            if (!res.ok) return;

            const data = await res.json();
            let toReturn: Center[] = []
            for (const center of data.centers) {
                let temp: Center = {
                    idx: idx.current,
                    id: center.id,
                    name: center.name,
                    address: center.address,
                };
                idx.current += 1;
                toReturn.push(temp);
            }

            last_id.current = data.last_id;
            setAccounts(current => [...current, ...toReturn]);
        }
        catch (error) {
            return [];
        };
    }

    return (
        <>
            {/* <Typography variant="h1" color="green" className="mb-2 text-center">
                Danh sách các trung tâm đăng kiểm
            </Typography> */}
            <InfiniteScroll data={accounts} setData={setAccounts} fetchData={fetchData} />
        </>
    );
}
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import * as React from 'react';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { TableComponents, TableVirtuoso } from 'react-virtuoso';
// import { config } from '../conf/config';
// import { Card, Typography } from "@material-tailwind/react";

// interface Center {
//     idx: number;
//     id: string
//     name: string;
//     address: string;
// }
// interface ColumnData {
//     dataKey: keyof Center;
//     label: string;
//     numeric?: boolean;
//     width: number | string;
// }

// const columns: ColumnData[] = [
//     {
//         width: '5%',
//         label: 'Stt',
//         dataKey: 'idx',
//         numeric: true,
//     },
//     {
//         width: '10%',
//         label: "Mã số trung tâm",
//         dataKey: "id",
//     },
//     {
//         width: '50%',
//         label: "Tên trung tâm",
//         dataKey: "name",
//     },
//     {
//         width: '35%',
//         label: "Địa chỉ",
//         dataKey: "address",
//     }
// ];

// const VirtuosoTableComponents: TableComponents<Center> = {
//     Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
//         <TableContainer component={Paper} {...props} ref={ref} />
//     )),

//     Table: (props) => (
//         <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
//     ),

//     TableHead,

//     TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,

//     TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
//         <TableBody {...props} ref={ref} />
//     )),
// };

// function fixedHeaderContent() {
//     return (
//         <TableRow>
//             {columns.map((column) => (
//                 <TableCell
//                     key={column.dataKey}
//                     variant="head"
//                     align={column.numeric || false ? 'right' : 'left'}
//                     style={{ width: column.width }}
//                     sx={{
//                         backgroundColor: 'background.paper',
//                     }}
//                 >
//                     {column.label}
//                 </TableCell>
//             ))}
//         </TableRow>
//     );
// }

// function rowContent(_index: number, row: Center) {
//     return (
//         <React.Fragment>
//             {columns.map((column) => (
//                 <>
//                     <TableCell
//                         key={column.dataKey}
//                         align={column.numeric || false ? 'right' : 'left'}
//                     >
//                         {row[column.dataKey]}
//                     </TableCell>
//                 </>
//             ))}
//         </React.Fragment>
//     );
// }

// interface DataAPI<T> {
//     data: T[];
//     setData: React.Dispatch<React.SetStateAction<Center[]>>;
//     fetchData: () => Promise<never[] | undefined>;
// }

// function InfiniteScroll({ data, setData, fetchData }: DataAPI<Center>) {

//     const loadMore = useCallback(() => {
//         return setTimeout(() => {
//             fetchData();
//         }, 200);
//     }, [setData]);

//     useEffect(() => {
//         const timeout = loadMore();
//         return () => clearTimeout(timeout);
//     }, []);

//     return (
//         <Paper style={{ height: '100vh', width: '100vw' }}>
//             <TableVirtuoso
//                 endReached={loadMore}
//                 data={data}
//                 components={VirtuosoTableComponents}
//                 fixedHeaderContent={fixedHeaderContent}
//                 itemContent={rowContent}
//             />
//         </Paper>
//     );
// }


// export default function CentersListPage() {
//     const [centers, setCenters] = useState<Center[]>(() => []);
//     const last_id = useRef<string>("");
//     const idx = useRef<number>(1);

//     async function fetchData() {
//         try {
//             const res = await fetch(`${config.baseUrl}/centers?` + new URLSearchParams({
//                 last_id: last_id.current,
//             }));

//             if (!res.ok) return;

//             const data = await res.json();
//             let toReturn: Center[] = []
//             for (const center of data.centers) {
//                 let temp: Center = {
//                     idx: idx.current,
//                     id: center.id,
//                     name: center.name,
//                     address: center.address,
//                 };
//                 idx.current += 1;
//                 toReturn.push(temp);
//             }

//             last_id.current = data.last_id;
//             setCenters(current => [...current, ...toReturn]);
//         }
//         catch (error) {
//             return [];
//         };
//     }

//     return (
//         <Card className="overflow-scroll h-full w-full">
//             <table className="w-full min-w-max table-auto text-left">
//                 <thead>
//                     <tr>
//                         {columns.map((column) => (
//                             <th key={column.dataKey} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                 <Typography
//                                     variant="small"
//                                     color="blue-gray"
//                                     className="font-normal leading-none opacity-70"
//                                 >
//                                     {column.label}
//                                 </Typography>
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {centers.map((center, index) => (
//                         <tr key={index} className="even:bg-blue-gray-50/50">
//                             {columns.map(column => (
//                                 <td className="p-4">
//                                     <Typography variant="small" color="blue-gray" className="font-normal">
//                                         {(center as Center)[column.dataKey]}
//                                     </Typography>
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </Card>
//     );
// }