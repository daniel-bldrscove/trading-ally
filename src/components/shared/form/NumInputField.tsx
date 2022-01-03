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
import { FormErrorMessage } from './FormErrorMessage';
import { SplitNumCounterFieldProps } from '../../LogTrade/types';

export const NumInputField = ({
  label,
  variant,
  size = 'xs',
  placeholder,
  precision = 0,
  toolTipDescription,
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
          w="full"
          variant={variant} //"outline" | "filled" | "flushed" | "unstyled"
          size={size}
          max={1000000}
          precision={precision}
          defaultValue={placeholder}
        >
          <NumberInputField h={10} {...field} {...props} />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() => setValue(parseInt(field.value) + 1)}
            />
            <NumberDecrementStepper
              onClick={() => setValue(parseInt(field.value) - 1)}
            />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
