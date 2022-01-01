import { useContext, useState, useEffect } from 'react';
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
} from './CreateContext';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const CustomAlertContent = (): JSX.Element => {
  const queryClient = useQueryClient();

  const [rowData, setRowData] = useState({
    data: {
      date: '',
      execTime: '',
      spread: '',
      side: '',
      qty: '',
      ticker: '',
      price: '',
      posEffect: '',
    },
    ref: {
      '@ref': {
        collection: null,
        id: '',
      },
    },
    ts: 0,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { onAlertClose, getDataFromRow } = useContext(ModalStatesContext);
  const cancelRef = useContext(LeastDestructiveBtnRefContext);
  const descriptionTextColor = useColorModeValue(
    'brand.gray.400',
    'brand.gray.50',
  );
  const { data: tradeRowData, ref, ts: timeStamp } = rowData;
  const ticker = tradeRowData?.ticker;
  const tradeDate = tradeRowData?.date;
  const tradeCollection = ref['@ref'].collection;
  const tradeId = ref['@ref'].id;
  const rowToDelete = {
    tradeCollection,
    tradeId,
  };

  useEffect(() => {
    setRowData(getDataFromRow());
  }, [getDataFromRow]);

  const mutation = useMutation(
    (delTradeData) => {
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

  return (
    <>
      <AlertDialogHeader>
        <Heading as="h4">Delete trade</Heading>
      </AlertDialogHeader>
      <ModalCloseButton onClick={onAlertClose} />
      <AlertDialogBody>
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
            {tradeDate}.
          </Code>
        </HStack>
        <Text color={descriptionTextColor}>
          Are you sure you want to delete this trade?
        </Text>
        <Text color={descriptionTextColor}>Trade timestamp: {timeStamp}</Text>
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onAlertClose}>
          No
        </Button>
        <Button
          isLoading={mutation.isLoading}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
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
