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
    queriesToInvalidate: string;
    preFillValues: FormFields | null;
    collectionName?: string;
    collectionId?: string;
    closeModal?: () => void;
    route: string;
  };
  w?: string;
  mb?: string[];
  heading?: string;
  gridTemplateCols?: string[];
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
