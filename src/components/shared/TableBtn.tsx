import { Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface BtnProps {
  action?: string;
  text?: string;
  onClick: () => void;
}

export const TableBtn = ({ action, onClick }: BtnProps): JSX.Element => {
  if (action === 'edit') {
    return (
      <Button onClick={onClick}>
        <EditIcon />
      </Button>
    );
  } else if (action === 'delete') {
    return (
      <Button onClick={onClick}>
        <DeleteIcon />
      </Button>
    );
  }
  return <></>;
};
