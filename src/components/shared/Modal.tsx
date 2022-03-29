import {
  Modal as CenterModal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { useDialogContext } from '../TradeHistory/DialogProvider';

interface ModalData {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalData): JSX.Element => {
  const { isModalOpen, onModalClose } = useDialogContext();
  return (
    <CenterModal
      size="4xl"
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      isOpen={isModalOpen}
      onClose={onModalClose}
    >
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </CenterModal>
  );
};
