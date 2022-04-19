import ProgressionUI from './ProgressionUI';
import { motion } from 'framer-motion';
import { ProgressionFormProps } from '../../../@types/log-trade-types';
import { logTradeValidationSchema } from '../../../utils/validationSchema';
import { Formik } from 'formik';
import useMutateTradeData from '../../../utils/useMutateTradeData';
import Fields from './FormUI/Fields';

const initValues = {
  date: '',
  execTime: '',
  spread: 'Stock',
  side: '',
  qty: 1,
  ticker: '',
  price: 0,
  posEffect: '',
};

export default function ProgressionForm({
  submissionConfig: {
    queriesToInvalidate,
    preFillValues,
    collectionName,
    collectionId,
    closeModal,
    route,
  },
  ...rest
}: ProgressionFormProps) {
  const { onSubmit } = useMutateTradeData();

  if (typeof queriesToInvalidate !== 'string') {
    throw new Error('typeof queriesToInvalidate is null or undefined');
  } else if (typeof route !== 'string') {
    throw new Error('typeof route is undefined');
  }

  return (
    <motion.div
      id="progression-form"
      style={{ marginBottom: '2.5rem' }}
      key="log-trade-prog-form"
      initial={{ opacity: 0, y: 45 }} // how the animation starts
      animate={{ opacity: 1, y: 0 }} // how the animation ends
      transition={{
        duration: 0.18,
      }}
    >
      <Formik
        initialStatus={{ formStatus: 'idle', success: null, error: null }}
        initialValues={preFillValues ? preFillValues : initValues}
        validationSchema={logTradeValidationSchema}
        validateOnMount={true}
        onSubmit={(values, formikBag) =>
          onSubmit(
            values,
            formikBag,
            route,
            collectionName,
            collectionId,
            queriesToInvalidate,
            closeModal,
          )
        }
      >
        <>
          <Fields {...rest} />
          <ProgressionUI />
        </>
      </Formik>
    </motion.div>
  );
}
