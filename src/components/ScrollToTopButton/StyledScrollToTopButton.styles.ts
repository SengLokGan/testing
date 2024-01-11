import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';

interface StyledScrollToTopButtonProps extends IconButtonProps {}

export const StyledScrollToTopButton = styled(IconButton)<StyledScrollToTopButtonProps>(({ theme }) => ({
  backgroundColor: alpha('#006399', 0.08),
  position: 'fixed',
  padding: theme.spacing(1),
  bottom: `calc(50vh - ${theme.spacing(2.5)})`,
  right: theme.spacing(1),
  borderRadius: '50%',
  border: 'none',
  outline: 'none',
  zIndex: 1,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: alpha('#006399', 0.08),
  },
}));
