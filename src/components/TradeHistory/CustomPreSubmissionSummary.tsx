import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Flex, ButtonGroup } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { TradeDataPropVals } from '../../@types/log-trade-types';
import { ModalStatesContext } from '../../utils/createContext';
import { useMutateTradeData } from '../../utils/useMutateTradeData';

import { SecondaryButton } from '../shared/SecondaryButton';
import { PrimaryButton } from '../shared/PrimaryButton';
import { FeedbackText } from '../LogTrade/feedback/FeedbackText';

const arraysAreEqual = (a: unknown[], b: unknown[]) => {
  return Boolean(
    Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]),
  );
};

export const CustomPreSubmissionSummary = ({
  initialValues,
}: {
  initialValues: TradeDataPropVals;
}): JSX.Element => {
  const { onModalClose, rowData } = useContext(ModalStatesContext) || {};
  const valuesToSubmit = useRef<Record<string, unknown> | null>(null);
  const [notUpdated, setNotUpdated] = useState(true);

  // Formik hook
  const { isSubmitting, values } = useFormikContext<TradeDataPropVals>();

  // selected row data values
  const initialVals = useMemo(
    () => Object.values(initialValues),
    [initialValues],
  );

  // Formik form field values
  const sequentialVals = useMemo(() => Object.values(values), [values]);

  // compare initialVals vs sequentialVals
  useEffect(() => {
    // activate submit button once user has updated a field
    if (!arraysAreEqual(initialVals, sequentialVals)) {
      // if arrays aren't equal, then user HAS updated field(s)
      setNotUpdated(false);
    } else {
      setNotUpdated(true);
    }
  }, [initialVals, sequentialVals]);

  // store form field changes for update request
  useEffect(() => {
    valuesToSubmit.current = { ...values };
  });

  const { ref } = rowData || {};

  const updatedFieldData = {
    tradeCollection: ref?.['@ref'].collection,
    tradeId: ref?.['@ref'].id,
    data: valuesToSubmit.current,
  };

  // reset state and close modal on successful update
  const { handleSubmit } = useMutateTradeData();

  return (
    <Flex
      className="default-presubmission"
      wrap={['wrap', 'nowrap']}
      align="center"
      justify="center"
    >
      <FeedbackText>Ready to update your trade?</FeedbackText>
      <ButtonGroup isAttached variant="filled">
        <SecondaryButton type="button" onClick={onModalClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          w={32}
          type="button"
          disabled={notUpdated}
          isLoading={isSubmitting}
          onClick={() => handleSubmit(updatedFieldData)}
        >
          Update
        </PrimaryButton>
      </ButtonGroup>
    </Flex>
  );
};
