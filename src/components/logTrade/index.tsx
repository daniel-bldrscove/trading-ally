import { Formik, Form, FormikProps } from 'formik';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import { logTradeValidationSchema } from '../../utils/validationSchema';
import { InputField } from '../shared/form/InputField';
import { SelectField } from '../shared/form/SelectField';
import { NumInputField } from '../shared/form/NumInputField';
import { LogTradeSummary } from './LogTradeSummary';

interface OtherProps {
  w: string;
  mb: number;
}

interface FormikValues {
  date: string;
  execTime: string;
  spread: string;
  side: string;
  qty: number;
  ticker: string;
  price: number;
  posEffect: string;
}

export const LogTrade = ({
  ...formContainerProps
}: OtherProps): JSX.Element => {
  const initialValues: FormikValues = {
    date: '',
    execTime: '',
    spread: '',
    side: '',
    qty: 1,
    ticker: '',
    price: 0,
    posEffect: '',
  };

  const tradeDetailsBgColor = useColorModeValue('gray.200', 'brand.gray.800');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logTradeValidationSchema}
      onSubmit={async (values, actions) => {
        // send input field values
        await fetch('/api/trade', {
          method: 'POST',
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Data: ', data); // returns object
            actions.setSubmitting(false);
          });
      }}
    >
      {(props: FormikProps<FormikValues>) => (
        <Form>
          <Box position="relative" p={0} {...formContainerProps}>
            <Box bg={tradeDetailsBgColor} p={6} borderTopRadius="md">
              <Box mb={6}>
                <Heading as="h4" size="md" mb={8}>
                  Log your latest trade
                </Heading>
              </Box>
              <Grid
                templateColumns={[
                  'repeat(2,1fr)',
                  'repeat(3,1fr)',
                  'repeat(4,1fr)',
                  'repeat(8,1fr)',
                ]}
                gap={6}
              >
                <InputField
                  w="32"
                  type="date"
                  id="date"
                  name="date"
                  label="Date"
                  placeholder="mm/dd/yyyy"
                  toolTipDescription="On what day did you execute the trade?"
                />
                <InputField
                  w="full"
                  type="time"
                  id="execTime"
                  name="execTime"
                  label="Exc. Time"
                  placeholder="00:00"
                  toolTipDescription="At what time did you execute the trade?"
                />
                <InputField
                  w="full"
                  type="text"
                  id="spread"
                  name="spread"
                  label="Spread"
                  placeholder="Stock"
                  toolTipDescription="Currently only support logging Stock trades"
                />
                <SelectField
                  w="full"
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
                  w="full"
                  id="qty"
                  name="qty"
                  label="Quantity"
                  placeholder={1}
                  toolTipDescription="How many shares did you buy or sell?"
                />
                <InputField
                  w="full"
                  type="text"
                  id="ticker"
                  name="ticker"
                  label="Ticker"
                  placeholder="AAPL"
                  toolTipDescription="What is the company's ticker symbol?"
                />
                <NumInputField
                  w="full"
                  id="price"
                  name="price"
                  label="Price"
                  precision={2}
                  placeholder={0}
                  toolTipDescription="What's the price of a single share?"
                />
                <SelectField
                  w="full"
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
            <LogTradeSummary
              fieldValues={props.values}
              isSubmitting={props.isSubmitting}
              touched={props.touched}
              errors={props.errors}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
