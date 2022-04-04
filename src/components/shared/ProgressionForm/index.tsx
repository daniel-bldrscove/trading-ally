import * as React from 'react';
import QueryProvider from './QueryProvider';
import ProgressionUI from './ProgressionUI';
import {
  ProgressionFormProps,
  TradeDataPropVals,
  FormFields,
} from '../../../@types/log-trade-types';
import { logTradeValidationSchema } from '../../../utils/validationSchema';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import useMutateTradeData from '../../../utils/useMutateTradeData';
import Fields from './FormUI/Fields';

const initValues = {
  date: '',
  execTime: '',
  spread: 'Stock',
  side: '',
  qty: 1,
  ticker: '',
  price: 0,
  posEffect: '',
};

export default function ProgressionForm({
  submissionConfig: { queriesToInvalidate, preFillValues, route },
  ...rest
}: ProgressionFormProps) {
  const { onSubmit } = useMutateTradeData();

  if (typeof queriesToInvalidate !== 'string') {
    throw new Error('typeof queriesToInvalidate is null or undefined');
  } else if (typeof route !== 'string') {
    throw new Error('typeof route is undefined');
  }

  return (
    <QueryProvider>
      <Formik
        initialValues={preFillValues ? preFillValues : initValues}
        validationSchema={logTradeValidationSchema}
        validateOnMount={true}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, route, queriesToInvalidate)
        }
      >
        {(formikProps: FormikProps<TradeDataPropVals>) => (
          <>
            <Fields formikProps={formikProps} {...rest} />
            <ProgressionUI />
          </>
        )}
      </Formik>
    </QueryProvider>
  );
}

//1 - once user fills out form without errors, queryProvider is
// given a dispatch update that says ok - ready to move on to the next step

//2 - ProgressionUI component now shows up displaying
// a. confirmation message
// b. submit button - sends submission request with data in body
// c. cancel button - clears out form and cancels submission
// d. clear queryProvider state - hiding the ProgressionUI component

//3A - User successfully submits data
// a. display success message
// b. clear out form and any internal state
// d. clear queryProvider state - hiding the ProgressionUI component

//3B - User fails in submitting data
// a. display error message
// b. display try again button
// c. cancel button - clears out form and cancels submission
// d. clear queryProvider state - hiding the ProgressionUI component
