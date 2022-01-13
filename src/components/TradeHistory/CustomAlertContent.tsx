import { useContext, useState } from 'react';
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
  const [err, setErr] = useState(null);
  const { onAlertClose, rowData } = useContext(ModalStatesContext) || {};

  if (!onAlertClose || !rowData) {
    throw new Error('ModalStatesContext not loaded!');
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

  const cancelRef = useContext(LeastDestructiveBtnRefContext);
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
};
