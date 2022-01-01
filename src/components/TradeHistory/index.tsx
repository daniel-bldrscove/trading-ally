import { useMemo } from 'react';
import { DataTable } from './DataTable';
import { useQuery } from 'react-query';
import { columnRowFormating } from './columnRowFormating';
import { Box } from '@chakra-ui/react';
import { TitleSections } from '../TitleSections';
import { Modals } from './Modals';
import './trade-history-styles.css';

// promise fetch function for useQuery
const fetchTrades = async () => {
  const res = await fetch('/api/read-all-trades', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const TradeHistory = (): JSX.Element => {
  // query data
  const { isLoading, isError, data, error } = useQuery('trades', fetchTrades);

  // memoize data
  const cachedData = useMemo(() => {
    if (!isLoading && !isError) {
      // return the nested data array
      return data.data;
    }
    return null;
  }, [isLoading, isError, data]);

  // memoize columns
  const columns = useMemo(() => columnRowFormating, []);

  // TODO: move into main render
  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError && error instanceof Error) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box p={6}>
      <TitleSections title="Trade History" />
      <Modals>
        <DataTable
          columns={columns}
          data={cachedData}
          id="trade-history-table"
          overflow="scroll"
        />
      </Modals>
    </Box>
  );
};
