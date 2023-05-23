import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';
import { config } from '../../conf/config';
import { Virtuoso } from 'react-virtuoso'
import { useRef, useState, useCallback, useEffect } from 'react'

interface Center {
    index: number;
    id: string;
    name: string;
    address: string;
}

interface ColumnData {
    dataKey: keyof Center;
    label: string;
    numeric?: boolean;
    width: number;
}

const columns: ColumnData[] = [
    {
        width: 200,
        label: 'Stt',
        dataKey: 'index',
        numeric: true,
    },
    {
        width: 200,
        label: "ID",
        dataKey: "id",
    },
    {
        width: 200,
        label: "Name",
        dataKey: "name",
    },
    {
        width: 200,
        label: "Address",
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

function rowContent(_index: number, row: Center) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function ReactVirtualizedTable() {
    const [centers, setCenters] = useState<Center[]>(() => []);
    const last_center_id = useRef<string>("");
    const idx = useRef<number>(1);

    async function fetchData() {
        try {
            const res = await fetch(`${config.baseUrl}/centers?` + new URLSearchParams({
                last_center_id: last_center_id.current,
            }));

            if (!res.ok) return;

            const data = await res.json();
            let toReturn: Center[] = []
            for (const center of data.centers) {
                let temp: Center = {
                    index: idx.current,
                    id: center.id,
                    name: center.name,
                    address: center.address
                };
                idx.current += 1;
                toReturn.push(temp);
            }

            last_center_id.current = data.last_center_id;
            setCenters(current => [...current, ...toReturn]);
        }
        catch (error) {
            return [];
        };
    }

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            fetchData();
        }, 200);
    }, [setCenters]);

    useEffect(() => {
        const timeout = loadMore();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Paper style={{ height: '100vh', width: '100vw' }}>
            <TableVirtuoso
                endReached={loadMore}
                data={centers}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
}