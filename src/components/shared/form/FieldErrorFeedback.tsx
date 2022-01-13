import { FormErrorMessage } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

export const FieldErrorFeedback = ({ children }: Props): ReactElement => {
  return (
    <FormErrorMessage fontSize="xs" fontWeight="bold">
      {children}
    </FormErrorMessage>
  );
};
