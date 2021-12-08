import React from 'react';
import { Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
  mt?: string;
}

export const LayoutWrapper = ({
  children,
  ...props
}: LayoutProps): JSX.Element => {
  return (
    <Container
      className="layout-wrapper"
      maxW={['xl', '95%', '5xl']}
      mx="auto"
      p={0}
      position="relative"
      display="block"
      {...props}
    >
      {children}
    </Container>
  );
};
