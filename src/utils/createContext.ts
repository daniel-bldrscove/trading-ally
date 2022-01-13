import { createContext } from 'react';
import {
  ModalStatesProps,
  LeastDestructiveButton,
} from '../@types/trade-history-types';

// pass modal/alert states and rowData
export const ModalStatesContext = createContext<ModalStatesProps | null>(null);

// pass the least desctructive HTMLButtonElement to the alert parent
export const LeastDestructiveBtnRefContext =
  createContext<LeastDestructiveButton | null>(null);
