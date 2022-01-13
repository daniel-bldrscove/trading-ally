import { ChangeEvent, CSSProperties, Ref, RefObject } from 'react';
import { Column, UseRowSelectRowProps } from 'react-table';

export interface ModalStatesProps extends Record<string, unknown> {
  isModalOpen: boolean;
  isAlertOpen: boolean;
  onModalOpen: () => void;
  onAlertOpen: () => void;
  onModalClose: () => void;
  onAlertClose: () => void;
  passDataToModalContent: (data: Record<string, unknown> & DataRow) => void;
  rowData: DataRow;
}

export type DataRow = {
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
      collection: Record<string, unknown>;
      id: string;
    };
  };
  ts: number;
};

export type ColumnFormat = {
  Header: string;
  accessor: string;
  id: string;
  disableSortBy?: boolean;
};

export interface TableProps<T extends Record<string, unknown>> {
  data: T[] & DataRow[];
  columns: Column<T>[] & ColumnFormat[];
  id?: string;
  overflow?: string;
}

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
  rowProps: Record<string, unknown>;
  rest?: Record<string, unknown>;
}
