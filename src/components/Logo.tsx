// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import {
  ImageProps,
  forwardRef,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import logoDarkMode from '../images/logo/trading-ally-logo-dark-mode-sm.png';
import logoLightMode from '../images/logo/trading-ally-logo-light-mode-sm.png';

export const Logo = forwardRef<ImageProps, 'img'>((props, ref) => {
  return useColorModeValue(
    <Image src={logoLightMode} ref={ref} {...props} />,
    <Image src={logoDarkMode} ref={ref} {...props} />,
  );
});
