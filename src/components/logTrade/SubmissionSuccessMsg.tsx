import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const SubmissionSuccessMsg = ({ children }: Props): JSX.Element => {
  return (
    <Box pr={6} display="flex" alignItems="center">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('brand.green.600', 'brand.green.400')}
      >
        {children}
      </Text>
    </Box>
  );
};
