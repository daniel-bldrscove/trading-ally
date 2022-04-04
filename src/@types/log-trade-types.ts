import React, { Dispatch, SetStateAction } from 'react';
import {
  FormikValues,
  FormikHelpers,
  FormikTouched,
  FormikErrors,
} from 'formik';

export type LogTradeProps = {
  w?: string;
  mb?: number | string[] | number[];
  heading?: string;
  children?: React.ReactNode;
  preFillValues?: TradeDataPropVals;
  submitTradeDataForLog?: () => void;
  gridTemplateCols: string[];
  submissionConfig?: {
    route?: string;
    queriesToInvalidate: string | string[];
  };
};

export type TradeDataPropVals = FormFields;

export type FormFields = {
  date: string;
  execTime: string;
  posEffect: string;
  price: number;
  qty: number;
  side: string;
  spread: string;
  ticker: string;
};

export type ProgressionFormProps = {
  submissionConfig: {
    queriesToInvalidate: QueryStateType['queriesToInvalidate'];
    preFillValues: FormFields | null;
    route: QueryStateType['route'];
  };
  w?: string;
  mb?: string[];
  heading?: string;
  gridTemplateCols?: string[];
};

export type ProviderValue = {
  state: QueryStateType;
  dispatch: React.Dispatch<QueryStateType>;
};

export type QueryStateType = {
  preFillValues?: FormFields | null;
  tempSummaryValues?: FormFields;
  onSubmit?: (
    fieldValues: FormFields,
    actions: FormikHelpers<FormFields>,
    route: string,
    queriesToInvalidate: string | null,
  ) => void;
  route?: string;
  queriesToInvalidate?: string;
  formStatus: string;
  success?: boolean | null;
  error?: boolean | null;
};

export type FormFieldsProps = {
  children: React.ReactNode;
  setFieldValues: (
    values: SetStateAction<TradeDataPropVals>,
    shouldValidate?: boolean | undefined,
  ) => void;
  wrapperProps: Omit<LogTradeProps, 'submissionConfig' | 'children'>;
};

export interface SplitNumCounterFieldProps {
  w: string | string[];
  id?: string;
  name: string;
  step?: number;
  size?: string;
  label: string;
  variant?: string;
  placeholder?: number;
  precision?: number;
  toolTipDescription: string;
}

export interface SelectFieldProps {
  w: string | string[];
  id?: string;
  name: string;
  size?: string;
  type: string;
  label: string;
  variant?: string;
  placeholder?: string;
  toolTipDescription: string;
  children: React.ReactNode;
}

export type HandleSubmitFunctionProps = (
  fieldValues: FormikValues,
  actions: FormikHelpers<TradeDataPropVals>,
  submissionConfig: LogTradeProps['submissionConfig'],
) => void;

export type SubmittedResult = {
  submitted: boolean | null;
  success: boolean | null;
  message: string | null;
  submittedFromModal: boolean | null;
};

export type SubmissionResultCtx = (
  | Record<string, unknown>
  | Dispatch<SetStateAction<SubmittedResult>>
  | null
)[];

export interface FormProgressProviderProps extends Record<string, unknown> {
  children?: React.ReactNode;
  errors: FormikErrors<TradeDataPropVals>;
  touched: FormikTouched<TradeDataPropVals>;
}

export type FormFilledCtx = (
  | boolean
  | Dispatch<SetStateAction<boolean | null>>
  | null
)[];
