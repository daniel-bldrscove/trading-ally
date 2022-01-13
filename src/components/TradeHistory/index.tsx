import { useMemo } from 'react';
import { DataTable } from './DataTable';
import { useQuery } from 'react-query';
import { columnRowFormating } from './columnRowFormating';
import { Box } from '@chakra-ui/react';
import { TitleSections } from '../shared/TitleSections';
import { ModalStates } from './ModalStates';

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

  // TODO: move into main render. Integrate spinner
  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError && error instanceof Error) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box p={[6, 0]}>
      <TitleSections title="Trade History" />
      <ModalStates>
        <DataTable
          columns={columns}
          data={cachedData}
          id="trade-history-table"
        />
      </ModalStates>
    </Box>
  );
};
