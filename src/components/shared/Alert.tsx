/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useContext } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import {
  ModalStatesContext,
  LeastDestructiveBtnRefContext,
} from '../../utils/createContext';

interface AlertProps {
  children: React.ReactNode;
}

export const Alert = ({ children }: AlertProps): JSX.Element => {
  const context = useContext(ModalStatesContext);
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
        <LeastDestructiveBtnRefContext.Provider value={cancelRef}>
          {children}
        </LeastDestructiveBtnRefContext.Provider>
      </AlertDialogContent>
    </AlertDialog>
  );
};
