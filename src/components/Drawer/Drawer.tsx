import { PropsWithChildren, ReactNode } from 'react';
import DrawerMui from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { WithSx } from '@types';
import DrawerBody from './components/DrawerBody';
import DrawerHeader from './components/DrawerHeader';
import DrawerFooter from './components/DrawerFooter';
import { DrawerStatus, DrawerAnchor } from '@enums';
import { DRAWER_WIDTH, DrawerStatusContext, footerHeight } from '@constants';
import { convertSxToArray } from '@utils/converters/mui';

export type DrawerProps = PropsWithChildren<
  WithSx<{
    title: string;
    collapsable?: boolean;
    status: DrawerStatus;
    nextStatus: DrawerStatus;
    anchor?: DrawerAnchor;
    onChangeStatus?: (status: DrawerStatus) => void;
    footerChildren?: ReactNode;
    index?: number;
  }>
>;

export const Drawer = ({
  status,
  title,
  sx,
  footerChildren,
  collapsable,
  anchor = DrawerAnchor.Right,
  onChangeStatus = () => {},
  nextStatus = DrawerStatus.Hidden,
  children,
  index = 0,
  ...props
}: DrawerProps) => {
  return (
    <DrawerStatusContext.Provider value={status}>
      <DrawerMui
        data-testid="drawer"
        variant="persistent"
        open={true}
        anchor={anchor}
        hideBackdrop={true}
        sx={[
          {
            zIndex: index,
            pointerEvents: 'none',
            '& > .MuiDrawer-paper': {
              pointerEvents: status !== DrawerStatus.Showed && nextStatus !== DrawerStatus.Hidden ? 'none' : 'all',
              right: nextStatus === DrawerStatus.Hidden || status === DrawerStatus.Hidden ? '-100vw' : 0,
              justifyContent: 'flex-end',
              transitionProperty: 'right',
              overflowY: 'initial',
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              transition: '.3s',
              width: DRAWER_WIDTH,
            },
          },
          ...convertSxToArray(sx),
        ]}
        {...props}
      >
        <Stack
          sx={(theme) => ({
            background: theme.palette.surface.default,
            flexGrow: status === DrawerStatus.Collapsed ? 0 : 1,
            maxHeight: { xs: 1, sm: `calc(100% - ${theme.spacing(footerHeight)})` },
            boxShadow: '0px 8px 16px 2px rgba(0, 0, 0, 0.16)',
            transition: '.3s',
            position: 'relative',
            mb: { sm: footerHeight },
          })}
        >
          <DrawerHeader
            collapsable={collapsable}
            onShow={() => onChangeStatus(DrawerStatus.Showed)}
            onClose={() => onChangeStatus(DrawerStatus.Hidden)}
            onCollapse={() => onChangeStatus(DrawerStatus.Collapsed)}
          >
            <Typography variant="headerS">{title}</Typography>
          </DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          {footerChildren && <DrawerFooter>{footerChildren}</DrawerFooter>}
        </Stack>
      </DrawerMui>
    </DrawerStatusContext.Provider>
  );
};
