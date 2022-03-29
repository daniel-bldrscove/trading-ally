import * as React from 'react';
import {
  Box,
  Heading,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRowDataContext } from './RowDataProvider';
import { LogTrade } from '../LogTrade';
import { CustomPreSubmissionSummary } from './CustomPreSubmissionSummary';

export default function EditRowData(): JSX.Element {
  const [editingData, setEditingData] = React.useState({
    data: {
      date: '',
      execTime: '',
      spread: '',
      side: '',
      qty: 1,
      ticker: '',
      price: 0,
      posEffect: '',
    },
    ref: {
      '@ref': {
        collection: {},
        id: '',
      },
    },
    ts: 0,
  });
  const modalSectionsPadding = [2, 4, 6];
  const { onClose: onModalClose } = useDisclosure();
  const context = useRowDataContext();
  const { rowData } = context;

  React.useEffect(() => {
    if ('data' in rowData) {
      setEditingData(rowData);
    }
  }, [rowData]);

  const ctxData = editingData.data;

  // TODO: see how storing the data passed from context - in state - and then passing that to the
  // LogTrade component - affects re-rending.

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
