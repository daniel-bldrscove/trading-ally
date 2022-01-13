import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export const FeedbackText = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Box pr={4} mb={[4, 0]}>
      <Text
        fontSize="md"
        fontWeight="medium"
        color={useColorModeValue('brand.gray.300', 'white')}
      >
        {children}
      </Text>
    </Box>
  );
};
