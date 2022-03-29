import { useEffect } from 'react';
import { Form as FormikForm, useFormikContext } from 'formik';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import { InputField } from '../shared/form/InputField';
import { SelectField } from '../shared/form/SelectField';
import { NumInputField } from '../shared/form/NumInputField';
import { FormFieldsProps } from '../../@types/log-trade-types';
import { initialValues } from './RenderFormik';

export const FormFields = ({
  children,
  setFieldValues,
  wrapperProps: { gridTemplateCols, heading, preFillValues, ...rest },
}: FormFieldsProps): JSX.Element => {
  const formBackgroundColor = useColorModeValue('white', 'brand.gray.800');
  const fieldOptions = {
    fieldWidth: ['full'],
    variant: 'single-baseline',
  };
  const { setTouched } = useFormikContext();

  useEffect(() => {
    if (preFillValues) {
      const setValues = new Promise((resolve) => {
        resolve(setFieldValues(preFillValues));
      });

      // touch and validate all pre-filled values
      setValues.then(() =>
        setTouched(
          {
            date: true,
            execTime: true,
            spread: true,
            side: true,
            qty: true,
            ticker: true,
            price: true,
            posEffect: true,
          },
          true,
        ),
      );
    }

    // clean up field values
    return () => setFieldValues(initialValues);

    // only pre-fill values once on first render
  }, [preFillValues, setFieldValues, setTouched]);

  return (
    <FormikForm>
      <Box position="relative" p={0} {...rest}>
        <Box bg={formBackgroundColor} p={6} borderRadius="md">
          <Box mb={6}>
            <Heading as="h4" size="md" mb={8}>
              {heading}
            </Heading>
          </Box>
          <Grid templateColumns={gridTemplateCols} gap={6}>
            <InputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="date"
              id="date"
              name="date"
              label="Date"
              placeholder="mm/dd/yyyy"
              toolTipDescription="On what day did you execute the trade?"
            />
            <InputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="time"
              id="execTime"
              name="execTime"
              label="Exc. Time"
              placeholder="00:00"
              toolTipDescription="At what time did you execute the trade?"
            />
            <InputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="text"
              id="spread"
              name="spread"
              label="Spread"
              placeholder="Stock"
              toolTipDescription="Write 'Stock' below"
            />
            <SelectField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="text"
              id="side"
              name="side"
              label="Side"
              placeholder="Pick One"
              toolTipDescription="'Long' means buy, 'Short' means sell. Did you buy or sell?"
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </SelectField>
            <NumInputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              id="qty"
              step={1}
              name="qty"
              label="Quantity"
              placeholder={1}
              toolTipDescription="How many shares did you buy or sell?"
            />
            <InputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="text"
              id="ticker"
              name="ticker"
              label="Ticker"
              placeholder="AAPL"
              toolTipDescription="What is the company's ticker symbol?"
            />
            <NumInputField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              id="price"
              name="price"
              label="Price"
              precision={2}
              placeholder={0}
              toolTipDescription="What's the price of a single share?"
            />
            <SelectField
              w={fieldOptions.fieldWidth}
              variant={fieldOptions.variant}
              type="text"
              id="posEffect"
              name="posEffect"
              label="Effect"
              placeholder="Pick One"
              toolTipDescription="Did you open a position when you made the trade, or did you close an existing one?"
            >
              <option value="toOpen">To Open</option>
              <option value="toClose">To Close</option>
            </SelectField>
          </Grid>
        </Box>
        {children}
      </Box>
    </FormikForm>
  );
};
