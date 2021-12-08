import { useMemo } from 'react';
import { Column } from 'react-table';
import { DataTable } from './shared/DataTable';

export const TradeHistory = (): JSX.Element => {
  type ExecutedTrades = {
    date: string;
    execTime: string;
    spread: string;
    side: string;
    qty: number;
    symbol: string;
    price: number;
    posEffect: string;
    edit: string;
    delete: string;
  };

  const data: ExecutedTrades[] = useMemo(() => {
    const placeholderData = {
      date: 'MM/DD/YYYY',
      execTime: '00:00:00',
      spread: 'Stock',
      side: 'Long',
      qty: 4,
      symbol: 'ATVI',
      price: 120.87,
      posEffect: 'To Open',
      edit: 'Update',
      delete: 'Delete',
    };

    return [
      {
        date: placeholderData.date,
        execTime: placeholderData.execTime,
        spread: placeholderData.spread,
        side: placeholderData.side,
        qty: placeholderData.qty,
        symbol: placeholderData.symbol,
        price: placeholderData.price,
        posEffect: placeholderData.posEffect,
        edit: placeholderData.edit,
        delete: placeholderData.delete,
      },
      {
        date: placeholderData.date,
        execTime: placeholderData.execTime,
        spread: placeholderData.spread,
        side: placeholderData.side,
        qty: placeholderData.qty,
        symbol: placeholderData.symbol,
        price: placeholderData.price,
        posEffect: placeholderData.posEffect,
        edit: placeholderData.edit,
        delete: placeholderData.delete,
      },
      {
        date: placeholderData.date,
        execTime: placeholderData.execTime,
        spread: placeholderData.spread,
        side: placeholderData.side,
        qty: placeholderData.qty,
        symbol: placeholderData.symbol,
        price: placeholderData.price,
        posEffect: placeholderData.posEffect,
        edit: placeholderData.edit,
        delete: placeholderData.delete,
      },
    ];
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
        isNumeric: true,
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Price',
        accessor: 'price',
        isNumeric: true,
      },
      {
        Header: 'Pos. Effect',
        accessor: 'posEffect',
      },
      {
        accessor: 'edit',
        disableSortBy: true,
      },
      {
        accessor: 'delete',
        disableSortBy: true,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={data} id="trade-history-table" />;
};
