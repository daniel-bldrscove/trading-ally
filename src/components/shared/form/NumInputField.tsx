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

interface SplitNumCounterFieldProps {
  w: string;
  size?: string;
  id: string;
  name: string;
  label: string;
  placeholder?: number;
  precision?: number;
  toolTipDescription: string;
}

export const NumInputField = ({
  label,
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
          size={size}
          max={1000000}
          precision={precision}
          defaultValue={placeholder}
        >
          <NumberInputField
            h={10}
            borderBottom="1px"
            borderBottomColor="brand.green.400"
            focusBorderColor="brand.green.400"
            {...field}
            {...props}
          />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={() => setValue(field.value + 1)} />
            <NumberDecrementStepper onClick={() => setValue(field.value - 1)} />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
