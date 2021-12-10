import { useState } from 'react';
import {
  Formik,
  // FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import {
  Box,
  Button,
  Grid,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { SmFormLabel } from './SmFormLabel';

interface OtherProps {
  w: string;
  mb: number;
}

interface FormikValues {
  date: string;
  execTime: string;
  spread: string;
  side: string;
  qty: number;
  symbol: string;
  price: number;
  posEffect: string;
}

interface CustomFieldProps extends FieldProps {
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean,
  ) => void;
}

export const LogTrade = ({
  ...formContainerProps
}: OtherProps): JSX.Element => {
  const [count, setCount] = useState(1);

  const initialValues: FormikValues = {
    date: '',
    execTime: '',
    spread: '',
    side: '',
    qty: count,
    symbol: '',
    price: 0,
    posEffect: '',
  };

  const logTradeBtnColor = useColorModeValue(
    'brand.green.500',
    'brand.green.500',
  );
  const tradeDetailsBgColor = useColorModeValue('gray.300', 'brand.gray.800');
  const tradeSummaryBgColor = useColorModeValue('gray.200', 'brand.gray.600');

  return (
    <>
      <Box mb={4}>
        <Heading as="h4" size="md">
          Log your latest trade
        </Heading>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => (
          <Form>
            {/* TODO: add validate={validateName} */}
            <Box position="relative" p={0} {...formContainerProps}>
              <Box bg={tradeDetailsBgColor} p={5} borderTopRadius="md">
                <Grid
                  templateColumns={[
                    'repeat(2,1fr)',
                    'repeat(3,1fr)',
                    'repeat(4,1fr)',
                    'repeat(8,1fr)',
                  ]}
                  gap={6}
                >
                  <Field name="date">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="date">Date</SmFormLabel>
                        <Input
                          w="20"
                          id="date"
                          size="xs"
                          {...field}
                          placeholder="MM/DD/YY"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="execTime">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="execTime">Exec Time</SmFormLabel>
                        <Input
                          w="20"
                          size="xs"
                          id="execTime"
                          {...field}
                          placeholder="00:00"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="spread">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="spread">Spread</SmFormLabel>
                        <Input
                          w="16"
                          id="spread"
                          size="xs"
                          {...field}
                          disabled={true}
                          variant="filled"
                          value="Stock"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="side">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="side">Side</SmFormLabel>
                        <HStack spacing="8px" mt={2} mr={6}>
                          <Text fontSize="xs">Long</Text>
                          <Switch {...field} id="side" />
                          <Text fontSize="xs">Short</Text>
                        </HStack>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="qty">
                    {({ field, form }: FieldProps) => {
                      return (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <SmFormLabel htmlFor="qty">QTY</SmFormLabel>
                          <HStack spacing="4px">
                            <IconButton
                              name="qty"
                              size="xs"
                              variant="ghost"
                              aria-label="Add"
                              icon={<MinusIcon boxSize="8px" />}
                              onClick={() =>
                                props.setFieldValue(
                                  'qty',
                                  Number(props.values.qty) - 1,
                                )
                              }
                            />
                            <Input
                              w="8"
                              p="2px"
                              id="qty"
                              size="xs"
                              borderBottom="1px"
                              textAlign="center"
                              {...field}
                              placeholder="Qty"
                            />
                            <IconButton
                              name="qty"
                              size="xs"
                              variant="ghost"
                              aria-label="Substract"
                              icon={<AddIcon boxSize="8px" />}
                              onClick={() =>
                                props.setFieldValue(
                                  'qty',
                                  Number(props.values.qty) + 1,
                                )
                              }
                            />
                          </HStack>
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="symbol">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="symbol">Symbol</SmFormLabel>
                        <Input
                          w="16"
                          id="symbol"
                          size="xs"
                          {...field}
                          placeholder="AAPL"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="price">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="price">Price</SmFormLabel>
                        <Input
                          w="16"
                          id="price"
                          size="xs"
                          {...field}
                          placeholder="00.00"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="posEffect">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <SmFormLabel htmlFor="posEffect">Pos. Eff.</SmFormLabel>
                        <Select
                          w="24"
                          id="posEffect"
                          size="xs"
                          {...field}
                          placeholder="Position"
                        >
                          <option value="toOpen">To Open</option>
                          <option value="toClose">To Close</option>
                        </Select>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
              </Box>
              <Box
                bg={tradeSummaryBgColor}
                w="full"
                p={2}
                display="flex"
                justifyContent="end"
                borderBottomRadius="md"
              >
                <Button
                  w={32}
                  h={10}
                  size="xs"
                  bg={logTradeBtnColor}
                  color="brand.gray.700"
                  _hover={{ bg: 'brand.green.600' }}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Log Trade
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
