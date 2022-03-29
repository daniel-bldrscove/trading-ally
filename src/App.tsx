import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  Box,
  ChakraProvider,
  Flex,
  FormControl,
  Input,
} from '@chakra-ui/react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { LogTrade } from './components/LogTrade';
import { LayoutWrapper } from './components/shared/LayoutWrapper';
import TitleSection from './components/shared/TitleSections';
import TradeHistory from './components/TradeHistory';
import theme from './theme';
import './styles.css';

const formConfig = {
  invalidateQueries: 'trades',
  postRoute: '/api/create-log-trade',
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
                <LogTrade
                  w="full"
                  mb={['0', '10']}
                  heading="Log your latest trade"
                  formConfig={formConfig}
                  gridTemplateCols={[
                    'repeat(2,1fr)',
                    'repeat(2,1fr)',
                    'repeat(3,1fr)',
                    'repeat(4,1fr)',
                    'repeat(8,1fr)',
                  ]}
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
