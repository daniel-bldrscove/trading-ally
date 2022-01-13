import { ReactNode } from 'react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Logo } from './Logo';
import { LayoutWrapper } from './shared/LayoutWrapper';
import userAvatar from '../images/user-avatar-img.png';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({
  children,
  href = '#',
}: {
  children: ReactNode;
  href?: string;
}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Nav = ({ navbarHeight }: { navbarHeight: string[] | number[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w="full"
      bg={useColorModeValue('brand.gray.50', 'brand.gray.400')}
      position="fixed"
      zIndex={15}
    >
      <LayoutWrapper>
        <Flex
          h={navbarHeight}
          alignItems={'center'}
          justifyContent={'space-between'}
          className="navbar-flex-wrapper"
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex justifyContent="center">
            <Logo maxW={[160, 190, 215]} />
          </Flex>
          <HStack alignItems={'center'}>
            {/* 
            temporarily hide menu items
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              className="navigation-links"
            >
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>
                  {link}
                </NavLink>
              ))}
            </HStack> */}
            <Flex alignItems={'center'}>
              <ColorModeSwitcher />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  display={{ base: 'none', sm: 'block' }}
                >
                  <Avatar size={'sm'} src={userAvatar} />
                </MenuButton>
                {/* 
                temporarily hide menu list
                <MenuList>
                  <MenuItem>User Settings</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem>Log Out</MenuItem>
                </MenuList> */}
              </Menu>
            </Flex>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </LayoutWrapper>
    </Box>
  );
};

export default Nav;
