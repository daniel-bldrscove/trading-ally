import {
  // UseColumnOrderInstanceProps,
  // UseColumnOrderState,
  // UseExpandedHooks,
  // UseExpandedInstanceProps,
  // UseExpandedOptions,
  // UseExpandedRowProps,
  // UseExpandedState,
  // UseFiltersColumnOptions,
  // UseFiltersColumnProps,
  // UseFiltersInstanceProps,
  // UseFiltersOptions,
  // UseFiltersState,
  // UseGlobalFiltersColumnOptions,
  // UseGlobalFiltersInstanceProps,
  // UseGlobalFiltersOptions,
  // UseGlobalFiltersState,
  // UseGroupByCellProps,
  // UseGroupByColumnOptions,
  // UseGroupByColumnProps,
  // UseGroupByHooks,
  // UseGroupByInstanceProps,
  // UseGroupByOptions,
  // UseGroupByRowProps,
  // UseGroupByState,
  // UsePaginationInstanceProps,
  // UsePaginationOptions,
  // UsePaginationState,
  // UseResizeColumnsColumnOptions,
  // UseResizeColumnsColumnProps,
  // UseResizeColumnsOptions,
  // UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  // UseRowStateCellProps,
  // UseRowStateInstanceProps,
  // UseRowStateOptions,
  // UseRowStateRowProps,
  // UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  // uncomment plugins being used in the table options
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseSortByOptions<D>,
      UseRowSelectOptions<D> {}
  //     UseFiltersOptions<D>,
  //     UseGlobalFiltersOptions<D>,
  //     UseGroupByOptions<D>,
  //     UsePaginationOptions<D>,
  //     UseResizeColumnsOptions<D>,
  //     UseRowStateOptions<D>,
  //     UseExpandedOptions<D>,

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectHooks<D>,
      UseSortByHooks<D> {}
  //     UseExpandedHooks<D>,
  //     UseGroupByHooks<D>,

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectInstanceProps<D>,
      UseSortByInstanceProps<D> {}
  //     UseColumnOrderInstanceProps<D>,
  //     UseExpandedInstanceProps<D>,
  //     UseFiltersInstanceProps<D>,
  //     UseGlobalFiltersInstanceProps<D>,
  //     UseGroupByInstanceProps<D>,
  //     UsePaginationInstanceProps<D>,
  //     UseRowStateInstanceProps<D>,

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}
  //     UseExpandedState<D>,
  //     UseFiltersState<D>,
  //     UseGlobalFiltersState<D>,
  //     UseGroupByState<D>,
  //     UsePaginationState<D>,
  //     UseResizeColumnsState<D>,

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseSortByColumnOptions<D> {
    isNumeric?: boolean;
  }
  //     UseFiltersColumnOptions<D>,
  //     UseGlobalFiltersColumnOptions<D>,
  //     UseGroupByColumnOptions<D>,
  //     UseResizeColumnsColumnOptions<D>,

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseSortByColumnProps<D> {
    isNumeric?: boolean;
  }
  //     UseFiltersColumnProps<D>,
  //     UseGroupByColumnProps<D>,
  //     UseResizeColumnsColumnProps<D>,

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    // V = any,
  > extends UseGroupByCellProps<D>,
      UseRowStateCellProps<D> {}

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}
}
