import React from 'react';
import { Box } from '@chakra-ui/react';

export const ComponentWrapper = ({
  id,
  children,
  ...props
}: {
  id?: string;
  name?: string;
  children: React.ReactNode;
}) => {
  return (
    <Box p={[4, 0]} id={id} {...props}>
      {children}
    </Box>
  );
};
