import * as React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Footer from './components/Footer';
import theme from './theme';
import './theme/styles.css';

export const App: React.FC = function () {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Flex
        direction="column"
        justify="space-between"
        height={'calc(100vh - 4rem)'}
      >
        <Layout />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};
