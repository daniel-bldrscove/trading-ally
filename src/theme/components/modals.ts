import { ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const modalOverrides = {
  Modal: {
    baseStyle: (props: ThemeConfig): Record<string, unknown> => ({
      dialog: {
        bg: mode('#e5eaed', 'brand.gray.400')(props),
      },
    }),
  },
};
