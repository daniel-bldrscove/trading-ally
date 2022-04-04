import * as React from 'react';
import { useQueryClient } from 'react-query';
import { FormFields } from '../@types/log-trade-types';
import { FormikHelpers } from 'formik';

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

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}. ${result.message}`);
  }

  return result;
};

export default function useMutateTradeData() {
  const queryClient = useQueryClient();

  const onSubmit = React.useCallback(
    (
      fieldValues: FormFields,
      actions: FormikHelpers<FormFields>,
      postRoute: string,
      invalidateQueries: string | null = '',
    ) => {
      console.log('Submitting form');
      try {
        run(postRoute, fieldValues).then((data) => {
          console.log('Formik actions: ', actions);
          console.log('Successful POST request: ', data);
          // clear out form fields and reset Formik back to initial state
          actions.resetForm();

          if (!invalidateQueries) {
            throw new Error(
              'invalidateQueries not provided to useMutateTradeData!',
            );
          }

          queryClient.invalidateQueries(invalidateQueries);
        });
      } catch (error) {
        console.log('Error in creating new trade!: ', error);
        return;

        // TODO:
        // handle dispatch errors - display failed message and options
        // cancel button
        // try again button
        // if user cancels - clear out form & fade out ProgressionUI
        // if user tries again, try to resend request

        // dispatch({
        //   status: 'rejected',
        //   data: null,
        //   error: error,
        // });
      }
    },
    [queryClient],
  );

  return { onSubmit };
}
