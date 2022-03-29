import { createContext } from 'react';
import {
  ModalStatesProps,
  LeastDestructiveButton,
} from '../@types/trade-history-types';

// pass modal/alert states and rowData
export const ModalStatesContext = createContext<ModalStatesProps | null>(null);

// TODO: move this into dialog provider

// pass the least destructive HTMLButtonElement to the alert parent
export const LeastDestructiveBtnRefContext =
  createContext<LeastDestructiveButton | null>(null);
