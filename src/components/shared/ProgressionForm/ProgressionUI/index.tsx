import { AnimatePresence } from 'framer-motion';
import { DefaultPreSubmissionSummary } from './DefaultPreSubmissionSummary';
import { FeedbackContainer } from './FeedbackContainer';
import { useFormikContext } from 'formik';
import { SubmissionFailedMsg } from './SubmissionFailedMsg';
import { SubmissionSuccessMsg } from './SubmissionSuccessMsg';

export default function ProgressionUI() {
  const {
    status: { formStatus, success, error },
  } = useFormikContext();

  return (
    <AnimatePresence>
      {formStatus !== 'idle' && (
        <FeedbackContainer>
          {formStatus === 'readyToSubmit' ? (
            <DefaultPreSubmissionSummary />
          ) : formStatus === 'submitted' && success ? (
            <SubmissionSuccessMsg />
          ) : formStatus === 'submitted' && error ? (
            <SubmissionFailedMsg />
          ) : (
            formStatus === 'submitting' && <h1>Submitting in progress...</h1>
          )}
        </FeedbackContainer>
      )}
    </AnimatePresence>
  );
}
