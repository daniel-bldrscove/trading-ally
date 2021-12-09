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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  // TODO: use brand colors for stripes
  const tableStripes = useColorModeValue('gray', 'gray');

  return (
    <Box {...props} maxW="full">
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
                      {cell.column.isEditable ? (
                        <TableBtn action="edit" onClick={onModalOpen} />
                      ) : cell.column.isDeletable ? (
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
}
