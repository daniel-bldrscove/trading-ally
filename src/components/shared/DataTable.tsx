import { useCallback, useContext } from 'react';
/* eslint-disable @typescript-eslint/no-shadow */
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
import { useTable, useSortBy, Column } from 'react-table';
import { TableBtn } from './TableBtn';
import { ModalContext } from '../TradeHistory';

type DataRow = {
  data: {
    date: string;
    execTime: string;
    spread: string;
    side: string;
    qty: number;
    ticker: string;
    price: number;
    posEffect: string;
  };
  ref: {
    '@ref': {
      collection: Record<string, unknown>;
      id: string;
    };
  };
  ts: number;
};

type ColumnFormat = {
  Header: string;
  accessor: string;
  id: string;
  disableSortBy?: boolean;
};

interface TableProps<T extends Record<string, unknown>> {
  data: T[] & DataRow[];
  columns: Column<T>[] & ColumnFormat[];
  id?: string;
}

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  ...props
}: TableProps<T>): JSX.Element => {
  // get modal context
  const modalState = useContext(ModalContext);

  // make the row id the same as the fauna ref id
  const getRowId = useCallback((row) => row.ref['@ref'].id, []);

  // react table hook to render ui
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns && columns,
        data: data && data,
        getRowId,
      },
      useSortBy,
    );

  const tableStripes = useColorModeValue('brand.tableLight', 'brand.gray');

  return (
    <Box {...props} maxW="full" h="sm">
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
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  console.log('Log column: ', column);
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
                      {cell.column.id === 'edit' ? (
                        <TableBtn
                          ml={2}
                          action="edit"
                          onClick={modalState?.onModalOpen}
                        />
                      ) : cell.column.id === 'delete' ? (
                        <TableBtn
                          ml={2}
                          action="delete"
                          onClick={modalState?.onAlertOpen}
                        />
                      ) : null}
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
};
