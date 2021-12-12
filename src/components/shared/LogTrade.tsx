import { Formik, Form, Field, FieldProps } from 'formik';
import {
  Box,
  Button,
  Grid,
  FormControl,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { SmLabelWithTooltip } from './SmLabelWithTooltip';
import { logTradeValidationSchema } from '../../utils/validationSchema';
import { FormErrorMessage } from '../shared/FormErrorMessage';

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

export const LogTrade = ({
  ...formContainerProps
}: OtherProps): JSX.Element => {
  const initialValues: FormikValues = {
    date: '',
    execTime: '',
    spread: '',
    side: '',
    qty: 1,
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
        validationSchema={logTradeValidationSchema}
        onSubmit={(values, actions) => {
          console.log('Typeof date: ', typeof values.date);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => (
          <Form>
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
                    {({ field, form }: FieldProps) => {
                      return (
                        <FormControl
                          isInvalid={form.errors.date && form.touched.date}
                        >
                          <SmLabelWithTooltip
                            htmlFor="date"
                            toolTipDescription="On what day did you execute the trade?"
                          >
                            date
                          </SmLabelWithTooltip>
                          <Input
                            w="32"
                            id="date"
                            type="date"
                            size="xs"
                            {...field}
                            placeholder="MM/DD/YY"
                          />
                          <FormErrorMessage>
                            {form.errors.date}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="execTime">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.execTime && form.touched.execTime
                        }
                      >
                        <SmLabelWithTooltip
                          htmlFor="execTime"
                          toolTipDescription="At what time did you execute the trade?"
                        >
                          execTime
                        </SmLabelWithTooltip>
                        <Input
                          w="28"
                          size="xs"
                          type="time"
                          id="execTime"
                          {...field}
                          placeholder="00:00"
                        />
                        <FormErrorMessage>
                          {form.errors.execTime}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="spread">
                    {({ field, form }: FieldProps) => {
                      return (
                        <FormControl
                          isInvalid={form.errors.spread && form.touched.spread}
                        >
                          <SmLabelWithTooltip
                            htmlFor="spread"
                            toolTipDescription="Currently only support logging Stock trades"
                          >
                            spread
                          </SmLabelWithTooltip>
                          <Input
                            w="16"
                            id="spread"
                            size="xs"
                            type="text"
                            placeholder="Stock"
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors.spread}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="side">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.side && form.touched.side}
                      >
                        <SmLabelWithTooltip
                          htmlFor="side"
                          toolTipDescription="'Long' means buy, 'Short' means sell. Did you buy or sell?"
                        >
                          side
                        </SmLabelWithTooltip>
                        <Select
                          w="24"
                          id="side"
                          size="xs"
                          placeholder="Pick one"
                          {...field}
                        >
                          <option value="long">Long</option>
                          <option value="short">Short</option>
                        </Select>
                        <FormErrorMessage>{form.errors.side}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="qty">
                    {({ field, form }: FieldProps) => {
                      return (
                        <FormControl
                          isInvalid={form.errors.qty && form.touched.qty}
                        >
                          <SmLabelWithTooltip
                            htmlFor="qty"
                            toolTipDescription="How many shares did you buy or sell?"
                          >
                            qty
                          </SmLabelWithTooltip>
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
                              w="12"
                              p="2px"
                              id="qty"
                              type="number"
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
                          <FormErrorMessage>{form.errors.qty}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="symbol">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.symbol && form.touched.symbol}
                      >
                        <SmLabelWithTooltip
                          htmlFor="symbol"
                          toolTipDescription="What's the company ticker symbol?"
                        >
                          Symbol
                        </SmLabelWithTooltip>
                        <Input
                          w="16"
                          id="symbol"
                          type="text"
                          size="xs"
                          {...field}
                          placeholder="AAPL"
                          textTransform="uppercase"
                        />
                        <FormErrorMessage>
                          {form.errors.symbol}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="price">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.price && form.touched.price}
                      >
                        <SmLabelWithTooltip
                          htmlFor="price"
                          toolTipDescription="What's the price of a single share?"
                        >
                          price
                        </SmLabelWithTooltip>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.500"
                            w="auto"
                            h="auto"
                            ml="0.45rem"
                            // eslint-disable-next-line react/no-children-prop
                            children="$"
                          />
                          <Input
                            w="20"
                            id="price"
                            type="number"
                            size="xs"
                            pl="1.5rem"
                            {...field}
                            placeholder="00.00"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="posEffect">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.posEffect && form.touched.posEffect
                        }
                      >
                        <SmLabelWithTooltip
                          htmlFor="posEffect"
                          toolTipDescription="One can enter a 'long' position, 'short' position, or exit a position when trading. 
                          If you bought shares and were not previously in a short position, then the position effect is to open. If you were already short, then it would be to close.
                          If you sold shares and were not in a long position previously, then the position effect is to open. If you were already long, then it would be to close.
                          "
                        >
                          posEffect
                        </SmLabelWithTooltip>
                        <Select
                          w="24"
                          id="posEffect"
                          placeholder="Pick one"
                          size="xs"
                          {...field}
                        >
                          <option value="toOpen">To Open</option>
                          <option value="toClose">To Close</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.posEffect}
                        </FormErrorMessage>
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
