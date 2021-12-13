import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';

interface FormikValues {
  date: string;
  execTime: string;
  spread: string;
  side: string;
  qty: number;
  symbol: string;
  price: number;
  posEffect: string;
}

export const SubmissionSummary = ({
  date,
  execTime,
  side,
  qty,
  symbol,
  price,
}: FormikValues): JSX.Element => {
  return (
    <Box pl={[0, 0, 4]} pr={4} mb={[8, 4, 2]}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('brand.gray.300', 'brand.gray.100')}
      >
        {side === ''
          ? ''
          : side === 'long'
          ? `You bought ${qty} shares of ${symbol} at $${price} / share, on ${format(
              Date.parse(date),
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`
          : `You sold ${qty} shares of ${symbol} at $${price} / share, on ${format(
              Date.parse(date),
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`}
      </Text>
    </Box>
  );
};
