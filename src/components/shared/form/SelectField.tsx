import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Select } from '@chakra-ui/react';
import { FieldErrorFeedback } from './FieldErrorFeedback';
import { SelectFieldProps } from '../../../@types/log-trade-types';

export const SelectField = ({
  label,
  size = 'md',
  toolTipDescription,
  children,
  ...props
}: SelectFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
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
        <FieldErrorFeedback>{meta.error}</FieldErrorFeedback>
      ) : null}
    </FormControl>
  );
};
