import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';

interface FormikValues {
  date: string;
  execTime: string;
  spread: string;
  side: string;
  qty: number;
  ticker: string;
  price: number;
  posEffect: string;
}

export const SummaryText = ({
  date,
  execTime,
  side,
  qty,
  ticker,
  price,
}: FormikValues): JSX.Element => {
  console.log('to log date: ', date);
  return (
    <Box pl={[0, 0, 4]} pr={4} mb={[8, 4, 2]}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('brand.gray.300', 'brand.gray.100')}
      >
        {side === '' || qty === 0
          ? ''
          : qty > 0 && side === 'long'
          ? `You bought ${qty} shares of ${ticker} at $${price} / share, on ${format(
              new Date(date.replace(/-/g, '/')), // change hyphens to forward slash otherwise it outputs one day behind
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`
          : `You sold ${qty} shares of ${ticker} at $${price} / share, on ${format(
              Date.parse(date),
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`}
      </Text>
    </Box>
  );
};
