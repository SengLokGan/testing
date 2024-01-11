import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';

export const StyledStatusMenuItem = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 0,
  borderColor: 'initial',
  backgroundColor: 'transparent',
  border: 'none',
  padding: `${theme.spacing(2.5)} ${theme.spacing(2)}`,
  textTransform: 'capitalize',
  '&.Mui-selected': {
    borderBottom: `4px solid ${theme.palette.border.main}`,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '&:hover, &:focus': {
    backgroundColor: 'transparent',
    borderBottom: `4px solid ${theme.palette.border.main}`,
  },
}));
