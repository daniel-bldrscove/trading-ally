import { ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customInputStyles = {
  variants: {
    // outline is the default variant
    outline: {
      field: {
        _hover: {
          borderColor: 'brand.green.400',
        },
        _focus: {
          borderColor: 'brand.green.400',
          boxShadow: 'unset',
        },
      },
    },
    // uses same base styles as variant 'outline'
    'single-baseline': (props: ThemeConfig): Record<string, unknown> => ({
      field: {
        borderBottom: '1px solid',
        borderRadius: '0px',
        height: '28px',
        padding: 'unset',
        borderColor: 'inherit',
        bg: 'inherit',
        _hover: {
          borderColor: mode('brand.green.400', 'brand.green.400')(props),
        },
        _readOnly: {
          boxShadow: 'none !important',
          userSelect: 'all',
        },
        _disabled: {
          opacity: 0.4,
          cursor: 'not-allowed',
        },
        _invalid: {
          borderColor: mode('brand.red.400', 'brand.red.400')(props),
        },
        _focus: {
          zIndex: 1,
          borderColor: mode('brand.green.400', 'brand.green.400')(props),
        },
      },
    }),
  },
};

export const inputOverrides = {
  Input: customInputStyles,
  NumberInput: customInputStyles,
  Select: customInputStyles,
};
