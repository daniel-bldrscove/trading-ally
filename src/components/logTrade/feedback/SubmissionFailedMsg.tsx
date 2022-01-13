import { Flex, Button } from '@chakra-ui/react';
import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
import { useSubmissionResult } from '../../../utils/submissionResultHelper';
import { FeedbackText } from './FeedbackText';

export const SubmissionFailedMsg = (): JSX.Element => {
  const { cancelForm } = useFormFilledState();
  const { submittedResult } = useSubmissionResult();

  return (
    <Flex
      className="submission-failed-container"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
      <FeedbackText>
        Submission failed 😕. {submittedResult.message}
      </FeedbackText>
      <Button
        minWidth="auto"
        type="button"
        onClick={cancelForm}
        colorScheme="red"
      >
        Reset &amp; Try Again
      </Button>
    </Flex>
  );
};
