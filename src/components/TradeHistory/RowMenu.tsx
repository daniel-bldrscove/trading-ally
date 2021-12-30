import { useContext } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit2, FiTrash } from 'react-icons/fi';
import { ModalStatesContext } from './CreateContext';

export const RowMenu = (): JSX.Element => {
  const modalState = useContext(ModalStatesContext);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={modalState?.onModalOpen} icon={<FiEdit2 />}>
          Edit
        </MenuItem>
        <MenuItem onClick={modalState?.onAlertOpen} icon={<FiTrash />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
