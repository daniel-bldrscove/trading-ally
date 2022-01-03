import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Select } from '@chakra-ui/react';
import { FormErrorMessage } from './FormErrorMessage';
import { SelectFieldProps } from '../../LogTrade/types';

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
      <Select size={size} {...field} {...props}>
        {children}
      </Select>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
