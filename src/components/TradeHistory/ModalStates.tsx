import { useMemo, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { ModalStatesContext } from '../../utils/createContext';
import { Modal } from '../shared/Modal';
import { Alert } from '../shared/Alert';
import { CustomModalContent } from './CustomModalContent';
import { CustomAlertContent } from './CustomAlertContent';
import { ModalStatesProps } from '../../@types/trade-history-types';

export const ModalStates = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [rowData, setRowData] = useState({
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

  // chakraUI hook helpers for modal/alert states
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
  const modalStates = useMemo<ModalStatesProps | null>(
    () => ({
      isModalOpen,
      onModalOpen,
      onModalClose,
      isAlertOpen,
      onAlertOpen,
      onAlertClose,
      passDataToModalContent: (dataObject) => {
        setRowData(dataObject);
      },
      rowData,
    }),
    [
      rowData,
      isModalOpen,
      onModalOpen,
      onModalClose,
      isAlertOpen,
      onAlertOpen,
      onAlertClose,
    ],
  );

  return (
    <ModalStatesContext.Provider value={modalStates}>
      <Modal>
        <CustomModalContent />
      </Modal>
      <Alert>
        <CustomAlertContent />
      </Alert>
      {children}
    </ModalStatesContext.Provider>
  );
};
