/* eslint-disable react/display-name */
import React, { useEffect, useRef, Ref } from 'react';
import { ClickableCheckboxProps } from './types';

// Redecalare forwardRef in order to use generics in ref type
declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function InnerCheckBox<T>(
  { indeterminate, ...rest }: ClickableCheckboxProps<T>,
  ref: Ref<HTMLInputElement>,
) {
  // get modal context
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolvedRef.current.rowSelectedProps = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
}

export const IndeterminateCheckbox = React.forwardRef(InnerCheckBox);
