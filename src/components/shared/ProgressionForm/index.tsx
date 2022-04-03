import QueryProvider from './QueryProvider';
import FormUI from './FormUI';
import ProgressionUI from './ProgressionUI';
import { ProgressionFormProps } from '../../../@types/log-trade-types';

export default function ProgressionForm({
  formConfig,
  ...rest
}: ProgressionFormProps) {
  return (
    <QueryProvider {...formConfig}>
      <FormUI {...rest} />
      <ProgressionUI />
    </QueryProvider>
  );
}

//1 - once user fills out form without errors, queryProvider is
// given a dispatch update that says ok - ready to move on to the next step

//2 - ProgressionUI component now shows up displaying
// a. confirmation message
// b. submit button - sends submission request with data in body
// c. cancel button - clears out form and cancels submission
// d. clear queryProvider state - hiding the ProgressionUI component

//3A - User successfully submits data
// a. display success message
// b. clear out form and any internal state
// d. clear queryProvider state - hiding the ProgressionUI component

//3B - User fails in submitting data
// a. display error message
// b. display try again button
// c. cancel button - clears out form and cancels submission
// d. clear queryProvider state - hiding the ProgressionUI component
