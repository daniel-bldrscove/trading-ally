import { Box, useColorModeValue } from '@chakra-ui/react';
import { LayoutWrapper } from './LayoutWrapper';
import { TradeHistory } from './TradeHistory';
import { LogTrade } from './logTrade';

const Layout = (): JSX.Element => {
  return (
    <Box
      as="section"
      className="main-layout-section"
      flexGrow={1}
      bg={useColorModeValue('brand.gray.50', 'brand.gray.400')}
    >
      <LayoutWrapper mt="5rem" mb="5rem">
        <LogTrade w="full" mb={10} />
        <TradeHistory />
      </LayoutWrapper>
    </Box>
  );
};

export default Layout;
