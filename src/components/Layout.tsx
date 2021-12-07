import { Box, useColorModeValue } from '@chakra-ui/react';
import { LayoutWrapper } from './LayoutWrapper';
import { TitleSections } from './TitleSections';
import { TradeHistory } from './TradeHistory';

const Layout = (): JSX.Element => {
  return (
    <Box
      as="section"
      className="main-layout-section"
      bg={useColorModeValue('brand.gray.50', 'brand.gray.400')}
      h="full"
    >
      <LayoutWrapper>
        <TitleSections title="Trade History" />
        <TradeHistory />
      </LayoutWrapper>
    </Box>
  );
};

export default Layout;
