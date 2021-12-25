import { useMemo } from 'react';
import { DataTable } from '../shared/DataTable';
import { useQuery } from 'react-query';
import { columnRowFormating } from './columnRowFormating';

export const TradeHistory = (): JSX.Element => {
  // fetch data, return promise to be used in useQuery
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

  // format the columns
  const columns = useMemo(() => columnRowFormating, []);

  const { isLoading, isError, data, error } = useQuery('todos', fetchTrades);

  const cachedData = useMemo(() => {
    if (!isLoading && !isError) {
      // return the nested data array
      return data.data;
    }
    return null;
  }, [isLoading, isError, data]);

  // TODO: move into main render
  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <span>Error: {error && error.message}</span>;
  }

  return (
    <DataTable columns={columns} data={cachedData} id="trade-history-table" />
  );
};
