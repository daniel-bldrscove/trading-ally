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
      h={4}
      mb={0}
      fontSize="10px"
      textTransform="uppercase"
      letterSpacing="1px"
      htmlFor={htmlFor}
    >
      {children}
    </FormLabel>
  );
};
