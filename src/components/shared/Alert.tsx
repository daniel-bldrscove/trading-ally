import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';

interface AlertProps {
  data: {
    title: string;
    disclaimer: string;
  };
  isAlertOpen: boolean;
  onAlertClose: () => void;
}

export const Alert = ({
  data,
  isAlertOpen,
  onAlertClose,
}: AlertProps): JSX.Element => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
        isOpen={isAlertOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{data.title}</AlertDialogHeader>
          <ModalCloseButton onClick={onAlertClose} />
          <AlertDialogBody>{data.disclaimer}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
