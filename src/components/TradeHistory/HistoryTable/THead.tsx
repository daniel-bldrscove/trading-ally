import { Thead, Tr, Th, chakra, useColorModeValue } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { TableInstance } from 'react-table';
import { Row } from '../../../@types/trade-history-types';

export default function THead({ instance }: { instance: TableInstance<Row> }) {
  const tableHeaderBg = useColorModeValue('white', 'brand.gray.800');
  return (
    <Thead>
      {instance.headerGroups.map((headerGroup) => {
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
              // eslint-disable-next-line @typescript-eslint/no-shadow
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
  );
}
