import * as React from 'react';
import HistoryTable from './HistoryTable';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { columnRowFormatting } from './columnRowFormatting';
import ComponentWrapper from '../shared/ComponentWrapper';
import { useScrollbarAppearance } from '../../utils/scrollbarAppearance';
import { Modal } from '../shared/Modal';
import { Alert } from '../shared/Alert';
import EditRowData from './EditRowData';
import DeleteRowData from './DeleteRowData';
import RowDataProvider from './RowDataProvider';
import DialogProvider from './DialogProvider';

const fetchTrades = async () => {
  const response = await fetch('/api/read-all-trades', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  if (!response.ok) {
    console.log('Fetch Error: ', res.error);
    console.log('Res statusText: ', res.statusText);
    return Promise.reject(res.error);
  }
  // console.log('Logging fetch response: ', response);
  return res.data;
};

export default function TradeHistory(): JSX.Element {
  const tableBg = useColorModeValue('white', 'brand.gray.800');
  const { scrollbarLgtMd, scrollbarDrkMd } = useScrollbarAppearance();
  const handleScrollStyles = useColorModeValue(
    { ...scrollbarLgtMd },
    { ...scrollbarDrkMd },
  );
  const scrollStyles = {
    ...handleScrollStyles,
  };

  // query trades from DB
  const status = useQuery('trades', fetchTrades);

  // memoize data for table
  const cachedData = React.useMemo(() => status.data, [status.data]);

  // memoize columns for table
  const columns = React.useMemo(() => columnRowFormatting, []);

  // render based on status
  if (status.isLoading) {
    return <span>Loading...</span>;
  } else if (status.isIdle) {
    return <span>Idle...</span>;
  } else if (status.isError) {
    console.log('There was an error fetching trades: ', status.error);
    return <span>Error: {status.error}</span>;
  }

  // render table
  return (
    <ComponentWrapper id="trade-history-container">
      <DialogProvider>
        <RowDataProvider>
          <Modal>
            <EditRowData />
          </Modal>
          <Alert>
            <DeleteRowData />
          </Alert>
          <Box
            maxW="full"
            h="sm"
            bg={tableBg}
            borderRadius="md"
            overflow="hidden"
          >
            <Box h="sm" overflow="auto" sx={scrollStyles}>
              {status.data && (
                <HistoryTable columns={columns} data={cachedData} />
              )}
            </Box>
          </Box>
        </RowDataProvider>
      </DialogProvider>
    </ComponentWrapper>
  );
}
