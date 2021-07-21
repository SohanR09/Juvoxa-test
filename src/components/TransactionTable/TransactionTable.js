import React, { useState, useMemo, useEffect } from 'react'
import { useTable, useSortBy, usePagination, useColumnOrder } from 'react-table'
import { COLUMNS } from './columns'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const TransactionTable = () => {
    const [datas, setDatas] = useState([])

    const classes = useStyles();

    useEffect(() => {
        fetch('https://canopy-frontend-task.vercel.app/api/transactions')
            .then(response => response.json())
            .then(data => setDatas(data.transactions))
    }, [setDatas])

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => datas, [datas])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
        setColumnOrder
    } = useTable({
        columns,
        data,
    },
        useSortBy, usePagination, useColumnOrder)

    const { pageIndex, pageSize } = state

    const changeOrder = () => {
        setColumnOrder(['name', 'ticketref', 'settlement_amount'])
    }

    return (
        <div style={{ marginTop: '40px'}}>
            <button onClick={changeOrder}>Change column order</button>
            <TableContainer component={Paper} {...getTableProps()}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                    <TableFooter>
                        &nbsp;&nbsp;
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                            | Go to page: {' '}
                            <input type='number' defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(pageNumber)
                                }}
                                style={{ width: '50px' }}
                            ></input>
                        </span>
                        &nbsp;&nbsp;
                        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [5, 10, 15, 20, 25].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))
                            }
                        </select>
                        &nbsp;&nbsp;
                        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} color="primary">{'<<'}</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => nextPage()} disabled={!canNextPage} color="secondary">Next</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} color="primary">{'>>'}</Button>
                    </TableFooter>
                </Table>

            </TableContainer>
        </div>
    )
}

export default TransactionTable