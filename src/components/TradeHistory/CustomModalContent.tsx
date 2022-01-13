import { useContext } from 'react';
import {
  Box,
  Heading,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ModalStatesContext } from '../../utils/createContext';
import { LogTrade } from '../LogTrade';
import { CustomPreSubmissionSummary } from './CustomPreSubmissionSummary';

export const CustomModalContent = (): JSX.Element => {
  const { onModalClose, rowData } = useContext(ModalStatesContext) || {};

  // typescript check variables exist
  if (!onModalClose || !rowData) {
    throw new Error('ModalStatesContext not loaded!');
  }

  const { data } = rowData;
  const modalSectionsPadding = [2, 4, 6];

  return (
    <Box className="custom-modal-content">
      <ModalHeader>
        <Heading as="h2">
          {data.ticker} was traded on {data.date}
        </Heading>
      </ModalHeader>
      <ModalCloseButton onClick={onModalClose} />
      <ModalBody p={modalSectionsPadding}>
        <LogTrade
          mb={['10', '6']}
          preFillValues={{ ...rowData.data }}
          gridTemplateCols={[
            'repeat(1,1fr)',
            'repeat(2,1fr)',
            'repeat(3,1fr)',
            'repeat(4,1fr)',
            'repeat(4,1fr)',
          ]}
          heading={`Edit the fields below, then click submit to update.`}
        >
          <CustomPreSubmissionSummary initialValues={rowData.data} />
        </LogTrade>
      </ModalBody>
    </Box>
  );
};
