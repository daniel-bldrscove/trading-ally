import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface BtnProps {
  action?: string;
  text?: string;
  onClick: () => void;
}

export const TableBtn = ({ action, onClick }: BtnProps): JSX.Element => {
  if (action === 'edit') {
    return (
      <IconButton
        aria-label="Edit Trade"
        onClick={onClick}
        icon={<EditIcon />}
      />
    );
  } else if (action === 'delete') {
    return (
      <IconButton
        aria-label="Delete Trade"
        onClick={onClick}
        icon={<DeleteIcon />}
      />
    );
  }
  return <></>;
};
