import { Button, useColorModeValue } from '@chakra-ui/react';

interface SecondaryButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const SecondaryButton = ({
  size = 'md',
  type = 'button',
  onClick,
  isLoading = false,
  disabled = false,
  children,
}: SecondaryButtonProps): JSX.Element => {
  const enabledColor = useColorModeValue('brand.gray.300', 'brand.gray.100');
  const disabledColor = useColorModeValue('brand.gray.100', 'brand.gray.300');
  const hoverColor = useColorModeValue('brand.green.500', 'brand.green.500');

  return (
    <Button
      size={size}
      type={type}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={disabled}
      px={
        size === 'xs'
          ? 2
          : size === 'sm'
          ? 3
          : size === 'md'
          ? 5
          : size === 'lg'
          ? 8
          : 2
      }
      fontSize={
        size === 'xs'
          ? '0.65rem'
          : size === 'sm'
          ? '0.80rem'
          : size === 'md'
          ? '0.90rem'
          : size === 'lg'
          ? '1rem'
          : '0.90rem'
      }
      color={enabledColor}
      border="1px"
      borderColor={enabledColor}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        borderColor: hoverColor,
        color: hoverColor,
      }}
      _active={{
        transform: 'scale(0.98)',
        borderColor: hoverColor,
        color: hoverColor,
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      _disabled={{
        color: disabledColor,
        borderColor: disabledColor,
        bg: 'none',
        _hover: {
          color: disabledColor,
          borderColor: disabledColor,
        },
      }}
    >
      {children}
    </Button>
  );
};
