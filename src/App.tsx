import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { LayoutWrapper } from './components/shared/LayoutWrapper';
import ProgressionForm from './components/shared/ProgressionForm';
import TitleSection from './components/shared/TitleSections';
import TradeHistory from './components/TradeHistory';
import theme from './theme';
import './styles.css';

const submissionConfig = {
  queriesToInvalidate: 'trades',
  preFillValues: null,
  route: '/api/create-log-trade',
};

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
            minHeight={['auto', 'auto', 'calc(100vh - 7rem)']}
          >
            <Layout>
              <LayoutWrapper mt="2rem" mb="5rem">
                <TitleSection>Log Trade</TitleSection>
                <ProgressionForm
                  submissionConfig={submissionConfig}
                  heading="Fill out the fields below!"
                />
                <TitleSection>Trade History</TitleSection>
                <TradeHistory />
              </LayoutWrapper>
            </Layout>
          </Flex>
          <Footer />
        </Box>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
