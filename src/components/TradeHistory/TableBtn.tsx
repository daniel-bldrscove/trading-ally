import { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { ModalStatesContext } from './CreateContext';

interface BtnProps {
  action?: string;
  ml?: number;
}

export const TableBtn = ({ action, ml }: BtnProps): JSX.Element => {
  // get modal context
  const modalState = useContext(ModalStatesContext);

  if (action === 'edit') {
    return (
      <IconButton
        ml={ml}
        size="small"
        aria-label="Edit Trade"
        onClick={modalState?.onModalOpen}
        icon={<EditIcon m={1} />}
      />
    );
  } else if (action === 'delete') {
    return (
      <IconButton
        ml={ml}
        size="small"
        aria-label="Delete Trade"
        onClick={modalState?.onAlertOpen}
        icon={<DeleteIcon m={1} />}
      />
    );
  }
  return <></>;
};
