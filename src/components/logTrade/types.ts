import { Dispatch, SetStateAction } from 'react';
import { FormikState } from 'formik';

export interface OtherProps {
  w: string;
  mb: number;
}

export interface FormikValues {
  date: string;
  execTime: string;
  spread: string;
  side: string;
  qty: number;
  ticker: string;
  price: number;
  posEffect: string;
}

export interface LogTradeSummaryPropValues {
  fieldValues: FormikValues;
  isSubmitting: boolean;
  touched: Record<string, unknown>;
  errors: Record<string, unknown>;
  resetFormik: (val: Partial<FormikState<FormikValues>>) => void;
  submissionStatus: {
    submitted: boolean;
    success: boolean;
    message: string;
  };
  setSubmissionStatus: Dispatch<
    SetStateAction<{ submitted: boolean; success: boolean; message: string }>
  >;
}

export interface SplitNumCounterFieldProps {
  w: string;
  size?: string;
  id: string;
  name: string;
  label: string;
  placeholder?: number;
  precision?: number;
  toolTipDescription: string;
}
