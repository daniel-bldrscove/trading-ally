import { useContext } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSubmissionResult } from '../../utils/submissionResultHelper';
import { useFormikContext } from 'formik';
import { TradeDataPropVals } from '../../@types/log-trade-types';
import { ModalStatesContext } from '../../utils/createContext';
import { useFormFilledState } from '../../utils/logTradeFormProgressionHelper';

export const useMutateTradeData = (): {
  handleSubmit: (updatedFieldData: Record<string, unknown>) => void;
} => {
  const { onModalClose } = useContext(ModalStatesContext) || {};
  const { cancelForm } = useFormFilledState();
  const queryClient = useQueryClient();

  // hook for handling update or delete mutation requests
  const mutation = useMutation((mutateData: Record<string, unknown>) => {
    return axios.post('/api/update-trade', mutateData);
  });

  // custom submission result hook
  const { setSubmittedResult } = useSubmissionResult();

  // Formik hook
  const { setSubmitting } = useFormikContext<TradeDataPropVals>();

  const handleSubmit = (updatedFieldData: Record<string, unknown>) => {
    setSubmitting(true);
    mutation.mutate(updatedFieldData, {
      onSuccess: () => {
        // must come first when calling from inside mutate method
        setSubmittedResult({
          submitted: true,
          success: true,
          message: 'Successfully updated your trade!',
          submittedFromModal: true,
        });
        //clear submittedResult state and form values
        cancelForm();
        onModalClose?.();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        // must come first when calling from inside mutate method
        setSubmittedResult({
          submitted: true,
          success: false,
          message: error?.message,
          submittedFromModal: true,
        });
        console.log('Encountered a mutation error: ', error.toJSON());
      },
      onSettled: () => {
        setSubmitting(false);
        queryClient.invalidateQueries('trades'); // refresh queries
      },
    });
  };

  return { handleSubmit };
};
