import { useCallback } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, Column } from 'react-table';
import { TableBtn } from './TableBtn';
import { Modal } from './Modal';
import { Alert } from './Alert';

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
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const modalProps = {
    data: {
      title: 'Temp title',
    },
    isModalOpen,
    onModalClose,
  };

  const alertProps = {
    data: {
      title: 'Alert title',
      disclaimer: 'Are you sure you want to delete this trade?',
    },
    isAlertOpen,
    onAlertClose,
  };

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
                        <TableBtn action="edit" onClick={onModalOpen} />
                      ) : cell.column.id === 'delete' ? (
                        <TableBtn action="delete" onClick={onAlertOpen} />
                      ) : null}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal {...modalProps} />
      <Alert {...alertProps} />
    </Box>
  );
};
