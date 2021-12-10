import { ReactNode } from 'react';
import { FormLabel } from '@chakra-ui/react';

export const SmFormLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <FormLabel
      fontSize="10px"
      textTransform="uppercase"
      letterSpacing="1px"
      htmlFor={htmlFor}
    >
      {children}
    </FormLabel>
  );
};
