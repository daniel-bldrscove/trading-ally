import { Dispatch, SetStateAction } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { SubmittedResult } from '../../../@types/log-trade-types';

export const FeedbackContainer = ({
  formFilled,
  submittedResult: { submitted, success },
  children,
}: {
  formFilled: boolean | Dispatch<SetStateAction<boolean | null>> | null;
  submittedResult: Omit<SubmittedResult, 'message' | 'fastConfirm'>;
  children: React.ReactNode;
}): JSX.Element => {
  const summaryBg = useColorModeValue('white', 'brand.gray.800');

  const feedbackBoderColor = () => {
    if ((formFilled && !submitted) || (submitted && success)) {
      return 'brand.green.400';
    }
    return 'brand.red.400';
  };

  return (
    <>
      {
        // once formFilled is true, it's assumed this FeedbackContainer
        // will be needed indefinitely until formFilled is no longer true
        formFilled ? (
          <Flex
            mt={2}
            pl={[4, 0]}
            pr={[4, 0]}
            align="center"
            justify="center"
            className="feedback-container"
          >
            <Flex
              p={4}
              bg={summaryBg}
              border="2px"
              justify="start"
              align="center"
              borderRadius="md"
              width="full"
              borderColor={(() => feedbackBoderColor())()}
            >
              {children}
            </Flex>
          </Flex>
        ) : null
      }
    </>
  );
};
