import { useContext } from 'react';
import { Flex, Stack, Button } from '@chakra-ui/react';
import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
import { useSubmissionResult } from '../../../utils/submissionResultHelper';
import { FeedbackText } from './FeedbackText';
import { ModalStatesContext } from '../../../utils/createContext';

export const SubmissionFailedMsg = (): JSX.Element => {
  const { onModalClose } = useContext(ModalStatesContext) || {};
  const { cancelForm } = useFormFilledState();
  const { submittedResult } = useSubmissionResult();

  return (
    <Flex
      className="submission-failed-container"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
      {submittedResult.submittedFromModal ? (
        <>
          <Stack mb={4}>
            <FeedbackText fontSize="1.3rem">Submission failed 😕.</FeedbackText>
            <FeedbackText fontWeight="bold" color="brand.red.500">
              {submittedResult.message}
            </FeedbackText>
            <FeedbackText>
              It is likely that this trade may have been edited from a different
              device and no longer exists. Try closing this modal and try again.
            </FeedbackText>
          </Stack>
          <Button
            minWidth="auto"
            type="button"
            onClick={onModalClose}
            colorScheme="red"
          >
            Close &amp; Try Again
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </Flex>
  );
};
