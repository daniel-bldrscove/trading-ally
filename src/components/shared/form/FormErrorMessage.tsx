import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

export const FormErrorMessage = ({ children }: Props): ReactElement => {
  return (
    <ChakraFormErrorMessage fontSize="xs" fontWeight="bold">
      {children}
    </ChakraFormErrorMessage>
  );
};
