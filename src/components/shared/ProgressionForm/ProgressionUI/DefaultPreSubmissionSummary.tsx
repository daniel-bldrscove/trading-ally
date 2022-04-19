import { Flex, ButtonGroup, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { SecondaryButton } from '../../../shared/SecondaryButton';
import { PrimaryButton } from '../../../shared/PrimaryButton';
import { FormFields } from '../../../../@types/log-trade-types';
import { useFormikContext } from 'formik';

export const DefaultPreSubmissionSummary = () => {
  const { values, submitForm, isSubmitting, setStatus, resetForm } =
    useFormikContext<FormFields>();

  const { date, execTime, price, qty, side, ticker } = values;

  const handleCancel = () => {
    // clear out form and cancel submission
    setStatus({ formStatus: 'idle', success: null, error: null });
    // set an error on reset to ensure 'readyToSubmit' status is not prematurely set from the useEffect in the FormUI > Fields component
    resetForm({
      errors: {
        date: 'unknown',
      },
    });
  };

  if (date && execTime && price && qty && side && ticker) {
    const timeArr = execTime.split(':');

    const getTime = () =>
      format(
        new Date(
          2022, // year
          0, // month
          1, // day
          parseInt(timeArr[0]), // hour
          parseInt(timeArr[1]), // min
        ),
        'p',
      );

    const getDate = () =>
      format(
        // change hyphens to forward slash otherwise it outputs one day behind
        new Date(date.replace(/-/g, '/')),
        'MM/dd/yyyy',
      );

    const calcLongShort = () =>
      qty > 0 && side === 'long'
        ? 'Bought'
        : qty < 0 && side === 'short'
        ? 'Sold'
        : 'ERROR: Please select correct "side"';

    return (
      <Flex
        className="default-preSubmission"
        wrap={['wrap', 'wrap', 'nowrap']}
        align="center"
        justify="left"
      >
        <Text mr="1rem">
          {side === '' || qty === 0
            ? ''
            : `${calcLongShort()} ${qty} shares of ${ticker} at $${price}/SH, on ${getDate()} at ${getTime()}. Ready to submit?`}
        </Text>
        <ButtonGroup isAttached variant="filled" pt={['1rem', '1rem', '0px']}>
          <SecondaryButton type="button" onClick={() => handleCancel()}>
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
  } else {
    return null;
  }
};
