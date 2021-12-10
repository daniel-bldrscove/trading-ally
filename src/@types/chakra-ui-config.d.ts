import { FormControl } from '@chakra-ui/react';

declare module '@chakra-ui/react' {
  export interface FormControlOptions<
    D extends Record<string, unknown>,
  > extends FormControl<D>,
      // note that having Record here allows you to add anything
      // to the options, this matches the spirit of the underlying
      // js library, but might be cleaner if it's replaced by a more
      // specific type that matches your feature set, this is a safe default.
      Record<string, unknown> {}
}
