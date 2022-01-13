import { useContext } from 'react';
import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Code,
  HStack,
  Heading,
  ModalCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  ModalStatesContext,
  LeastDestructiveBtnRefContext,
} from '../../utils/createContext';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const CustomAlertContent = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { onAlertClose, rowData } = useContext(ModalStatesContext) || {};

  if (!onAlertClose || !rowData) {
    throw new Error('ModalStatesContext not loaded!');
  }

  const {
    data: { ticker, date },
    ref,
    ts: timeStamp,
  } = rowData;

  const rowToDelete = {
    tradeCollection: ref['@ref'].collection,
    tradeId: ref['@ref'].id,
  };

  const mutation = useMutation(
    (delTradeData: Record<string, unknown>) => {
      return axios.post('/api/delete-trade', delTradeData);
    },
    {
      onSuccess: () => {
        // close modal
        setTimeout(() => {
          onAlertClose();
        }, 500);
        // refetch trade info
        queryClient.invalidateQueries('trades');
      },
    },
  );

  const cancelRef = useContext(LeastDestructiveBtnRefContext);
  const descriptionTextColor = useColorModeValue(
    'brand.gray.400',
    'brand.gray.50',
  );

  const alertSectionsPadding = [2, 4, 6];

  return (
    <>
      <AlertDialogHeader p={alertSectionsPadding}>
        <Heading as="h4">Delete trade</Heading>
      </AlertDialogHeader>
      <ModalCloseButton onClick={onAlertClose} />
      <AlertDialogBody p={alertSectionsPadding}>
        <Text fontSize="1.3rem" color={descriptionTextColor}>
          You&apos;ve selected to delete your
        </Text>
        <HStack mb={6}>
          <Code
            backgroundColor="brand.gray.600"
            fontSize="1.3rem"
            color="#ff5a72"
          >
            {ticker}
          </Code>
          <Text fontSize="1.3rem" color={descriptionTextColor}>
            trade, on
          </Text>
          <Code
            backgroundColor="brand.gray.600"
            fontSize="1.3rem"
            color="#ff5a72"
          >
            {date}.
          </Code>
        </HStack>
        <Text color={descriptionTextColor}>
          Are you sure you want to delete this trade?
        </Text>
        <Text color={descriptionTextColor}>Trade timestamp: {timeStamp}</Text>
      </AlertDialogBody>
      <AlertDialogFooter p={alertSectionsPadding}>
        <Button ref={cancelRef} onClick={onAlertClose}>
          No
        </Button>
        <Button
          isLoading={mutation.isLoading}
          onClick={() => {
            mutation.mutate(rowToDelete);
          }}
          colorScheme="red"
          ml={3}
        >
          Yes
        </Button>
        {mutation.isError ? (
          <Text color={descriptionTextColor}>
            Encountered error in deleting trade: {mutation.error}
          </Text>
        ) : (
          ''
        )}
      </AlertDialogFooter>
    </>
  );
};
