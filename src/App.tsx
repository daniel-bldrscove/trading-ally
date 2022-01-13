import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Footer from './components/Footer';
import theme from './theme';
import './styles.css';

export const App: React.FC = function () {
  const queryClient = new QueryClient();
  const navbarHeight = [16, 20, 24];

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box position="relative" className="main-container">
          <Nav navbarHeight={navbarHeight} />
          <Flex
            pt={navbarHeight}
            direction="column"
            justify="space-between"
            height={'calc(100vh - 7rem)'}
          >
            <Layout />
            <Footer />
          </Flex>
        </Box>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
