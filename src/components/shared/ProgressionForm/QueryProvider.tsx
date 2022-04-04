import * as React from 'react';
import { QueryStateType, ProviderValue } from '../../../@types/log-trade-types';

const QueryContext = React.createContext<ProviderValue | null>(null);

export function useQueryContext() {
  const context = React.useContext(QueryContext);
  if (!context) {
    throw new Error(
      'useQueryContext must be used inside the QueryProvider component',
    );
  }
  return context;
}

const reducerFunc = (
  state: QueryStateType,
  action: {
    formStatus: string;
  },
): QueryStateType => {
  switch (action.formStatus) {
    case 'idle':
      return {
        ...state,
        formStatus: 'idle',
        success: null,
        error: null,
      };
    case 'readyToSubmit':
      return {
        ...state,
        formStatus: 'readyToSubmit',
        success: null,
        error: null,
      };
    case 'submitted':
      return {
        ...state,
        formStatus: 'idle',
        success: null,
        error: null,
      };
    case 'submitting':
      return {
        ...state,
        formStatus: 'submitting',
        success: null,
        error: null,
      };
    case 'canceled':
      // TODO: how to reset Formik field values?
      // call reducer init to rest form?
      return {
        ...state,
        formStatus: 'canceled',
        success: null,
        error: null,
      };
    default:
      throw new Error(
        'This error should not be happening - Check your switch query provider switch case',
      );
  }
};

const defaultState: QueryStateType = {
  preFillValues: null, // TODO: check if this is needed
  tempSummaryValues: {
    date: '',
    execTime: '',
    posEffect: '',
    price: 0,
    qty: 1,
    side: '',
    spread: '',
    ticker: '',
  },
  route: '', // TODO: probably not needed
  queriesToInvalidate: '', // TODO: probably not needed
  formStatus: 'idle', // 'idle', 'readyToSubmit', 'submitted'
  success: null,
  error: null,
};

const init = (initialState: any) => {
  return {
    ...initialState,
  };
};

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = {
    ...defaultState,
  };

  const [state, dispatch] = React.useReducer(reducerFunc, initialState, init);
  // placeholder
  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
}
