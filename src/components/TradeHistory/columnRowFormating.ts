import { format } from 'date-fns';

export const columnRowFormating = [
  {
    Header: 'Ticker',
    accessor: 'data.ticker',
    id: 'ticker',
    minWidth: 60,
  },
  {
    Header: 'Date',
    accessor: 'data.date',
    id: 'date',
    minWidth: 100,
    Cell: ({ value }: { value: any }) => {
      // change hyphens to forward slash otherwise it outputs one day behind
      return format(new Date(value.replace(/-/g, '/')), 'MM/dd/yy');
    },
  },
  {
    Header: 'QTY',
    accessor: 'data.qty',
    id: 'qty',
    minWidth: 60,
  },
  {
    Header: 'Price',
    accessor: 'data.price',
    id: 'price',
    minWidth: 70,
  },
  {
    Header: 'Time',
    accessor: 'data.execTime',
    id: 'execTime',
    minWidth: 80,
  },
  {
    Header: 'Spread',
    accessor: 'data.spread',
    id: 'spread',
    minWidth: 70,
  },
  {
    Header: 'Side',
    accessor: 'data.side',
    id: 'side',
    minWidth: 70,
  },

  {
    Header: 'Effect',
    accessor: 'data.posEffect',
    id: 'posEffect',
    minWidth: 70,
  },
];
