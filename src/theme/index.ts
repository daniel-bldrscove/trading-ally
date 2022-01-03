import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// default global styles
import { globalStyles } from './globalStyles';

// component overrides
import { buttonOverrides } from './components/buttons';
import { inputOverrides } from './components/inputs';
import { modalOverrides } from './components/modals';

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const overrides = {
  ...globalStyles,
  // Other foundational style overrides continue
  components: {
    ...buttonOverrides,
    ...inputOverrides,
    ...modalOverrides,
    // Other component overrides continue
  },
};

const theme = extendTheme({
  ...config,
  ...overrides,
});

export default theme;
