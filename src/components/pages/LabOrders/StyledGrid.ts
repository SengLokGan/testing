import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    paddingRight: 0,
  },
})) as typeof Grid;
