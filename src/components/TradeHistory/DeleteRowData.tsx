import * as React from 'react';
import {
  Text,
  Code,
  Button,
  HStack,
  Heading,
  ModalCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRowDataContext } from './RowDataProvider';
import { LeastDestructiveBtnRefContext } from '../../utils/createContext';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export default function DeleteRowData(): JSX.Element {
  const queryClient = useQueryClient();
  const [err, setErr] = React.useState(null);
  // const { rowData } = React.useContext(ModalStatesContext) || {};
  const context = useRowDataContext();

  const { onClose: onAlertClose } = useDisclosure();
  const { rowData } = context;
  const dataInRowData = Boolean('data' in rowData);

  if (!dataInRowData) {
    throw new Error(
      'rowData was not passed through context. Please check context import.',
    );
  }

  const {
    data: { ticker, date },
    ref,
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
      },
      onError: (error: any) => {
        // must come first when calling from inside mutate method
        setErr(error?.message);
        console.log('Encountered a mutation error: ', error.toJSON());
      },
      onSettled: () => {
        // refetch trade info
        queryClient.invalidateQueries('trades');
      },
    },
  );

  const cancelRef = React.useContext(LeastDestructiveBtnRefContext);
  const descriptionTextColor = useColorModeValue(
    'brand.gray.400',
    'brand.gray.50',
  );

  const alertSectionsPadding = [2, 4, 6];

  return (
    <>
      <ModalCloseButton onClick={onAlertClose} />
      {err ? (
        <>
          <AlertDialogHeader p={alertSectionsPadding}>
            <Heading as="h4">Encountered Error!</Heading>
          </AlertDialogHeader>
          <AlertDialogBody p={alertSectionsPadding}>
            <Text fontSize="1.3rem" color={descriptionTextColor}>
              Encountered error in deleting trade:
            </Text>
            <Text fontSize="1.3rem" color={descriptionTextColor}>
              {err}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter p={alertSectionsPadding}>
            <Button ref={cancelRef} colorScheme="red" onClick={onAlertClose}>
              Close & Try again
            </Button>
          </AlertDialogFooter>
        </>
      ) : (
        <>
          <AlertDialogHeader p={alertSectionsPadding}>
            <Heading as="h4">Delete trade</Heading>
          </AlertDialogHeader>
          <AlertDialogBody p={alertSectionsPadding}>
            <Text fontSize="1.3rem" color={descriptionTextColor}>
              You&apos;ve selected to delete your
            </Text>
            <HStack mb={4}>
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
            <Text fontSize="1.3rem" color={descriptionTextColor}>
              Are you sure you want to delete this trade?
            </Text>
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
          </AlertDialogFooter>
        </>
      )}
    </>
  );
}
