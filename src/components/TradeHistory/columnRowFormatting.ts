import { format } from 'date-fns';
import { Column } from 'react-table';
import { Row } from '../../@types/trade-history-types';

export const columnRowFormatting: Column<Row>[] = [
  {
    Header: 'Ticker',
    accessor: 'data.ticker' as keyof Row,
    id: 'ticker',
    minWidth: 60,
  },
  {
    Header: 'Date',
    accessor: 'data.date' as keyof Row,
    id: 'date',
    minWidth: 100,
    Cell: ({ value }: { value: any }) => {
      // change hyphens to forward slash otherwise it outputs one day behind
      return format(new Date(value.replace(/-/g, '/')), 'MM/dd/yy');
    },
  },
  {
    Header: 'QTY',
    accessor: 'data.qty' as keyof Row,
    id: 'qty',
    minWidth: 60,
  },
  {
    Header: 'Price',
    accessor: 'data.price' as keyof Row,
    id: 'price',
    minWidth: 70,
  },
  {
    Header: 'Time',
    accessor: 'data.execTime' as keyof Row,
    id: 'execTime',
    minWidth: 80,
  },
  {
    Header: 'Spread',
    accessor: 'data.spread' as keyof Row,
    id: 'spread',
    minWidth: 70,
  },
  {
    Header: 'Side',
    accessor: 'data.side' as keyof Row,
    id: 'side',
    minWidth: 70,
  },

  {
    Header: 'Effect',
    accessor: 'data.posEffect' as keyof Row,
    id: 'posEffect',
    minWidth: 70,
  },
];
