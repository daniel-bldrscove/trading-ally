import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface BtnProps {
  action?: string;
  onClick?: () => void;
  ml?: number;
}

export const TableBtn = ({ action, onClick, ml }: BtnProps): JSX.Element => {
  if (action === 'edit') {
    return (
      <IconButton
        ml={ml}
        size="small"
        aria-label="Edit Trade"
        onClick={onClick}
        icon={<EditIcon m={1} />}
      />
    );
  } else if (action === 'delete') {
    return (
      <IconButton
        ml={ml}
        size="small"
        aria-label="Delete Trade"
        onClick={onClick}
        icon={<DeleteIcon m={1} />}
      />
    );
  }
  return <></>;
};
