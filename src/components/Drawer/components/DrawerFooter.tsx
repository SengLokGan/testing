import { PropsWithChildren, useContext } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { DrawerStatusContext } from '@constants';
import { DrawerStatus } from '@enums';

export type DrawerFooterProps = PropsWithChildren<{}>;

const DrawerFooter = ({ children }: DrawerFooterProps) => {
  const status: DrawerStatus = useContext(DrawerStatusContext);

  return (
    <Collapse
      data-testid="drawerFooterCollapseWrapper"
      in={status !== DrawerStatus.Collapsed}
      sx={{
        flexShrink: 0,
      }}
    >
      <Box
        data-testid="drawerFooter"
        sx={(theme) => ({
          width: 1,
          borderTop: `1px solid ${theme.palette.border.default}`,
          padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
          backgroundColor: theme.palette.surface.default,
          pointerEvents: 'all',
        })}
      >
        {children}
      </Box>
    </Collapse>
  );
};

export default DrawerFooter;
