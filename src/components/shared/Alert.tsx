/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useContext, createContext, RefObject } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { ModalContext } from '../TradeHistory/index';

interface AlertProps {
  children: React.ReactNode;
}

type ContextType = RefObject<HTMLButtonElement>;

export const RefContext = createContext<ContextType | null>(null);

export const Alert = ({ children }: AlertProps): JSX.Element => {
  const context = useContext(ModalContext);
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={context!.onAlertClose}
      isOpen={context!.isAlertOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <RefContext.Provider value={cancelRef}>{children}</RefContext.Provider>
      </AlertDialogContent>
    </AlertDialog>
  );
};
