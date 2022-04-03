import { Formik, FormikProps } from 'formik';
import { TradeDataPropVals } from '../../../../@types/log-trade-types';
import { logTradeValidationSchema } from '../../../../utils/validationSchema';
import { useQueryContext } from '../QueryProvider';
import Fields from './Fields';

const initialValues = {
  date: '',
  execTime: '',
  spread: 'Stock',
  side: '',
  qty: 1,
  ticker: '',
  price: 0,
  posEffect: '',
};

export default function FormUI({ ...rest }) {
  const {
    state: { onSubmit, queriesToInvalidate, route, preFillValues },
  } = useQueryContext();

  if (typeof queriesToInvalidate !== 'string') {
    throw new Error('typeof queriesToInvalidate is null or undefined');
  } else if (typeof route !== 'string') {
    throw new Error('typeof route is undefined');
  }

  return (
    <Formik
      initialValues={preFillValues ? preFillValues : initialValues}
      validationSchema={logTradeValidationSchema}
      validateOnMount={true}
      onSubmit={(values, actions) =>
        onSubmit && onSubmit(values, actions, queriesToInvalidate, route)
      }
    >
      {(formikProps: FormikProps<TradeDataPropVals>) => (
        <Fields
          formikProps={formikProps}
          w={rest.w}
          mb={rest.mb}
          heading={rest.heading}
          gridTemplateCols={rest.gridTemplateCols}
        />
      )}
    </Formik>
  );
}
