/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react';
import {
  Modal as CenterModal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { ModalStatesContext } from '../../utils/createContext';

interface ModalData {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalData): JSX.Element => {
  const context = useContext(ModalStatesContext);
  return (
    <CenterModal
      size="4xl"
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      onClose={context!.onModalClose}
      isOpen={context!.isModalOpen}
    >
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </CenterModal>
  );
};
