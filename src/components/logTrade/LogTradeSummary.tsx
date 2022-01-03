import { useState, useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { PrimaryButton } from '../shared/PrimaryButton';
import { SecondaryButton } from '../shared/SecondaryButton';
import { PreSubmissionMsg } from './PreSubmissionMsg';
import { SubmissionFailedMsg } from './SubmissionFailedMsg';
import { SubmissionSuccessMsg } from './SubmissionSuccessMsg';
import { LogTradeSummaryPropValues } from './types';
import { initialValues } from './index';

export const LogTradeSummary = ({
  fieldValues,
  isSubmitting,
  touched,
  errors,
  submissionStatus,
  resetFormik,
  setSubmissionStatus,
}: LogTradeSummaryPropValues): JSX.Element => {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const tradeSummaryBgColor = useColorModeValue('white', 'brand.gray.600');

  const resetForm = () => {
    setActiveError(false);
    setIsReadyToSubmit(false);
    resetFormik({
      values: initialValues,
    });
    setSubmissionStatus({
      submitted: false,
      success: false,
      message: '',
    });
  };

  useEffect(() => {
    // if at least one field has been touched && there are no keys in Formik's error object
    if (Object.keys(touched).length >= 1 && Object.keys(errors).length === 0) {
      setActiveError(false);
    } else {
      setActiveError(true);
    }
  }, [touched, errors, activeError]);

  return (
    <Box
      bg={tradeSummaryBgColor}
      w="full"
      p={[4, 4, 4, 2]}
      display="flex"
      justifyContent="end"
      borderBottomRadius="md"
    >
      {
        // no form field errors
        !activeError && !isReadyToSubmit && !submissionStatus.submitted ? (
          <SecondaryButton
            type="button"
            onClick={() => setIsReadyToSubmit(true)}
            disabled={activeError}
          >
            Review Trade
          </SecondaryButton>
        ) : // user ready to submit form
        !activeError && isReadyToSubmit && !submissionStatus.submitted ? (
          <Flex
            w="full"
            align="center"
            justify="space-between"
            wrap={['wrap', 'wrap', 'nowrap']}
          >
            <PreSubmissionMsg {...fieldValues} />
            <ButtonGroup isAttached variant="filled">
              <SecondaryButton
                type="button"
                onClick={() => setIsReadyToSubmit(false)}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton w={32} isLoading={isSubmitting} type="submit">
                Submit
              </PrimaryButton>
            </ButtonGroup>
          </Flex>
        ) : // form submission failed
        !activeError &&
          submissionStatus.submitted &&
          !submissionStatus.success ? (
          <>
            <SubmissionFailedMsg>
              {submissionStatus.message}
            </SubmissionFailedMsg>
            <Button
              type="button"
              onClick={resetForm}
              disabled={activeError}
              colorScheme="red"
            >
              Reset &amp; Try Again
            </Button>
          </>
        ) : // form submission success
        !activeError &&
          submissionStatus.submitted &&
          submissionStatus.success ? (
          (setTimeout(() => {
            resetForm();
          }, 3000),
          (
            <SubmissionSuccessMsg>
              {submissionStatus.message}
            </SubmissionSuccessMsg>
          ))
        ) : null
      }
    </Box>
  );
};
