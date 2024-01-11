import { PropsWithChildren, useContext } from 'react';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { WithSx } from '@types';
import { DrawerStatus } from '@enums';
import { DrawerStatusContext } from '@constants';
import Stack from '@mui/material/Stack';
import { convertSxToArray } from '@utils/converters/mui';

export type DrawerHeaderProps = PropsWithChildren<
  WithSx<{
    collapsable?: boolean;
    onShow?: () => void;
    onCollapse?: () => void;
    onClose?: () => void;
  }>
>;

const DrawerHeader = ({
  children,
  sx,
  collapsable = true,
  onShow = () => {},
  onClose = () => {},
  onCollapse = () => {},
  ...props
}: DrawerHeaderProps) => {
  const status: DrawerStatus = useContext(DrawerStatusContext);

  return (
    <Box
      sx={[
        {
          width: 1,
          borderBottom: (theme) => '1px solid' + theme.palette.border.default,
          backgroundColor: (theme) =>
            status === DrawerStatus.Collapsed ? theme.palette.primary['90'] : theme.palette.surface.default,
          padding: (theme) => theme.spacing(2),
          pointerEvents: 'all',
          flexShrink: '0',
        },
        ...convertSxToArray(sx),
      ]}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item xs={collapsable ? 8 : 10}>
          {children}
        </Grid>
        <Grid item xs={collapsable ? 4 : 2}>
          <Stack direction="row" justifyContent="flex-end">
            {collapsable &&
              (status === DrawerStatus.Collapsed ? (
                <OpenInFullIcon
                  data-testid="drawerOpenInFullIcon"
                  onClick={onShow}
                  sx={[getHeaderIconStyles(), { mr: 2 }]}
                />
              ) : (
                <CloseFullscreenIcon
                  data-testid="drawerCloseFullscreenIcon"
                  onClick={onCollapse}
                  sx={[getHeaderIconStyles(), { mr: 2 }]}
                />
              ))}
            <CloseIcon data-testid="drawerCloseIcon" onClick={onClose} sx={getHeaderIconStyles()} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const getHeaderIconStyles = () => ({ color: (theme) => theme.palette.icon.main, cursor: 'pointer' });

export default DrawerHeader;
