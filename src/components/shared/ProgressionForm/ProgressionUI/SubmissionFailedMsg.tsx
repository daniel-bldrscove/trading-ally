import {
  Heading,
  VStack,
  useColorModeValue,
  Button,
  Text,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export const SubmissionFailedMsg = () => {
  const headingColor = useColorModeValue('brand.red.500', 'brand.red.500');

  const {
    status: { error },
    resetForm,
    setStatus,
  } = useFormikContext();

  const handleReset = () => {
    resetForm({
      errors: {
        date: 'unknown',
      },
    });
    setStatus({
      formStatus: 'idle',
      success: null,
      error: null,
    });
  };

  if (error) {
    return (
      <VStack
        spacing="24px"
        align="flex-start"
        className="submission-failed-container"
      >
        <Heading
          as="h6"
          minWidth={72}
          pr={2}
          mb={['0.5rem', '0.5rem', '0rem']}
          size="lg"
          color={headingColor}
        >
          Encountered an error
        </Heading>
        <Text mt="1rem !important" fontSize="1.3rem">
          Submission failed 😕
        </Text>
        <Text
          mt=".25rem !important"
          fontWeight="bold"
          color="Background.red.500"
        >
          {error.message}
        </Text>
        <Button
          minWidth="auto"
          type="button"
          onClick={() => handleReset()}
          colorScheme="red"
        >
          Reset &amp; Try Again
        </Button>
      </VStack>
    );
  } else {
    return null;
  }
};
