import { useCallback } from 'react';
import { Table, Text, useColorModeValue } from '@chakra-ui/react';
import { Row, HistoryTableProps } from '../../../@types/trade-history-types';
import { useTable, useSortBy, useRowSelect, CellProps } from 'react-table';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { RowMenu } from '../RowMenu';
import THead from './THead';
import TBody from './TBody';

export default function HistoryTable({
  columns,
  data,
}: HistoryTableProps): JSX.Element {
  // make the row id the same as the fauna ref id
  const getRowId = useCallback((row) => row.ref['@ref'].id, []);
  const tableStripes = useColorModeValue('brand.tableLight', 'brand.gray');

  const instance = useTable(
    {
      columns,
      data,
      getRowId,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      hooks.visibleColumns.push((columns) => [
        {
          // make indeterminate checkbox
          Header: '',
          id: 'select-row',
          disableSortBy: true,
          // pass the selected row props to button component
          // to be able to read the selected row id
          Cell: ({ row }: CellProps<Row>) => {
            if (row.getToggleRowSelectedProps) {
              return (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              );
            }
            return <IndeterminateCheckbox />;
          },
        },
        ...columns,
        {
          // make row option menu
          Header: '',
          id: 'row-menu',
          disableSortBy: true,
          Cell: ({ row }: CellProps<Row>) => {
            // console.log('Row data: ', row);
            // pass row data to row menu button
            return <RowMenu rowTableData={{ ...row.original }} />;
          },
        },
      ]);
    },
  );

  return (
    <>
      <Table
        {...instance.getTableProps()}
        size="sm"
        variant="striped"
        colorScheme={tableStripes}
      >
        <THead instance={instance} />
        <TBody instance={instance} />
      </Table>
      <Text m={4}>
        Selected Rows: {Object.keys(instance.state.selectedRowIds).length}
      </Text>
    </>
  );
}
