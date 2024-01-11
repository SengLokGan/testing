import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledStartIconButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  minWidth: theme.spacing(21),
  minHeight: theme.spacing(5.75),
  '& svg': {
    color: theme.palette.primary.main,
  },
  '& .MuiButton-startIcon': {
    marginLeft: 0,
  },
}));
