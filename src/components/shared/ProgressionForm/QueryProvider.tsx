import * as React from 'react';
import {
  QueryStateType,
  ProviderValue,
  FormFields,
} from '../../../@types/log-trade-types';
import { FormikHelpers } from 'formik';

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
        formStatus: 'submitted',
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

const run = async (route: string, fieldValues: FormFields) => {
  const res = await window.fetch(route, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...fieldValues,
    }),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(`HTTP error! Status: ${res.status}. ${result.message}`);
  }
  return res.json();
};

const defaultState: QueryStateType = {
  preFillValues: null,
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
  route: '',
  queriesToInvalidate: '',
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
  ...formConfig
}: {
  children: React.ReactNode;
}) {
  // onSubmit function for Formik
  const onSubmit = React.useCallback(
    (
      fieldValues: FormFields,
      actions: FormikHelpers<FormFields>,
      route: string,
      queriesToInvalidate: string | null = '',
    ) => {
      // call run function and work out logic
      try {
        run(route, fieldValues).then((data) => {
          // do something with the data
          // TODO: invalidate queries
          console.log('Successful POST request: ', data);
        });
      } catch (error) {
        console.log('Error in creating new trade!: ', error);
        return;
        // dispatch the error
        // dispatch({
        //   status: 'rejected',
        //   data: null,
        //   error: error,
        // });
      }
    },
    [],
  );

  const initialState = {
    onSubmit,
    ...defaultState,
    ...formConfig,
  };

  const [state, dispatch] = React.useReducer(reducerFunc, initialState, init);
  // placeholder
  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
}
