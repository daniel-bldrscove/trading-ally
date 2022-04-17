import * as React from 'react';
import { useQueryClient } from 'react-query';
import { FormFields, ProgressionFormProps } from '../@types/log-trade-types';
import { FormikHelpers } from 'formik';

const run = async (
  route: string,
  fieldValues: FormFields,
  collectionName: ProgressionFormProps['submissionConfig']['collectionName'] = '',
  collectionId: ProgressionFormProps['submissionConfig']['collectionName'] = '',
) => {
  let reqBody;

  if (!collectionName || !collectionId) {
    reqBody = {
      ...fieldValues,
    };
  } else {
    reqBody = {
      fieldValues,
      collectionName,
      collectionId,
    };
  }

  const res = await window.fetch(route, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...reqBody,
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
      formikBag: FormikHelpers<FormFields>,
      postRoute: ProgressionFormProps['submissionConfig']['route'] = '',
      collectionName: ProgressionFormProps['submissionConfig']['collectionName'] = '',
      collectionId: ProgressionFormProps['submissionConfig']['collectionName'] = '',
      invalidateQueries: ProgressionFormProps['submissionConfig']['queriesToInvalidate'] = '',
      closeModal: ProgressionFormProps['submissionConfig']['closeModal'] = () => {},
    ) => {
      if (!fieldValues || !formikBag || !postRoute) {
        throw new Error(
          'The form field values, formikBag, or the post route is undefined! Make sure the values exist.',
        );
      }

      run(postRoute, fieldValues, collectionName, collectionId).then(
        () => {
          formikBag.setStatus({
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

          if (closeModal) {
            closeModal();
          }
        },
        (error) => {
          console.error('onRejected function called: ' + error);
          formikBag.setStatus({
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
