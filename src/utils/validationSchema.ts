import * as Yup from 'yup';
import { parse, isValid } from 'date-fns';

const today = new Date();

export const logTradeValidationSchema = Yup.object({
  date: Yup.date()
    .transform(function (value, originalValue) {
      // check to see if the previous transform already parsed the date
      if (this.isType(value)) return value;
      // the default coercion failed, so parse with date-fns,
      // returns a timestamp dateString using given format or 'Invalid Date'
      value = parse(originalValue, 'yyyy-MM-dd', new Date());
      // if invalid - return an `InvalidDate` to trigger error
      return isValid(value) ? value : new Date('');
    })
    .max(today, 'Cannot log future trades')
    .required('Required'),
  execTime: Yup.date()
    // transform runs before Yup.date()
    .transform(function (value, originalValue) {
      // value is the result of new Date(originalValue)
      // returns a timestamp dateString using given format or 'Invalid Date'
      value = parse(originalValue, 'HH:mm', new Date());
      // if invalid - return an `InvalidDate` to trigger error
      return isValid(value) ? value : new Date('');
    })
    .typeError('Invalid time format')
    .required('Required'),
  spread: Yup.string()
    .matches(/(Stock)/, 'Spread must be "Stock"')
    .max(6)
    .required('Spread must be "Stock"'),
  side: Yup.string().max(6).required(),
  qty: Yup.number()
    .test('is-not-zero', '${path} cannot be 0', (value) => value !== 0)
    .max(100000)
    .min(-100000)
    .required(),
  ticker: Yup.string()
    .strict()
    .uppercase('Ticker must be uppercase')
    .max(6, 'Must be 6 characters or less')
    .matches(/^[a-zA-Z]+$/, 'Letters only')
    .required('Stock ticker required'),
  price: Yup.number().max(1000000).min(0.01).required(),
  posEffect: Yup.string()
    .max(8, 'Must be 7 characters or less')
    .required('Required'),
});
