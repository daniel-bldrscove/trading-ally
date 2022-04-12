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
    throw new Error(
      `HTTP error in run function. Status: ${res.status}. ${result.message}`,
    );
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
      run(postRoute, fieldValues).then(
        () => {
          actions.setStatus({
            formStatus: 'submitted',
            success: true,
            error: null,
          });

          if (!invalidateQueries) {
            throw new Error(
              'invalidateQueries not provided to useMutateTradeData!',
            );
          }

          queryClient.invalidateQueries(invalidateQueries);
        },
        (error) => {
          console.error('onRejected function called: ' + error);
          actions.setStatus({
            formStatus: 'submitted',
            success: false,
            error: error,
          });
        },
      );
    },
    [queryClient],
  );

  return { onSubmit };
}
