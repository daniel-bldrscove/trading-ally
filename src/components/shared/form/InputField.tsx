import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import { FormControl, Input, useColorModeValue } from '@chakra-ui/react';
import { FieldErrorFeedback } from './FieldErrorFeedback';

interface InputFieldProps {
  w: string | string[];
  variant?: string;
  size?: string;
  type: string;
  id?: string;
  name: string;
  label: string;
  placeholder?: string;
  toolTipDescription: string;
}

const chromeInputIconDark = {
  '::-webkit-calendar-picker-indicator': {
    filter: 'invert(1)',
  },
};

const chromeInputIconLight = {
  '::-webkit-calendar-picker-indicator': {
    filter: 'none',
  },
};

export const InputField = ({
  label,
  size = 'md',
  toolTipDescription,
  ...props
}: InputFieldProps): JSX.Element => {
  // ensure date and time filter icon is visible on dark and light mode
  const chromeInputIconStyles = useColorModeValue(
    chromeInputIconLight,
    chromeInputIconDark,
  );

  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <SmLabelWithTooltip
        htmlFor={field.name}
        toolTipDescription={toolTipDescription}
      >
        {label}
      </SmLabelWithTooltip>
      <Input
        h={10}
        size={size}
        {...field}
        {...props}
        sx={chromeInputIconStyles}
      />
      {meta.touched && meta.error ? (
        <FieldErrorFeedback>{meta.error}</FieldErrorFeedback>
      ) : null}
    </FormControl>
  );
};
