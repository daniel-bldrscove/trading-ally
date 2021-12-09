import { useMemo } from 'react';
import { Column } from 'react-table';
import { DataTable } from './shared/DataTable';
import { TRADE_MOCK_DATA } from '../utils/mockData.json';

export const TradeHistory = (): JSX.Element => {
  type ExecutedTrades = {
    id: number;
    date: string;
    execTime: string;
    spread: string;
    side: string;
    qty: number;
    symbol: string;
    price: number;
    posEffect: string;
    edit: null;
    delete: null;
  };

  const data: ExecutedTrades[] = useMemo(() => {
    return TRADE_MOCK_DATA;
  }, []);

  const columns: Column<ExecutedTrades>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Exec Time',
        accessor: 'execTime',
      },
      {
        Header: 'Spread',
        accessor: 'spread',
      },
      {
        Header: 'Side',
        accessor: 'side',
      },
      {
        Header: 'QTY',
        accessor: 'qty',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Pos. Effect',
        accessor: 'posEffect',
      },
      {
        accessor: 'edit',
        disableSortBy: true,
        isEditable: true,
      },
      {
        accessor: 'delete',
        disableSortBy: true,
        isDeletable: true,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={data} id="trade-history-table" />;
};
