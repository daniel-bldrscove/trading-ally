import React from 'react';
import { Box } from '@chakra-ui/react';
import { SubmissionFailedMsg } from './feedback/SubmissionFailedMsg';
import { SubmissionSuccessMsg } from './feedback/SubmissionSuccessMsg';
import { useFormFilledState } from '../../utils/logTradeFormProgressionHelper';
import { useSubmissionResult } from '../../utils/submissionResultHelper';
import { FeedbackContainer } from './feedback/FeedbackContainer';
import { DefaultPreSubmissionSummary } from './feedback/DefaultPreSubmissionSummary';

export const ProgressionUIController = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // must be used inside FormProgressProvider AND
  // inside Formik since this hook consumes useFormikContext()
  const { formFilled } = useFormFilledState();
  const { submittedResult } = useSubmissionResult(); // must be used inside SubmissionResultProvider
  const { submitted, success } = submittedResult;

  return (
    <FeedbackContainer
      formFilled={formFilled}
      submittedResult={{ submitted, success }}
    >
      {
        // step 1: review form and submit/cancel
        formFilled && !submitted ? (
          <Box>
            {
              // if a custom pre-submission component is not passed, use the default one
              !children ? <DefaultPreSubmissionSummary /> : children
            }
          </Box>
        ) : // step 2a: submission failed, reset and try again
        submitted && !success ? (
          <SubmissionFailedMsg />
        ) : // step 2b: submission succeeded, clear and reset form
        submitted && success ? (
          <SubmissionSuccessMsg />
        ) : null
      }
    </FeedbackContainer>
  );
};
