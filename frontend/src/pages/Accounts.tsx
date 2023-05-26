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
import { useAuth } from '../components/hooks/useAuth';
import { config } from '../conf/config';
import { Role } from '../components/models/Session';
import { Card } from '@material-tailwind/react';
interface Account {
    username: string;
    role: Role;
    center: string;
}
interface ColumnData {
    dataKey: keyof Account;
    label: string;
    numeric?: boolean;
    width: number;
}

const columns: ColumnData[] = [
    // {
    //     width: 200,
    //     label: 'Stt',
    //     dataKey: 'index',
    //     numeric: true,
    // },
    // {
    //     width: 200,
    //     label: "ID",
    //     dataKey: "id",
    // },
    {
        width: 200,
        label: "Tên đăng nhập",
        dataKey: "username",
    },
    {
        width: 200,
        label: "Trung tâm",
        dataKey: "center",
    }
];
const VirtuosoTableComponents: TableComponents<Account> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),

    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),

    TableHead,

    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,

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

function rowContent(_index: number, row: Account) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <>
                    <TableCell
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
    setData: React.Dispatch<React.SetStateAction<Account[]>>;
    fetchData: () => Promise<never[] | undefined>;
}

function InfiniteScroll({ data, setData, fetchData }: DataAPI<Account>) {

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
        <Card className='w-full h-full'>
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


export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>(() => []);
    const last_account_id = useRef<string>("");
    const auth = useAuth();

    async function fetchData() {
        try {
            const res = await fetch(`${config.baseUrl}/accounts?` + new URLSearchParams({
                last_account_id: last_account_id.current,
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
                    role: account.role,
                    center: isAdmin ? "Quản trị" : account.center,
                };
                toReturn.push(temp);
            }

            setAccounts(current => [...current, ...toReturn]);
        }
        catch (error) {
            return [];
        };
    }

    return (
        <div className='w-full'>
            <InfiniteScroll data={accounts} setData={setAccounts} fetchData={fetchData} />
        </div>
    );
}