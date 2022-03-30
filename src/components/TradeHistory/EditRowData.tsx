import {
  Box,
  Heading,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDialogContext } from './DialogProvider';
import { useRowDataContext } from './RowDataProvider';
import { LogTrade } from '../LogTrade';
import { CustomPreSubmissionSummary } from './CustomPreSubmissionSummary';

export default function EditRowData(): JSX.Element {
  const modalSectionsPadding = [2, 4, 6];
  const context = useRowDataContext();
  const { rowData } = context;
  const { onModalClose } = useDialogContext();

  const ctxData = rowData.data;

  return (
    <Box className="custom-modal-content">
      <ModalHeader>
        <Heading as="h2">
          {ctxData.ticker} was traded on {ctxData.date}
        </Heading>
      </ModalHeader>
      <ModalCloseButton onClick={onModalClose} />
      <ModalBody p={modalSectionsPadding}>
        <LogTrade
          mb={['10', '6']}
          preFillValues={{ ...ctxData }}
          gridTemplateCols={[
            'repeat(1,1fr)',
            'repeat(2,1fr)',
            'repeat(3,1fr)',
            'repeat(4,1fr)',
            'repeat(4,1fr)',
          ]}
          heading={`Edit the fields below, then click submit to update.`}
        >
          <CustomPreSubmissionSummary initialValues={ctxData} />
        </LogTrade>
      </ModalBody>
    </Box>
  );
}
