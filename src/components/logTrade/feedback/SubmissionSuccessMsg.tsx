import { useEffect } from 'react';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
import { useSubmissionResult } from '../../../utils/submissionResultHelper';
import { FeedbackText } from './FeedbackText';

export const SubmissionSuccessMsg = (): JSX.Element => {
  const { cancelForm } = useFormFilledState();
  const { submittedResult } = useSubmissionResult();
  const headingColor = useColorModeValue('brand.green.700', 'brand.green.400');

  useEffect(() => {
    // fast confirm is mainly used to close a modal instantly, rather then setting a timeout
    if (!submittedResult.fastConfirm) {
      setTimeout(() => {
        cancelForm();
      }, 4000);
    }
  });

  return (
    <Flex
      mt={2}
      className="submission-success-container"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
      <Heading
        as="h6"
        minWidth={72}
        pr={2}
        mb={['0.5rem', '0.5rem', '0rem']}
        size="md"
        color={headingColor}
      >
        Submission Processed!
      </Heading>
      <FeedbackText>{submittedResult.message}</FeedbackText>
    </Flex>
  );
};
