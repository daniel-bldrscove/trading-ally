import { createContext, RefObject } from 'react';

interface ModalState {
  isModalOpen: boolean;
  isAlertOpen: boolean;
  onModalOpen: () => void;
  onAlertOpen: () => void;
  onModalClose: () => void;
  onAlertClose: () => void;
}

type ContextType = RefObject<HTMLButtonElement>;

// pass isOpen, onOpen, onClose modal/alert states
export const ModalStatesContext = createContext<ModalState | null>(null);

// pass the least desctructive HTMLButtonElement to the alert parent
export const LeastDestructiveBtnRefContext = createContext<ContextType | null>(
  null,
);
