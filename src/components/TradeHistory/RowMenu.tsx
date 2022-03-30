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
  const ref = React.useRef<Row | null>(null);

  React.useEffect(() => {
    const isRowData = Boolean('data' in rowTableData);
    if (!isRowData) {
      return;
    }
    ref.current = rowTableData;
  }, [rowTableData]);

  if (ref.current) {
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => (onModalOpen(), setRowData(ref.current!))}
            icon={<FiEdit2 />}
          >
            Edit
          </MenuItem>
          <MenuItem
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => (onAlertOpen(), setRowData(ref.current!))}
            icon={<FiTrash />}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return null;
};
