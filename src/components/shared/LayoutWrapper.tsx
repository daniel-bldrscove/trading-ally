import React from 'react';
import { Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
  mt?: string;
  mb?: string;
  px?: string[];
}

export const LayoutWrapper = ({
  children,
  ...props
}: LayoutProps): JSX.Element => {
  return (
    <Container
      className="layout-wrapper"
      maxW={['xl', '95%', '5xl', '85%', '75%']}
      mx="auto"
      p={0}
      px={['.5rem', '1.5rem', '2rem']}
      position="relative"
      display="block"
      minHeight="full"
      flexGrow={1}
      {...props}
    >
      {children}
    </Container>
  );
};
