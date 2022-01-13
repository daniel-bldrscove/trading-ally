import { Box, useColorModeValue } from '@chakra-ui/react';
import { LayoutWrapper } from './LayoutWrapper';
import { TradeHistory } from './TradeHistory';
import { LogTrade } from './LogTrade';

const formConfig = {
  invalidateQueries: 'trades',
  postRoute: '/api/create-log-trade',
};

const Layout = (): JSX.Element => {
  return (
    <Box
      as="section"
      className="main-layout-section"
      flexGrow={1}
      bg={useColorModeValue('brand.gray.50', 'brand.gray.400')}
    >
      <LayoutWrapper mt="5rem" mb="5rem">
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
        <TradeHistory />
      </LayoutWrapper>
    </Box>
  );
};

export default Layout;
