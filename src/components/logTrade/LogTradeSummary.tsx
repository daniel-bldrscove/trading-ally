import { useState, useEffect } from 'react';
import { Box, ButtonGroup, Flex, useColorModeValue } from '@chakra-ui/react';
import { PrimaryButton } from '../shared/PrimaryButton';
import { SecondaryButton } from '../shared/SecondaryButton';
import { SummaryText } from './SummaryText';

interface FormikValues {
  fieldValues: {
    date: string;
    execTime: string;
    spread: string;
    side: string;
    qty: number;
    symbol: string;
    price: number;
    posEffect: string;
  };
  isSubmitting: boolean;
  touched: Record<string, unknown>;
  errors: Record<string, unknown>;
}

export const LogTradeSummary = ({
  fieldValues,
  isSubmitting,
  touched,
  errors,
}: FormikValues): JSX.Element => {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const tradeSummaryBgColor = useColorModeValue('gray.200', 'brand.gray.600');

  useEffect(() => {
    // if at least one field has been touched && there are no keys in Formik's error object
    if (Object.keys(touched).length >= 1 && Object.keys(errors).length === 0) {
      setActiveError(false);
    } else {
      setActiveError(true);
    }
  }, [touched, errors]);

  console.log('Incoming errors: ', errors);

  return (
    <Box
      bg={tradeSummaryBgColor}
      w="full"
      p={[8, 4, 2]}
      display="flex"
      justifyContent="end"
      borderBottomRadius="md"
    >
      {!activeError && isReadyToSubmit ? (
        <Flex
          w="full"
          align="center"
          justify="space-between"
          wrap={['wrap', 'wrap', 'nowrap']}
        >
          <SummaryText {...fieldValues} />
          <ButtonGroup isAttached variant="filled">
            <SecondaryButton
              type="button"
              onClick={() => setIsReadyToSubmit(false)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton w={32} isLoading={isSubmitting} type="submit">
              Submit
            </PrimaryButton>
          </ButtonGroup>
        </Flex>
      ) : (
        <SecondaryButton
          type="button"
          onClick={() => setIsReadyToSubmit(true)}
          disabled={activeError}
        >
          Review Trade
        </SecondaryButton>
      )}
    </Box>
  );
};
