import { useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import { logTradeValidationSchema } from '../../utils/validationSchema';
import { InputField } from '../shared/form/InputField';
import { SelectField } from '../shared/form/SelectField';
import { NumInputField } from '../shared/form/NumInputField';
import { LogTradeSummary } from './LogTradeSummary';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import { OtherProps, FormikValues } from './types';

export const initialValues: FormikValues = {
  date: '',
  execTime: '',
  spread: '',
  side: '',
  qty: 1,
  ticker: '',
  price: 0,
  posEffect: '',
};

export const LogTrade = ({
  ...formContainerProps
}: OtherProps): JSX.Element => {
  const queryClient = useQueryClient();
  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const tradeDetailsBgColor = useColorModeValue('gray.200', 'brand.gray.800');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logTradeValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          // log trade data
          await axios.post('/api/log-trade', {
            ...values,
          });

          actions.setSubmitting(false);
          setSubmissionStatus({
            submitted: true,
            success: true,
            message:
              'Submission processed. You have successfully logged your trade!',
          });

          // refresh trade data
          queryClient.invalidateQueries('trades');
        } catch (error) {
          actions.setSubmitting(false);
          if (axios.isAxiosError(error)) {
            setSubmissionStatus({
              submitted: true,
              success: false,
              message: `Submission failed. ${error.message}`,
            });
          } else {
            throw new Error(`Encountered error: ${error}`);
          }
        }
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
                  w={['full', 'full', 'full', '32']}
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
                  toolTipDescription="Stock trades only"
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
              resetFormik={props.resetForm}
              submissionStatus={submissionStatus}
              setSubmissionStatus={setSubmissionStatus}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
