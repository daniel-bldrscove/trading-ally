import { Button, useColorModeValue } from '@chakra-ui/react';

interface PrimaryButtonProps {
  w?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const PrimaryButton = ({
  w = 'auto',
  size = 'md',
  type = 'button',
  onClick,
  isLoading = false,
  disabled = false,
  children,
}: PrimaryButtonProps): JSX.Element => {
  const enabledTextColor = 'brand.gray.400';
  const enabledColor = 'brand.green.400';
  const hoverColor = useColorModeValue('brand.green.500', 'brand.green.500');
  const disabledColor = useColorModeValue('#cee5db', '#28322d');
  const disabledTextColor = useColorModeValue(
    'brand.gray.100',
    'brand.gray.300',
  );

  return (
    <Button
      w={w}
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
      bg={enabledColor}
      color={enabledTextColor}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: hoverColor,
        color: enabledTextColor,
      }}
      _active={{
        transform: 'scale(0.98)',
        bg: hoverColor,
        color: hoverColor,
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      _disabled={{
        color: disabledTextColor,
        bg: disabledColor,
        _hover: {
          color: disabledTextColor,
          bg: disabledColor,
        },
      }}
    >
      {children}
    </Button>
  );
};
