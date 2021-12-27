import { useContext } from 'react';
import {
  Heading,
  Text,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ModalContext } from './index';
import { RefContext } from '../shared/Alert';

export const CustomAlertContent = (): JSX.Element => {
  const context = useContext(ModalContext);
  const cancelRef = useContext(RefContext);

  return (
    <>
      <AlertDialogHeader>
        <Heading as="h4">This is the Alert! Title</Heading>
      </AlertDialogHeader>
      <ModalCloseButton onClick={context?.onAlertClose} />
      <AlertDialogBody>
        <Text>Are you sure you want to delete this trade?</Text>
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={context?.onAlertClose}>
          No
        </Button>
        <Button colorScheme="red" ml={3}>
          Yes
        </Button>
      </AlertDialogFooter>
    </>
  );
};
