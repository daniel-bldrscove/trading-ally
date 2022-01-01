/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useRowSelect, CellProps } from 'react-table';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';
import { RowMenu } from './RowMenu';
import { TableProps, RowDataProps } from './types';

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  ...props
}: TableProps<T>): JSX.Element => {
  // make the row id the same as the fauna ref id
  const getRowId = useCallback((row) => row.ref['@ref'].id, []);

  // properties returned from useTable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    // pass options to useTable
  } = useTable(
    {
      columns: columns && columns,
      data: data && data,
      getRowId,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // make indeterminate checkbox
        {
          Header: '',
          id: 'select-row',
          disableSortBy: true,
          // pass the selected row props to button component
          // to be able to read the selected row id
          Cell: ({ row }: CellProps<RowDataProps>) => {
            if (row.getToggleRowSelectedProps) {
              return (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              );
            }
            return <IndeterminateCheckbox />;
          },
        },
        ...columns,
        // make row option menu
        {
          Header: '',
          id: 'row-menu',
          disableSortBy: true,
          Cell: ({ row }: CellProps<RowDataProps>) => {
            return <RowMenu rowProps={{ ...row.original }} />;
          },
        },
      ]);
    },
  );

  const tableStripes = useColorModeValue('brand.tableLight', 'brand.gray');
  const tableHeaderBg = useColorModeValue('#d3dee5', 'brand.gray.800');

  return (
    <Box {...props} maxW="full" h="sm">
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <Table
        {...getTableProps()}
        size="sm"
        variant="striped"
        colorScheme={tableStripes}
      >
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr
                key={key}
                bg={tableHeaderBg}
                position="sticky"
                top={0}
                zIndex={5}
                {...restHeaderGroupProps}
              >
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: {
                        minWidth: column.minWidth,
                      },
                    }),
                  );
                  return (
                    <Th key={key} {...restColumn} isNumeric={column.isNumeric}>
                      {column.render('Header')}
                      <chakra.span>
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
            prepareRow(row);
            // eslint-disable-next-line react/prop-types
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr key={key} {...restRowProps}>
                {
                  // eslint-disable-next-line react/prop-types
                  row.cells.map((cell) => {
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
                  })
                }
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
