import React from 'react';
import { Box } from '@chakra-ui/react';

type ComponentWrapperProps = {
  id?: string;
  children: React.ReactNode;
};

export default function ComponentWrapper({
  id,
  children,
  ...props
}: ComponentWrapperProps): JSX.Element {
  return (
    <Box p={[4, 0]} id={id} {...props}>
      {children}
    </Box>
  );
}
