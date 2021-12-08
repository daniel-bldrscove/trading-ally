import React from 'react';
import { Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
  mt?: string;
  px?: string[];
}

export const LayoutWrapper = ({
  children,
  ...props
}: LayoutProps): JSX.Element => {
  return (
    <Container
      className="layout-wrapper"
      maxW={['xl', '95%', '5xl']}
      p={0}
      mx="auto"
      px={['.5rem', '1.5rem', '2rem']}
      position="relative"
      display="block"
      {...props}
    >
      {children}
    </Container>
  );
};
