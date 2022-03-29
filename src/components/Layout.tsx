import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box
      as="section"
      className="main-layout-section"
      flexGrow={1}
      bg={useColorModeValue('brand.gray.50', 'brand.gray.400')}
    >
      {children}
    </Box>
  );
};

export default Layout;
