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
  symbol: string;
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
    symbol: '',
    price: 0,
    posEffect: '',
  };

  const tradeDetailsBgColor = useColorModeValue('gray.300', 'brand.gray.800');

  return (
    <>
      <Box mb={4}>
        <Heading as="h4" size="md">
          Log your latest trade
        </Heading>
      </Box>
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
              <Box bg={tradeDetailsBgColor} p={5} borderTopRadius="md">
                <Grid
                  overflow="hidden"
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
                    placeholder="MM/DD/YYYY"
                    toolTipDescription="On what day did you execute the trade?"
                  />
                  <InputField
                    w="28"
                    type="time"
                    id="execTime"
                    name="execTime"
                    label="Exc. Time"
                    placeholder="00:00"
                    toolTipDescription="At what time did you execute the trade?"
                  />
                  <InputField
                    w="16"
                    type="text"
                    id="spread"
                    name="spread"
                    label="Spread"
                    placeholder="Stock"
                    toolTipDescription="Currently only support logging Stock trades"
                  />
                  <SelectField
                    w="24"
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
                    w="16"
                    id="qty"
                    name="qty"
                    label="Quantity"
                    placeholder={1}
                    toolTipDescription="How many shares did you buy or sell?"
                  />
                  <InputField
                    w="16"
                    type="text"
                    id="symbol"
                    name="symbol"
                    label="Symbol"
                    placeholder="AAPL"
                    toolTipDescription="What's the company ticker symbol?"
                  />
                  <NumInputField
                    w="20"
                    id="price"
                    name="price"
                    label="Price"
                    placeholder={0}
                    toolTipDescription="What's the price of a single share?"
                  />
                  <SelectField
                    w="24"
                    type="text"
                    id="posEffect"
                    name="posEffect"
                    label="Pos. Effect"
                    placeholder="Pick One"
                    toolTipDescription="If you bought shares and were not previously in a short position, then the position effect is to open. If you were already short, then it would be to close.
                          If you sold shares and were not in a long position previously, then the position effect is to open. If you were already long, then it would be to close."
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
    </>
  );
};
