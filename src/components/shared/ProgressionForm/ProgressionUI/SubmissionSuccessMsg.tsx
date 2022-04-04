import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
// import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
// import { useSubmissionResult } from '../../../utils/submissionResultHelper';
import { FeedbackText } from './FeedbackText';

export const SubmissionSuccessMsg = (): JSX.Element => {
  // TODO: check to see if Formik provides a hook letting you know if submission success / fail
  // fade out the ProgressionUI
  // handle dispatch success - display success message
  // return {
  //   formStatus: 'submitted',
  //   success: true,
  //   error: null,
  // };
  const headingColor = useColorModeValue('brand.green.700', 'brand.green.400');

  // useEffect(() => {
  //   // fast confirm is mainly used to close a modal instantly, rather then setting a timeout
  //   if (!submittedResult.submittedFromModal) {
  //     setTimeout(() => {
  //       cancelForm();
  //     }, 4000);
  //   }
  // });

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
      {/* <FeedbackText>{submittedResult.message}</FeedbackText> */}
      <FeedbackText>
        {'Success! Still figuring out success message format'}
      </FeedbackText>
    </Flex>
  );
};
