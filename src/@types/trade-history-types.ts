import { ChangeEvent, CSSProperties, Ref, RefObject } from 'react';
import { Column, UseRowSelectRowProps } from 'react-table';

export interface ModalStatesProps extends Record<string, unknown> {
  isModalOpen: boolean;
  isAlertOpen: boolean;
  onModalOpen: () => void;
  onAlertOpen: () => void;
  onModalClose: () => void;
  onAlertClose: () => void;
  passDataToModalContent: (data: Record<string, unknown> & Row) => void;
  rowData: Row;
}

export type Row = {
  data: {
    date: string;
    execTime: string;
    spread: string;
    side: string;
    qty: number;
    ticker: string;
    price: number;
    posEffect: string;
  };
  ref: {
    '@ref': {
      collection: {
        '@ref': {
          collection: Record<string, unknown>;
          id: string;
        };
      };
      id: string;
    };
  };
  ts: number;
};

export type HistoryTableProps = {
  columns: Column<Row>[];
  data: Row[];
};

export type RowDataProps = {
  getToggleRowSelectedProps?: UseRowSelectRowProps<
    Record<string, unknown>
  >['getToggleRowSelectedProps'];
  original?: Record<string, unknown>;
};

export type ClickableCheckboxProps<T> = {
  onChange?: (e: ChangeEvent<Element>) => void;
  checked?: boolean;
  title?: string;
  indeterminate?: boolean;
  style?: T;
  className?: string;
  role?: string;
  rest?: T;
};

export type LeastDestructiveButton = RefObject<HTMLButtonElement>;

export interface SelectedRowProps {
  onChange?: (e: ChangeEvent<Element>) => void;
  checked?: boolean;
  title?: string;
  indeterminate?: boolean;
  style?: CSSProperties;
  className?: string;
  role?: string;
}

export type RowMenuRefType = Ref<HTMLDivElement>;

export interface RowMenuProps {
  rowTableData: Row;
  rest?: Record<string, unknown>;
}
