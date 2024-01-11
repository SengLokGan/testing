import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface StyledPatientRowStackProps extends StackProps {
  width?: number;
  height?: number;
}

export const StyledPatientRowStack = styled(Stack)<StyledPatientRowStackProps>(
  ({ theme, width = 16, textAlign = 'end', height }) => ({
    height: height ? theme.spacing(height) : 'unset',
    alignItems: 'center',
    width: '100%',
    '& > :first-child': {
      color: theme.palette.text.secondary,
      width: theme.spacing(width),
      minWidth: theme.spacing(width),
      textAlign: textAlign,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    '& > :last-child': {
      wordBreak: 'break-word',
    },
    '& a': {
      color: theme.palette.primary.main,
    },
  }),
);
