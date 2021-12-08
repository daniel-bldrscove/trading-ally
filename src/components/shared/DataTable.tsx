/* eslint-disable @typescript-eslint/no-shadow */
import { Box, Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, Column } from 'react-table';

export type DataTableProps<Data extends Record<string, unknown>> = {
  data: Data[];
  columns: Column<Data>[];
  id?: string;
};

export function DataTable<Data extends Record<string, unknown>>({
  data,
  columns,
  ...props
}: DataTableProps<Data>): JSX.Element {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Box {...props} maxW="full">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            console.log('Header group', headerGroup);
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  console.log('Column: ', column);
                  const { key, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps(),
                  );
                  return (
                    <Th key={key} {...restColumn} isNumeric={column.isNumeric}>
                      {column.render('Header')}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            console.log('Row: ', row);
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <Td
                      key={key}
                      {...restCellProps}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
