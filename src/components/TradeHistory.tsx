import { useMemo } from 'react';
import { Column } from 'react-table';
import { DataTable } from './shared/DataTable';

export const TradeHistory = (): JSX.Element => {
  type Executed = {
    fromUnit: string;
    toUnit: string;
    factor: number;
  };

  const data: Executed[] = useMemo(
    () => [
      {
        fromUnit: 'inches',
        toUnit: 'millimetres (mm)',
        factor: 25.4,
      },
      {
        fromUnit: 'feet',
        toUnit: 'centimetres (cm)',
        factor: 30.48,
      },
      {
        fromUnit: 'yards',
        toUnit: 'metres (m) ',
        factor: 0.91444,
      },
    ],
    [],
  );

  const columns: Column<Executed>[] = useMemo(
    () => [
      {
        Header: 'To convert',
        accessor: 'fromUnit',
      },
      {
        Header: 'Into',
        accessor: 'toUnit',
      },
      {
        Header: 'Multiply by',
        accessor: 'factor',
        isNumeric: true,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={data} />;
};
