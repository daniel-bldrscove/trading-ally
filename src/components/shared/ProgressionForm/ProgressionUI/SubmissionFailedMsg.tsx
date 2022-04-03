import { Flex, Stack, Button } from '@chakra-ui/react';
// import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
// import { useSubmissionResult } from '../../../utils/submissionResultHelper';
import { FeedbackText } from './FeedbackText';
// import { ModalStatesContext } from '../../../utils/createContext';

export const SubmissionFailedMsg = (): JSX.Element => {
  // TODO: figure out logic when user closes modal
  // const { onModalClose } = useContext(ModalStatesContext) || {};

  // figure out logic when user cancels form
  // TODO: const { cancelForm } = useFormFilledState();

  // TODO: figure out submission results
  // const { submittedResult } = useSubmissionResult();

  return (
    <Flex
      className="submission-failed-container"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
      <h1>Encountered an error</h1>
      <h4>Figuring out submission process</h4>
      {/* {submittedResult.submittedFromModal ? (
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
            // TODO: onClick={onModalClose}
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
            // TODO: onClick={cancelForm}
            colorScheme="red"
          >
            Reset &amp; Try Again
          </Button>
        </>
      )} */}
    </Flex>
  );
};
