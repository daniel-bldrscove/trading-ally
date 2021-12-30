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
} from './CreateContext';

export const CustomAlertContent = (): JSX.Element => {
  const alertStateContext = useContext(ModalStatesContext);
  const cancelRef = useContext(LeastDestructiveBtnRefContext);
  const descriptionTextColor = useColorModeValue(
    'brand.gray.400',
    'brand.gray.50',
  );
  const ticker = 'AMD';
  const tradeDate = '10/24/20';

  return (
    <>
      <AlertDialogHeader>
        <Heading as="h4">Delete trade</Heading>
      </AlertDialogHeader>
      <ModalCloseButton onClick={alertStateContext?.onAlertClose} />
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
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={alertStateContext?.onAlertClose}>
          No
        </Button>
        <Button colorScheme="red" ml={3}>
          Yes
        </Button>
      </AlertDialogFooter>
    </>
  );
};
