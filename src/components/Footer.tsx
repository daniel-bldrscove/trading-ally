// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import footerLogoDarkMode from '../images/logo/trading-ally-mark-dark-mode-sm.png';
import footerLogoLightMode from '../images/logo/trading-ally-mark-light-mode-sm.png';

const Footer: React.FC = () => {
  const footerLogo = useColorModeValue(footerLogoLightMode, footerLogoDarkMode);
  return (
    <Box as="footer">
      <Flex
        h="7rem"
        bg={useColorModeValue('brand.gray.100', 'brand.gray.500')}
        justifyContent="center"
        alignContent="center"
        flexWrap="wrap"
      >
        <Stack direction="column">
          <Flex justifyContent="center">
            <Image
              w="3rem"
              objectFit="contain"
              src={footerLogo}
              alt="Trading Ally small mark logo"
            />
          </Flex>
          <Text
            fontSize="xs"
            color="brand.gray.300"
            fontWeight="700"
            mt={1}
            mb={1}
          >
            Designed & built by{' '}
            <a
              href="https://www.bldrscove.com/"
              target="_blank"
              rel="noreferrer"
            >
              BldrsCove
            </a>
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
