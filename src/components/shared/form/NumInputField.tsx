import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import {
  FormControl,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FieldErrorFeedback } from './FieldErrorFeedback';
import { SplitNumCounterFieldProps } from '../../../@types/log-trade-types';

export const NumInputField = ({
  w,
  label,
  step = 6,
  size = 'md',
  precision = 0,
  placeholder,
  toolTipDescription,
  variant,
  ...props
}: SplitNumCounterFieldProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <SmLabelWithTooltip
        htmlFor={field.name}
        toolTipDescription={toolTipDescription}
      >
        {label}
      </SmLabelWithTooltip>
      <Stack direction="row">
        <NumberInput
          width={w}
          step={step}
          size={size}
          max={100000}
          min={-100000}
          inputMode="numeric"
          precision={precision}
          defaultValue={placeholder}
          clampValueOnBlur={true}
          variant={variant} // using a custom variant. Other variant types are: "outline" | "filled" | "flushed" | "unstyled"
          onChange={(valueString) => setValue(valueString)}
          value={field.value} // controll value with formik allows programmatic reset
        >
          <NumberInputField {...field} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      {meta.touched && meta.error ? (
        <FieldErrorFeedback>{meta.error}</FieldErrorFeedback>
      ) : null}
    </FormControl>
  );
};
