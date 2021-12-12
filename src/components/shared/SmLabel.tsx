import { ReactNode } from 'react';
import { FormLabel } from '@chakra-ui/react';

export const SmLabel = ({
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
      marginRight={1}
      htmlFor={htmlFor}
    >
      {children}
    </FormLabel>
  );
};
