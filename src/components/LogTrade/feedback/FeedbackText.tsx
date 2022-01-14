import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export const FeedbackText = ({
  children,
  fontSize = 'md',
  fontWeight = 'md',
  ...props
}: {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  mb?: number | string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Box pr={4} mb={[4, 0]}>
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={useColorModeValue('brand.gray.300', 'white')}
        {...props}
      >
        {children}
      </Text>
    </Box>
  );
};
