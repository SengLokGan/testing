import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: theme.spacing(12.5),
  borderColor: theme.palette.border.main,
  padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
  textTransform: 'capitalize',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
