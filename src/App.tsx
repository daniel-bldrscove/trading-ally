import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Footer from './components/Footer';
import theme from './theme';
import './theme/styles.css';

export const App: React.FC = function () {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Nav />
        <Flex
          direction="column"
          justify="space-between"
          height={'calc(100vh - 7rem)'}
        >
          <Layout />
          <Footer />
        </Flex>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
