import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit2, FiTrash } from 'react-icons/fi';
import { useRowDataContext } from './RowDataProvider';
import { RowMenuProps, Row } from '../../@types/trade-history-types';
import { useDialogContext } from './DialogProvider';

export const RowMenu = ({
  rowTableData,
  ...rest
}: RowMenuProps): JSX.Element => {
  const { onModalOpen, onAlertOpen } = useDialogContext();
  const context = useRowDataContext();
  const { setRowData } = context;
  const ref = React.useRef<Row | null>(null);

  React.useEffect(() => {
    const isRowData = Boolean('data' in rowTableData);
    if (!isRowData) {
      return;
    }
    ref.current = rowTableData;
  }, [rowTableData]);

  const handleOpen = (modalType: string) => {
    if (ref.current) {
      console.log('Row Menu - ref.current: ', ref.current);
      if (modalType === 'modal') {
        onModalOpen();
      } else if (modalType === 'alert') {
        onAlertOpen();
      }

      // pass row data to dialog onOpen
      setRowData(ref.current);
    }
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
        <MenuItem onClick={() => handleOpen('modal')} icon={<FiEdit2 />}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleOpen('alert')} icon={<FiTrash />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
