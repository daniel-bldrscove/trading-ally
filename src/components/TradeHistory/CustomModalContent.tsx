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
import { ModalContext } from './index';

export const CustomModalContent = (): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <>
      <ModalHeader>
        <Heading as="h4">This would be the modal title</Heading>
      </ModalHeader>
      <ModalCloseButton onClick={context?.onModalClose} />
      <ModalBody>
        <Text>
          This is the modal body paragraph text that would show up as the main
          modal body paragraph text.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={context?.onModalClose}>
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </>
  );
};
