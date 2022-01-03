import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const SubmissionFailedMsg = ({ children }: Props): JSX.Element => {
  return (
    <Box pr={6} display="flex" alignItems="center">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('brand.gray.300', 'brand.red.400')}
      >
        {children}
      </Text>
    </Box>
  );
};
