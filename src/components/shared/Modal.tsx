import {
  Button,
  Modal as CenterModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Lorem } from './Lorem';

interface ModalData {
  data: {
    title: string;
  };
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const Modal = ({
  data,
  isModalOpen,
  onModalClose,
}: ModalData): JSX.Element => {
  return (
    <>
      <CenterModal
        isCentered
        onClose={onModalClose}
        isOpen={isModalOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.title}</ModalHeader>
          <ModalCloseButton onClick={onModalClose} />
          <ModalBody>
            <Lorem />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </CenterModal>
    </>
  );
};
