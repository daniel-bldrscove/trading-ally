import { useContext } from 'react';
import {
  Button,
  Heading,
  Text,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ModalStatesContext } from './CreateContext';

export const CustomModalContent = (): JSX.Element => {
  const modalStateContext = useContext(ModalStatesContext);
  return (
    <>
      <ModalHeader>
        <Heading as="h4">Edit Trade</Heading>
      </ModalHeader>
      <ModalCloseButton onClick={modalStateContext?.onModalClose} />
      <ModalBody>
        <Text>
          This is the modal body paragraph text that would show up as the main
          modal body paragraph text.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={modalStateContext?.onModalClose}
        >
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </>
  );
};
