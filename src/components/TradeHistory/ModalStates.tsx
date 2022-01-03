import { useMemo, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { ModalStatesContext } from './CreateContext';
import { Modal } from '../shared/Modal';
import { Alert } from '../shared/Alert';
import { CustomModalContent } from './CustomModalContent';
import { CustomAlertContent } from './CustomAlertContent';
import { ModalState } from './types';

export const Modals = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [rowData, setRowData] = useState({});
  // hook helpers for modal/alert states
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
      passDataToModalContent: (dataObject) => {
        setRowData(dataObject);
      },
      getDataFromRow: () => rowData,
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
