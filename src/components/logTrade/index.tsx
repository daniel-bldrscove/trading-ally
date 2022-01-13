import { LogTradeProps } from '../../@types/log-trade-types';
import { RenderFormik } from './RenderFormik';
import { SubmissionResultProvider } from '../../utils/submissionResultHelper';

export const LogTrade = ({
  formConfig,
  children,
  ...props
}: LogTradeProps): JSX.Element => {
  return (
    <SubmissionResultProvider>
      <RenderFormik formConfig={formConfig} {...props}>
        {children}
      </RenderFormik>
    </SubmissionResultProvider>
  );
};
