import * as React from 'react';
import { Flex, ButtonGroup } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useQueryContext } from '../QueryProvider';
import { SecondaryButton } from '../../../shared/SecondaryButton';
import { PrimaryButton } from '../../../shared/PrimaryButton';
import { FeedbackText } from './FeedbackText';
import { FormFields } from '../../../../@types/log-trade-types';
import { useFormikContext, FormikContextType } from 'formik';

type FormikContextSummaryTypes = {
  values: FormFields;
  submitForm: unknown;
  isSubmitting: unknown;
};

export const DefaultPreSubmissionSummary = () => {
  const { dispatch } = useQueryContext();
  const { values, submitForm, isSubmitting } = useFormikContext<FormFields>();
  const { date, execTime, price, qty, side, ticker } = values;

  return (
    <Flex
      className="default-preSubmission"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
      <h1>Testing out the form input values</h1>
      <FeedbackText>
        {side === '' || qty === 0
          ? ''
          : qty > 0 && side === 'long'
          ? `You bought ${qty} shares of ${ticker} at $${price} / share, on ${format(
              new Date(date.replace(/-/g, '/')), // change hyphens to forward slash otherwise it outputs one day behind
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`
          : `You sold ${qty} shares of ${ticker} at $${price} / share, on ${format(
              new Date(date.replace(/-/g, '/')),
              'MM/dd/yyyy',
            )} at ${execTime}. Ready to submit?`}
      </FeedbackText>
      <ButtonGroup isAttached variant="filled" pt={['1rem', '1rem', '0px']}>
        <SecondaryButton
          type="button"
          onClick={() =>
            dispatch({
              formStatus: 'canceled',
            })
          }
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          w={32}
          type="submit"
          isLoading={isSubmitting}
          onClick={() => submitForm()}
        >
          Submit
        </PrimaryButton>
      </ButtonGroup>
    </Flex>
  );
};
