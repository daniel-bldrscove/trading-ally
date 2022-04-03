import { useQueryContext } from '../QueryProvider';
import { DefaultPreSubmissionSummary } from './DefaultPreSubmissionSummary';
import { FeedbackContainer } from './FeedbackContainer';
// import { SubmissionFailedMsg } from './SubmissionFailedMsg';
// import { SubmissionSuccessMsg } from './SubmissionSuccessMsg';

export default function ProgressionUI() {
  const {
    state: { formStatus, success, error },
  } = useQueryContext();

  if (formStatus !== 'idle') {
    console.log(
      'formStatus inside the Progression UI parent component: ',
      formStatus,
    );
    return (
      <FeedbackContainer>
        {formStatus === 'readyToSubmit' ? (
          <DefaultPreSubmissionSummary />
        ) : formStatus === 'submitted' && success ? (
          <h1>Submission Succeeded </h1>
        ) : // <SubmissionSuccessMsg />
        formStatus === 'submitted' && error ? (
          <h1>Submission Succeeded </h1>
        ) : (
          // <SubmissionFailedMsg />
          formStatus === 'submitting' && <h1>Submitting in progress...</h1>
        )}
      </FeedbackContainer>
    );
  } else {
    // form submission has been canceled;
    return null;
  }
}
