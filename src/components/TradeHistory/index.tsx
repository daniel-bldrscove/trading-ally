import { useMemo, createContext } from 'react';
import { DataTable } from '../shared/DataTable';
import { useQuery } from 'react-query';
import { columnRowFormating } from './columnRowFormating';
import { Box, useDisclosure } from '@chakra-ui/react';
import { TitleSections } from '../TitleSections';
import { Modal } from '../shared/Modal';
import { Alert } from '../shared/Alert';
import { CustomModalContent } from './CustomModalContent';
import { CustomAlertContent } from './CustomAlertContent';
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

interface ModalState {
  isModalOpen: boolean;
  isAlertOpen: boolean;
  onModalOpen: () => void;
  onAlertOpen: () => void;
  onModalClose: () => void;
  onAlertClose: () => void;
}

// export for use in child components
export const ModalContext = createContext<ModalState | null>(null);

export const TradeHistory = (): JSX.Element => {
  // chakra-ui hook helpers for modal states
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

  // memoize modal states to pass in context
  const modalStates = useMemo<ModalState | null>(
    () => ({
      isModalOpen,
      onModalOpen,
      onModalClose,
      isAlertOpen,
      onAlertOpen,
      onAlertClose,
    }),
    [
      isModalOpen,
      onModalOpen,
      onModalClose,
      isAlertOpen,
      onAlertOpen,
      onAlertClose,
    ],
  );

  // query data
  const { isLoading, isError, data, error } = useQuery('todos', fetchTrades);

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
      <ModalContext.Provider value={modalStates}>
        <DataTable
          columns={columns}
          data={cachedData}
          id="trade-history-table"
        />
        <Modal>
          <CustomModalContent />
        </Modal>
        <Alert>
          <CustomAlertContent />
        </Alert>
      </ModalContext.Provider>
    </Box>
  );
};
