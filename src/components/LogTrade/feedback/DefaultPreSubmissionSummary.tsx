import { Flex, ButtonGroup } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useFormFilledState } from '../../../utils/logTradeFormProgressionHelper';
import { format } from 'date-fns';
import { TradeDataPropVals } from '../../../@types/log-trade-types';

import { SecondaryButton } from '../../shared/SecondaryButton';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { FeedbackText } from './FeedbackText';

export const DefaultPreSubmissionSummary = (): JSX.Element => {
  const {
    isSubmitting,
    values: { date, execTime, price, qty, side, ticker },
  } = useFormikContext<TradeDataPropVals>();
  const { cancelForm } = useFormFilledState();

  return (
    <Flex
      className="default-presubmission"
      wrap={['wrap', 'wrap', 'nowrap']}
      align="center"
      justify="left"
    >
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
        <SecondaryButton type="button" onClick={cancelForm}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          w={32}
          type="submit"
          isLoading={isSubmitting}
          onClick={() => console.log('Clicked onSubmit')}
        >
          Submit
        </PrimaryButton>
      </ButtonGroup>
    </Flex>
  );
};
