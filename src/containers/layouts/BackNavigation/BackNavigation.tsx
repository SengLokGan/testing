import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { LocationBrowserStorage } from '@services/LocationBrowser';
import { selectHasBeenRedirectedToAddAccess } from '@store/slices';
import Box from '@mui/material/Box';

type PathExceptions = {
  [key: string]: string;
};

interface BackNavigationProps {
  backButtonTitle: string;
  pathExceptions: PathExceptions;
}

export const BackNavigation = ({ backButtonTitle, pathExceptions }: BackNavigationProps) => {
  const navigate = useNavigate();
  const previousLocation = new LocationBrowserStorage();
  const hasBeenRedirectedToAddAccess = selectHasBeenRedirectedToAddAccess();
  const showGoBackButton = !hasBeenRedirectedToAddAccess;
  if (!showGoBackButton) return null;
  return (
    <Box
      sx={(theme) => ({
        px: 3,
        py: 2,
        backgroundColor: theme.palette.surface.default,
        borderBottom: `solid 1px ${theme.palette.border.default}`,
      })}
    >
      <IconButton
        sx={{
          p: 0,
          '&:hover': { backgroundColor: 'unset' },
        }}
        onClick={() => navigate(getRedirectPath(previousLocation.get()?.previousPath, pathExceptions))}
      >
        <Stack direction="row" spacing={2} sx={{ width: 1 }} alignItems="center">
          <ArrowBackOutlinedIcon />
          {backButtonTitle && (
            <Typography
              variant="headerS"
              sx={{
                textAlign: { xs: 'center', md: 'start' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 1,
                color: '#2F3032',
              }}
            >
              {backButtonTitle}
            </Typography>
          )}
          {!backButtonTitle && <Skeleton height={20} sx={{ width: (theme) => theme.spacing(25) }} />}
        </Stack>
      </IconButton>
    </Box>
  );
};

const getRedirectPath = (path: string, pathExceptions: PathExceptions): string => {
  const passNameData = path?.split('/');
  const pathName = passNameData[passNameData.length - 1];
  if (!!pathName.length && !(pathName in pathExceptions)) {
    return path;
  }
  return '../';
};
