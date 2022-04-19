import { Tbody, Tr, Td } from '@chakra-ui/react';
import { TableInstance } from 'react-table';
import { Row } from '../../../@types/trade-history-types';

export default function TBody({ instance }: { instance: TableInstance<Row> }) {
  return (
    <Tbody {...instance.getTableBodyProps()}>
      {instance.rows.map((row) => {
        instance.prepareRow(row);
        const { key, ...restRowProps } = row.getRowProps();
        return (
          <Tr key={key} {...restRowProps}>
            {row.cells.map((cell) => {
              // eslint-disable-next-line @typescript-eslint/no-shadow
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
  );
}
