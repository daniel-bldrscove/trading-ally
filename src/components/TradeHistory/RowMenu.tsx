import { useEffect, useRef, useState, useContext } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit2, FiTrash } from 'react-icons/fi';
import { ModalStatesContext } from './CreateContext';
import { RowMenuProps, DataRow } from './types';

export const RowMenu = ({ rowProps, ...rest }: RowMenuProps): JSX.Element => {
  const [rowData, setRowData] = useState({});
  const [rowId, setRowId] = useState('');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { onModalOpen, onAlertOpen, passDataToModalContent } =
    useContext(ModalStatesContext);
  const ref = useRef<DataRow | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ref.current = rowProps;
    if (!ref.current) throw Error('divRef is not assigned');

    setRowData(rowProps);
    setRowId(ref.current.ref['@ref'].id);
  }, [rowProps]);

  const handleModalOpen = (modalType: string) => {
    if (modalType === 'modal') {
      onModalOpen();
    } else if (modalType === 'alert') {
      onAlertOpen();
    }
    // pass selected row data when user opens modal
    passDataToModalContent(rowData);
  };

  return (
    <Menu isLazy {...rest}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={() => handleModalOpen('modal')} icon={<FiEdit2 />}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleModalOpen('alert')} icon={<FiTrash />}>
          Delete
        </MenuItem>
        <MenuItem icon={<FiEdit2 />}>{rowId}</MenuItem>
      </MenuList>
    </Menu>
  );
};
