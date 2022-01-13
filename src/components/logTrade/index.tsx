import { LogTradeProps } from '../../@types/log-trade-types';
import { RenderFormik } from './RenderFormik';
import { SubmissionResultProvider } from '../../utils/submissionResultHelper';
import { ComponentWrapper } from '../shared/ComponentWrapper';

export const LogTrade = ({
  formConfig,
  children,
  ...props
}: LogTradeProps): JSX.Element => {
  return (
    <ComponentWrapper id="log-trade-container">
      <SubmissionResultProvider>
        <RenderFormik formConfig={formConfig} {...props}>
          {children}
        </RenderFormik>
      </SubmissionResultProvider>
    </ComponentWrapper>
  );
};
