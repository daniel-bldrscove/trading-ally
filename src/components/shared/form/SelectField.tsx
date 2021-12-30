import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Select } from '@chakra-ui/react';
import { FormErrorMessage } from './FormErrorMessage';

interface SelectFieldProps {
  w: string;
  size?: string;
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  toolTipDescription: string;
  children: React.ReactNode;
}

export const SelectField = ({
  label,
  size = 'xs',
  toolTipDescription,
  children,
  ...props
}: SelectFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <SmLabelWithTooltip
        htmlFor={field.name}
        toolTipDescription={toolTipDescription}
      >
        {label}
      </SmLabelWithTooltip>
      <Select
        h={10}
        size={size}
        borderBottom="1px"
        borderBottomColor="brand.green.400"
        {...field}
        {...props}
      >
        {children}
      </Select>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
