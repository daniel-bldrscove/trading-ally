import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Input } from '@chakra-ui/react';
import { FormErrorMessage } from './FormErrorMessage';

interface InputFieldProps {
  w: string;
  size?: string;
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  toolTipDescription: string;
}

export const InputField = ({
  label,
  size = 'xs',
  toolTipDescription,
  ...props
}: InputFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <SmLabelWithTooltip
        htmlFor={field.name}
        toolTipDescription={toolTipDescription}
      >
        {label}
      </SmLabelWithTooltip>
      <Input
        h={10}
        borderBottom="1px"
        borderBottomColor="brand.green.400"
        size={size}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
