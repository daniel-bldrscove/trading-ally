import { createContext } from 'react';
import { ModalState, LeastDestructiveButton } from './types';

// pass modal/alert states and get/set row data callbacks
export const ModalStatesContext = createContext<ModalState | null>(null);

// pass the least desctructive HTMLButtonElement to the alert parent
export const LeastDestructiveBtnRefContext =
  createContext<LeastDestructiveButton | null>(null);
