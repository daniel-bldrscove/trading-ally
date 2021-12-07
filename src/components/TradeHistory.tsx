import { Column } from 'react-table';
import { DataTable } from './shared/DataTable';

type UnitConversion = {
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const data: UnitConversion[] = [
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
];

const columns: Column<UnitConversion>[] = [
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
];

export const TradeHistory = (): JSX.Element => (
  <DataTable columns={columns} data={data} />
);
