import { useField } from 'formik';
import { SmLabelWithTooltip } from '../SmLabelWithTooltip';
import {
  FormControl,
  HStack,
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
  toolTipDescription: string;
}

export const NumInputField = ({
  label,
  size = 'xs',
  placeholder,
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
      <HStack shouldWrapChildren direction="row">
        <NumberInput
          size={size}
          max={1000000}
          precision={0.2}
          defaultValue={placeholder}
        >
          <NumberInputField p="2px" pl={4} {...field} {...props} />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={() => setValue(field.value + 1)} />
            <NumberDecrementStepper onClick={() => setValue(field.value - 1)} />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
