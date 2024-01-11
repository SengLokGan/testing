import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';
import { WithSx } from '@types';
import { LocationBrowserStorage } from '@services';
import { Footer } from './Footer';
import { Header } from './Header';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { selectUserPermissions } from '@store/slices/userSlice';
import { NoPermissions } from '@containers/layouts/NoPermissions/NoPermissions';
import { convertSxToArray } from '@src/utils';
import { FooterPlace } from '@enums/containers';

type MainLayoutProps = WithSx<PropsWithChildren<{}>>;

export const MainLayout = ({ children, sx = [] }: MainLayoutProps) => {
  let location = useLocation();
  const browserHistory = new LocationBrowserStorage();
  browserHistory.fetch(location.pathname);
  const userPermissions = selectUserPermissions();

  return (
    <ErrorBoundary logErrors>
      <Header />
      {userPermissions.length ? children : <NoPermissions />}
      <Box
        sx={[
          (theme) => ({
            zIndex: theme.zIndex.tooltip,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `solid 1px ${theme.palette.border.default}`,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: theme.palette.surface.default,
          }),
          ...convertSxToArray(sx),
        ]}
      >
        {/* <Footer place={FooterPlace.Global} sx={{ display: { xs: 'none', sm: 'flex' } }} /> */}
      </Box>
    </ErrorBoundary>
  );
};
