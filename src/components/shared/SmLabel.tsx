import { ReactNode } from 'react';
import { FormLabel } from '@chakra-ui/react';

export const SmLabel = ({
  htmlFor,
  children,
  color,
}: {
  htmlFor: string;
  children: ReactNode;
  color: string;
}): JSX.Element => {
  return (
    <FormLabel
      h={4}
      mb={0}
      color={color}
      fontSize="10px"
      textTransform="uppercase"
      letterSpacing="1px"
      htmlFor={htmlFor}
    >
      {children}
    </FormLabel>
  );
};
