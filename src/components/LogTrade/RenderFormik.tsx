import { Formik, FormikProps } from 'formik';
import { logTradeValidationSchema } from '../../utils/validationSchema';
import { LogTradeProps, TradeDataPropVals } from '../../@types/log-trade-types';
import { useSubmissionResult } from '../../utils/submissionResultHelper';
import { FormProgressProvider } from '../../utils/logTradeFormProgressionHelper';

import { FormFields } from './FormFields';
import { ProgressionUIController } from './ProgressionUIController';

export const initialValues: TradeDataPropVals = {
  date: '',
  execTime: '',
  spread: 'Stock',
  side: '',
  qty: 1,
  ticker: '',
  price: 0,
  posEffect: '',
};

export const RenderFormik = ({
  children,
  formConfig,
  ...props
}: LogTradeProps): JSX.Element => {
  // must be used inside SubmissionResultProvider
  const { onSubmit } = useSubmissionResult();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logTradeValidationSchema}
      onSubmit={(values, actions) => onSubmit(values, actions, formConfig)}
    >
      {(formikProps: FormikProps<TradeDataPropVals>) => {
        return (
          <FormFields
            setFieldValues={formikProps.setValues}
            wrapperProps={{ ...props }}
          >
            <FormProgressProvider
              errors={formikProps.errors}
              touched={formikProps.touched}
            >
              <ProgressionUIController>{children}</ProgressionUIController>
            </FormProgressProvider>
          </FormFields>
        );
      }}
    </Formik>
  );
};
