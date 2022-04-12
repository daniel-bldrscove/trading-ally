import * as React from 'react';
import { Flex, Heading, useColorModeValue, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export const SubmissionSuccessMsg = () => {
  const headingColor = useColorModeValue('brand.green.700', 'brand.green.400');
  const { setStatus, resetForm } = useFormikContext();

  React.useEffect(() => {
    // fade out the ProgressionUI and reset the form
    setTimeout(() => {
      setStatus({
        formStatus: 'idle',
        success: null,
        error: null,
      });

      resetForm({
        errors: {
          date: 'unknown',
        },
      });
    }, 4000);
  }, [setStatus, resetForm]);

  return (
    <Flex
      mt={2}
      mb={2}
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
        size="lg"
        color={headingColor}
      >
        Trade Logged!
      </Heading>
      <Text>
        Look below in the Trade History table for more actions on your trades.
      </Text>
    </Flex>
  );
};
