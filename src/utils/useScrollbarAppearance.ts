import { useColorModeValue } from '@chakra-ui/react';

export const useScrollbarAppearance = () => {
  const barColor = useColorModeValue('#dbe4eb', 'brand.gray.300');
  const barHoverColor = useColorModeValue('brand.gray.100', 'brand.gray.200');
  const trackColor = useColorModeValue('white', 'black');
  const scrollbarThickness = '10px';

  // define scrollbar style variants for both light and dark mode

  const scrollbar = {
    '::-webkit-scrollbar-thumb': {
      background: barColor,
      borderRadius: '10px',
    },
  };

  const scrollbarTrack = {
    '::-webkit-scrollbar-track': {
      backgroundColor: trackColor,
      borderRadius: '10px',
    },
  };

  const scrollbarHover = {
    '::-webkit-scrollbar-thumb:hover': {
      background: barHoverColor,
    },
  };

  const barThickness = {
    '::-webkit-scrollbar': {
      height: scrollbarThickness,
      background: 'transparent',
    },
  };

  // set up scrollbar variants for export

  const scrollbarLgtMd = {
    ...scrollbar,
    ...scrollbarTrack,
    ...scrollbarHover,
    ...barThickness,
  };

  const scrollbarDrkMd = {
    ...scrollbar,
    ...scrollbarTrack,
    ...scrollbarHover,
    ...barThickness,
  };

  return {
    scrollbarLgtMd,
    scrollbarDrkMd,
  };
};
