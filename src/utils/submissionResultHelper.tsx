import axios from 'axios';
import React, {
  useMemo,
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from 'react';
import { useQueryClient } from 'react-query';
import {
  HandleSubmitFunctionProps,
  SubmissionResultCtx,
  SubmittedResult,
} from '../@types/log-trade-types';

export const defaultSubmissionResults = {
  submitted: null,
  success: null,
  message: '',
  fastConfirm: null,
};

const SubmissionResult = createContext<SubmissionResultCtx | any>(
  defaultSubmissionResults,
);

// consume context and methods in child components
const useSubmissionResult = (): {
  submittedResult: SubmittedResult;
  onSubmit: HandleSubmitFunctionProps;
  setSubmittedResult: Dispatch<SetStateAction<Record<string, unknown>>>;
} => {
  const queryClient = useQueryClient();
  const context = useContext(SubmissionResult);

  // check context is used correctly
  if (!context) {
    throw new Error(
      `useSubmissionResult must be used within a SubmissionResultProvider`,
    );
  }

  const [submittedResult, setSubmittedResult] = context;

  // use for Formik's onSubmit handler
  const onSubmit: HandleSubmitFunctionProps = async (
    fieldValues,
    actions,
    formConfig,
  ) => {
    const { invalidateQueries, postRoute } = formConfig || {};

    if (!postRoute) {
      throw new Error('postRoute not loaded!');
    }

    try {
      // log trade data
      await axios.post(postRoute, {
        ...fieldValues,
      });
      setSubmittedResult({
        submitted: true,
        success: true,
        message:
          'You have successfully logged your trade! Look for it in the Trade History section below.',
      });
      actions.setSubmitting(false);
      // refresh trade data
      queryClient.invalidateQueries(invalidateQueries);
    } catch (error) {
      actions.setSubmitting(false);
      if (axios.isAxiosError(error)) {
        setSubmittedResult({
          submitted: true,
          success: false,
          message: error.message,
        });
      } else {
        throw new Error(`Encountered error: ${error}`);
      }
    }
  };

  // consume context and methods in child components
  return {
    onSubmit,
    submittedResult,
    setSubmittedResult,
  };
};

// wrap children with this provider
const SubmissionResultProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [submittedResult, setSubmittedResult] = useState(
    defaultSubmissionResults,
  );

  // memoized state value
  const submittedResultValues = useMemo(
    () => [submittedResult, setSubmittedResult],
    [submittedResult, setSubmittedResult],
  );
  return (
    <SubmissionResult.Provider value={submittedResultValues}>
      {children}
    </SubmissionResult.Provider>
  );
};

export { useSubmissionResult, SubmissionResultProvider };
