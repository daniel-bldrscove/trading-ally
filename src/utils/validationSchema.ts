import * as Yup from 'yup';
import { parse, isValid } from 'date-fns';

const today = new Date();

export const logTradeValidationSchema = Yup.object({
  date: Yup.date()
    .transform(function (value, originalValue) {
      // check to see if the previous transform already parsed the date
      if (this.isType(value)) return value;
      // the default coercion failed so parse with date-fns instead
      value = parse(originalValue, 'yyyy-MM-dd', new Date());
      // if it's valid return the date object, otherwise return an `InvalidDate`
      return isValid(value) ? value : new Date('');
    })
    .max(today, 'Cannot log future trades')
    .required('Required'),
  execTime: Yup.date()
    .transform(function (currentValue, originalValue) {
      // original value comes in as 24hr format
      // which registers invalid when ran against the previous Yup.date() method
      // so we parse and give the validation a new date object
      currentValue = parse(originalValue, 'kk:mm', new Date());
      // if currentValue is now valid, return it, otherwise return an invalid new Date();
      return isValid(currentValue) ? currentValue : new Date('');
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
  symbol: Yup.string()
    .uppercase()
    .max(6, 'Must be 6 characters or less')
    .matches(/^[a-zA-Z]+$/, 'Letters only')
    .required('Symold required'),
  price: Yup.number().max(1000000).min(0.01).required(),
  posEffect: Yup.string()
    .max(8, 'Must be 7 characters or less')
    .required('Required'),
});
