import * as React from 'react';
import { Form, FormikErrors, useFormikContext } from 'formik';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import { InputField } from '../../../shared/form/InputField';
import { SelectField } from '../../../shared/form/SelectField';
import { NumInputField } from '../../../shared/form/NumInputField';
import { FormFields } from '../../../../@types/log-trade-types';

type FieldsPropTypes = {
  w?: string;
  mb?: string[];
  heading?: string;
  gridTemplateCols?: string[];
};

export default function Fields({
  w = 'full',
  mb = ['0'],
  heading = 'Pass this heading as a prop',
  gridTemplateCols = [
    'repeat(2,1fr)',
    'repeat(2,1fr)',
    'repeat(3,1fr)',
    'repeat(4,1fr)',
    'repeat(8,1fr)',
  ],
}: FieldsPropTypes) {
  const formBackgroundColor = useColorModeValue('white', 'brand.gray.800');
  const isEmpty = React.useCallback((obj: FormikErrors<FormFields>) => {
    return Object.keys(obj).length === 0;
  }, []);

  const { isValid, errors, dirty, setStatus } = useFormikContext();

  React.useEffect(() => {
    // update Formik status
    if (isValid && isEmpty(errors) && dirty) {
      setStatus({
        formStatus: 'readyToSubmit',
      });
    } else if (!isEmpty(errors)) {
      setStatus({
        formStatus: 'idle',
      });
    }
  }, [dirty, errors, isEmpty, isValid, setStatus]);

  const fieldOptions = {
    responsiveWidth: ['full'],
    variant: 'single-baseline',
  };

  return (
    <Form>
      <Box position="relative" p={0} w={w} mb={mb}>
        <Box bg={formBackgroundColor} p={6} borderRadius="md">
          <Box mb={6}>
            <Heading as="h4" size="md" mb={8}>
              {heading}
            </Heading>
          </Box>
          <Grid templateColumns={gridTemplateCols} gap={6}>
            <InputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="date"
              name="date"
              label="Date"
              placeholder="mm/dd/yyyy"
              toolTipDescription="On what day did you execute the trade?"
            />
            <InputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="time"
              name="execTime"
              label="Exc. Time"
              placeholder="00:00"
              toolTipDescription="At what time did you execute the trade?"
            />
            <InputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="text"
              name="spread"
              label="Spread"
              placeholder="Stock"
              toolTipDescription="Write 'Stock' below"
            />
            <SelectField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="text"
              name="side"
              label="Side"
              placeholder="Pick One"
              toolTipDescription="'Long' means buy, 'Short' means sell. Did you buy or sell?"
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </SelectField>
            <NumInputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              step={1}
              name="qty"
              label="Quantity"
              placeholder={1}
              toolTipDescription="How many shares did you buy or sell?"
            />
            <InputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="text"
              name="ticker"
              label="Ticker"
              placeholder="AAPL"
              toolTipDescription="What is the company's ticker symbol?"
            />
            <NumInputField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              name="price"
              label="Price"
              precision={2}
              placeholder={0}
              toolTipDescription="What's the price of a single share?"
            />
            <SelectField
              w={fieldOptions.responsiveWidth}
              variant={fieldOptions.variant}
              type="text"
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
      </Box>
    </Form>
  );
}
