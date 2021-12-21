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
  const enabledColor = useColorModeValue('brand.green.400', 'brand.green.400');
  const enabledHoverBgColor = useColorModeValue(
    'brand.gray.600',
    'brand.gray.600',
  );
  const disabledTextColor = useColorModeValue('brand.gray.100', '#32343a');
  const disabledBgColor = useColorModeValue('#cee5db', '#20222a');

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
      color={enabledHoverBgColor}
      border="1px"
      borderColor={enabledHoverBgColor}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: enabledHoverBgColor,
        color: enabledColor,
        borderColor: enabledColor,
      }}
      _active={{
        transform: 'scale(0.98)',
        bg: enabledHoverBgColor,
        color: enabledColor,
        borderColor: enabledColor,
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      _disabled={{
        bg: disabledBgColor,
        color: disabledTextColor,
        borderColor: disabledTextColor,
        _hover: {
          cursor: 'auto',
          bg: disabledBgColor,
          color: disabledTextColor,
          borderColor: disabledTextColor,
        },
      }}
    >
      {children}
    </Button>
  );
};
