import * as React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useQueryContext } from '../QueryProvider';

export const FeedbackContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const summaryBg = useColorModeValue('white', 'brand.gray.800');

  const {
    state: { formStatus, error },
  } = useQueryContext();

  const borderColor = React.useRef('');

  React.useLayoutEffect(() => {
    if (formStatus !== 'idle' || !error) {
      borderColor.current = 'brand.green.400';
    } else {
      borderColor.current = 'brand.green.400';
    }
  }, [error, formStatus]);

  return (
    <>
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
          borderColor={borderColor.current}
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
};
