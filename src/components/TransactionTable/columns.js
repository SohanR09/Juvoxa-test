// import { format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Ticket Ref',
        Footer: 'Ticket Ref',
        accessor: 'ticketref'
    },
    {
        Header: 'Trade Date',
        Footer: 'Trade Date',
        accessor: 'traded_on',
        // Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
    },
    {
        Header: 'QTY',
        Footer: 'QTY',
        accessor: 'quantity'
    },
    {
        Header: 'CCY',
        Footer: 'CCY',
        accessor: 'currency'
    },
    {
        Header: 'Settlement Amount',
        Footer: 'Settlement Amount',
        accessor: 'settlement_amount'
    }
]