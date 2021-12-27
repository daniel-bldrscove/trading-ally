/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react';
import {
  Modal as CenterModal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { ModalContext } from '../TradeHistory/index';

interface ModalData {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalData): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <CenterModal
      isCentered
      onClose={context!.onModalClose}
      isOpen={context!.isModalOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </CenterModal>
  );
};
