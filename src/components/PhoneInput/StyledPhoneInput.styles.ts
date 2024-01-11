import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const StyledFlagSelect = styled(Select)(({ theme }) => ({
  width: theme.spacing(9),
  height: theme.spacing(7),
  marginRight: theme.spacing(2),
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: `0 0 0 ${theme.spacing(2)}`,
  },
  '&:before, &:hover:not(.Mui-disabled):before': {
    borderBottom: 'unset',
  },
}));

export const StyledPhoneInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& > .MuiInputBase-root': {
    paddingLeft: theme.spacing(2),
  },
  '& .MuiInputAdornment-root': {
    color: theme.palette.primary[10],
  },
  '& input': {
    padding: `17px 0 ${theme.spacing(2)} ${theme.spacing(1)}`,
  },
}));
