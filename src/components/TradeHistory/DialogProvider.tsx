import * as React from 'react';
import { useDisclosure } from '@chakra-ui/react';

type DialogCtxType = {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  isAlertOpen: boolean;
  onAlertOpen: () => void;
  onAlertClose: () => void;
};

const DialogContext = React.createContext<DialogCtxType | null>(null);
DialogContext.displayName = 'DialogContext';

export function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      'useDialogContext hook must be used inside the RowDataProvider tree!',
    );
  }
  return context;
}

export default function DialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // chakraUI hook helpers for modal/alert states
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure();

  // memoize modal states to pass in context
  const dialogStates = {
    isModalOpen,
    onModalOpen,
    onModalClose,
    isAlertOpen,
    onAlertOpen,
    onAlertClose,
  };

  return (
    <DialogContext.Provider value={dialogStates}>
      {children}
    </DialogContext.Provider>
  );
}
