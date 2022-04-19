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
}: RowMenuProps): JSX.Element | null => {
  const { onModalOpen, onAlertOpen } = useDialogContext();
  const context = useRowDataContext();
  const { setRowData } = context;
  const tDRef = React.useRef<Row | null>(null);

  React.useEffect(() => {
    const isRowData = Boolean('data' in rowTableData);
    if (!isRowData) {
      return;
    }
    tDRef.current = rowTableData;
  }, [rowTableData]);

  return (
    <Menu isLazy {...rest}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem
          onClick={() =>
            tDRef.current && (onModalOpen(), setRowData(tDRef.current))
          }
          icon={<FiEdit2 />}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            tDRef.current && (onAlertOpen(), setRowData(tDRef.current))
          }
          icon={<FiTrash />}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return null;
};
