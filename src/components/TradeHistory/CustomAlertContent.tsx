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
import {
  ModalStatesContext,
  LeastDestructiveBtnRefContext,
} from './CreateContext';

export const CustomAlertContent = (): JSX.Element => {
  const context = useContext(ModalStatesContext);
  const cancelRef = useContext(LeastDestructiveBtnRefContext);

  return (
    <>
      <AlertDialogHeader>
        <Heading as="h4">Delete this trade</Heading>
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
