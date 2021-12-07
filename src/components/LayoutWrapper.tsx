import React from 'react';
import { Container } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: Props): JSX.Element => {
  return (
    <Container
      className="layout-wrapper"
      maxW={['xl', '95%', '5xl']}
      mx="auto"
      p={0}
      position="relative"
      display="block"
    >
      {children}
    </Container>
  );
};
