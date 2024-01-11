import Autocomplete from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';

export const StyledFormAutocomplete = styled(Autocomplete)<any>(({ theme, value }) => ({
  '& .MuiInputBase-root': {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    minHeight: theme.spacing(7),
    '&:hover .autoCompleteMultipleClearButton': {
      visibility: 'visible',
    },
    '& .MuiAutocomplete-input': {
      ...theme.typography.paragraphL,
      '&::placeholder': {
        ...theme.typography.paragraphL,
        color: theme.palette.text.secondary,
        opacity: 1,
      },
    },
    '& .MuiAutocomplete-tag': {
      ...theme.typography.labelM,
      backgroundColor: theme.palette.primary.light,
      marginRight: theme.spacing(1),
      borderRadius: theme.spacing(1),
      '& svg': {
        color: theme.palette.icon.main,
        fontSize: theme.spacing(2.25),
      },
    },
    '& .Mui-disabled.MuiAutocomplete-tag': {
      backgroundColor: alpha(theme.palette.neutral.dark, 0.08),
    },
    '& .autoCompleteMultipleClearButton': {
      marginRight: '-2px',
      padding: theme.spacing(1),
      visibility: 'hidden',
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: '1.5rem',
      borderRadius: '50%',
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      color: 'rgb(115, 119, 125)',
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translateY(-50%)',
    },
    '& .autoCompleteMultipleClearIndicator': {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      fill: 'currentcolor',
      flexShrink: '0',
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontSize: '1.25rem',
      color: 'rgb(115, 119, 125)',
    },
  },
  '& .MuiAutocomplete-clearIndicator': {
    visibility: value?.label ? 'visible !important' : 'hidden !important',
  },
}));
