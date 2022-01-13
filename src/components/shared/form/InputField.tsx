import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Input } from '@chakra-ui/react';
import { FieldErrorFeedback } from './FieldErrorFeedback';

interface InputFieldProps {
  w: string | string[];
  variant?: string;
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
  size = 'md',
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
      <Input h={10} size={size} {...field} {...props} />
      {meta.touched && meta.error ? (
        <FieldErrorFeedback>{meta.error}</FieldErrorFeedback>
      ) : null}
    </FormControl>
  );
};
