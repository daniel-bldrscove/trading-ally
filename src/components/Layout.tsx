// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Layout: React.FC = () => {
  return (
    <section className="main-layout-section">
      <Box bg={useColorModeValue('brand.gray.100', 'brand.gray.400')} h="32">
        <p>Main Layout</p>
      </Box>
    </section>
  );
};

export default Layout;
