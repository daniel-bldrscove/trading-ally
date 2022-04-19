import * as React from 'react';
import {
  Box,
  Heading,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDialogContext } from './DialogProvider';
import { useRowDataContext } from './RowDataProvider';
import ProgressionForm from '../shared/ProgressionForm';

export default function EditRowData(): JSX.Element {
  const modalSectionsPadding = [2, 4, 6];
  const context = useRowDataContext();
  const { rowData } = context;
  const { onModalClose } = useDialogContext();

  // console.log('row data: ', rowData);
  const ctxData = rowData.data;

  const submissionConfig = React.useMemo(() => {
    return {
      queriesToInvalidate: 'trades',
      preFillValues: ctxData,
      collectionName: rowData.ref['@ref'].collection['@ref'].id,
      collectionId: rowData.ref['@ref'].id,
      closeModal: onModalClose,
      route: '/api/update-trade',
    };
  }, [ctxData, onModalClose, rowData.ref]);

  return (
    <Box className="custom-modal-content">
      <ModalHeader>
        <Heading as="h2">
          {ctxData.ticker} was traded on {ctxData.date}
        </Heading>
      </ModalHeader>
      <ModalCloseButton onClick={onModalClose} />
      <ModalBody p={modalSectionsPadding}>
        <ProgressionForm
          mb={['10', '6']}
          gridTemplateCols={[
            'repeat(1,1fr)',
            'repeat(2,1fr)',
            'repeat(3,1fr)',
            'repeat(4,1fr)',
            'repeat(4,1fr)',
          ]}
          submissionConfig={submissionConfig}
          heading="Edit the fields below, then click submit to update."
        />
      </ModalBody>
    </Box>
  );
}
