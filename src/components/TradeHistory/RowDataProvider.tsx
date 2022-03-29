import * as React from 'react';
import { Row } from '../../@types/trade-history-types';

type RowCtxType = {
  rowData: Row;
  setRowData: React.Dispatch<React.SetStateAction<Row>>;
};

const RowDataContext = React.createContext<RowCtxType | null>(null);
RowDataContext.displayName = 'RowDataContext';

export function useRowDataContext() {
  const context = React.useContext(RowDataContext);
  if (!context) {
    throw new Error(
      'useRowDatContext hook must be used inside the RowDataProvider tree!',
    );
  }
  return context;
}

export default function RowDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rowData, setRowData] = React.useState<Row>({
    data: {
      date: '',
      execTime: '',
      spread: '',
      side: '',
      qty: 1,
      ticker: '',
      price: 0,
      posEffect: '',
    },
    ref: {
      '@ref': {
        collection: {},
        id: '',
      },
    },
    ts: 0,
  });

  return (
    <RowDataContext.Provider value={{ rowData, setRowData }}>
      {children}
    </RowDataContext.Provider>
  );
}
