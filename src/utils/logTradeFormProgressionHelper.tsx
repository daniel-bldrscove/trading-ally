import {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useFormikContext } from 'formik';
import {
  FormProgressProviderProps,
  FormFilledCtx,
} from '../@types/log-trade-types';
import { initialValues } from '../components/LogTrade/RenderFormik';
import {
  defaultSubmissionResults,
  useSubmissionResult,
} from './submissionResultHelper';

// initialize created context
const FormProgress = createContext<FormFilledCtx | null>(null);

// allow for consumption of context in child components
const useFormFilledState = (): {
  formFilled: boolean | Dispatch<SetStateAction<boolean | null>> | null;
  setFormFilled: boolean | Dispatch<SetStateAction<boolean | null>> | null;
  cancelForm: () => void;
} => {
  const { resetForm } = useFormikContext();
  const context = useContext(FormProgress);
  const { setSubmittedResult } = useSubmissionResult();
  // check context is used correctly
  if (!context) {
    throw new Error(
      `useFormFilledState must be used within a FormProgressProvider`,
    );
  }

  const [formFilled, setFormFilled] = context;

  const cancelForm = () => {
    if (!setFormFilled) {
      throw new Error('setFormFilled is null');
    }
    setSubmittedResult(defaultSubmissionResults);
    resetForm({ values: initialValues });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFormFilled(false);
  };

  return {
    formFilled,
    setFormFilled,
    cancelForm,
  };
};

// wrap children with this provider
const FormProgressProvider = ({
  children,
  errors,
  touched,
}: FormProgressProviderProps): JSX.Element => {
  const [formFilled, setFormFilled] = useState<boolean | null>(null);

  useEffect(() => {
    if (Object.keys(touched).length >= 1 && Object.keys(errors).length === 0) {
      // if no errors detected
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [touched, errors]);

  const vals = useMemo(() => [formFilled, setFormFilled], [formFilled]);

  return <FormProgress.Provider value={vals}>{children}</FormProgress.Provider>;
};

export { FormProgressProvider, useFormFilledState };
