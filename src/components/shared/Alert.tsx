/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { LeastDestructiveBtnRefContext } from '../../utils/createContext';
import { useDialogContext } from '../TradeHistory/DialogProvider';

interface AlertProps {
  children: React.ReactNode;
}

export const Alert = ({ children }: AlertProps): JSX.Element => {
  const { isAlertOpen, onAlertClose } = useDialogContext();
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      isOpen={isAlertOpen}
      onClose={onAlertClose}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <LeastDestructiveBtnRefContext.Provider value={cancelRef}>
          {children}
        </LeastDestructiveBtnRefContext.Provider>
      </AlertDialogContent>
    </AlertDialog>
  );
};
