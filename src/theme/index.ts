import { extendTheme, ThemeConfig, theme as base } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'system',
};

const theme = extendTheme({
  ...config,
  styles: {
    global: (props: ThemeConfig) => ({
      body: {
        bg: mode('white', 'brand.gray.400')(props),
      },
    }),
  },
  fonts: {
    heading: `Murecho ${base.fonts?.heading}`,
    body: `Murecho ${base.fonts?.body}`,
  },
  colors: {
    brand: {
      gray: {
        '50': '#eff3fa',
        '100': '#b6c3cc',
        '200': '#7d868c',
        '300': '#44494d',
        '400': '#1f252c',
        '600': '#191b24',
        '700': '#151920',
        '800': '#0e1112',
        '900': '#000000',
      },
      green: {
        '50': '#E8FDF3',
        '100': '#BEF8DD',
        '200': '#95F4C8',
        '300': '#6BF0B2',
        '400': '#41EB9C',
        '500': '#18E787',
        '600': '#13B96C',
        '700': '#0E8B51',
        '800': '#0A5C36',
        '900': '#052E1B',
      },
      blue: {
        '50': '#E8F5FC',
        '100': '#BFE2F7',
        '200': '#97CFF2',
        '300': '#6EBCED',
        '400': '#45AAE8',
        '500': '#1C97E3',
        '600': '#1779B5',
        '700': '#115A88',
        '800': '#0B3C5B',
        '900': '#061E2D',
      },
    },
  },
});

export default theme;
