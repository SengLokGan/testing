import { PropsWithChildren, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { DrawerStatusContext } from '@constants';
import { DrawerStatus } from '@enums';
import type { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';

export type DrawerBodyProps = PropsWithChildren<WithSx<{}>>;

const DrawerBody = ({ children, sx, ...props }: DrawerBodyProps) => {
  const status: DrawerStatus = useContext(DrawerStatusContext);

  return (
    <Stack
      className="custom-scrollbar drawerBody"
      sx={[
        {
          opacity: status === DrawerStatus.Collapsed ? 0 : 1,
          width: 1,
          padding: (theme) => (status === DrawerStatus.Collapsed ? `0 ${theme.spacing(2)}` : theme.spacing(2)),
          overflowY: 'auto',
          transition: '.3s',
          flexGrow: 1,
        },
        ...convertSxToArray(sx),
      ]}
      {...props}
    >
      <Collapse
        data-testid="drawerBodyCollapseWrapper"
        in={status !== DrawerStatus.Collapsed}
        sx={{
          '& .MuiCollapse-vertical': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {children}
      </Collapse>
    </Stack>
  );
};

export default DrawerBody;
