/* eslint-disable react/display-name */
import { useEffect, useContext, useRef, forwardRef } from 'react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { ModalStatesContext } from './CreateContext';
import { ButtonRef, SelectedRowProps } from './types';

export const TableBtn = forwardRef<ButtonRef, SelectedRowProps>(
  (rowProps, ref) => {
    // get modal context
    const modalState = useContext(ModalStatesContext);
    const defaultRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      resolvedRef.current.rowSelectedProps = rowProps;
      console.log('Logging resolvedRef: ', resolvedRef);
    }, [resolvedRef, rowProps]);

    return (
      <IconButton
        ml={2}
        ref={resolvedRef}
        size="small"
        aria-label="Edit Button"
        onClick={modalState?.onModalOpen}
        icon={<EditIcon m={1} />}
      />
    );
  },
);
