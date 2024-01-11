import { WithSx } from '@types';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { convertSxToArray } from '@utils/converters/mui';
import { alpha } from '@mui/material';

type GlobalAddButtonProps = WithSx<{
  onClick: () => void;
  isDisabled?: boolean;
}>;

export const GlobalAddButton = ({ onClick, isDisabled = false, sx = [] }: GlobalAddButtonProps) => {
  return (
    <IconButton
      data-testid="globalAddButtonId"
      onClick={onClick}
      disabled={isDisabled}
      sx={[
        (theme) => ({
          p: 2,
          bgcolor: theme.palette.primary.main,
          position: isDisabled ? 'relative' : 'fixed',
          boxShadow: '0 3px 6px 1px rgba(0, 51, 81, 0.2)',
          zIndex: theme.zIndex.modal,
          '& .MuiSvgIcon-root': {
            color: isDisabled ? theme.palette.neutral[60] : theme.palette.neutral[100],
          },
          '&.Mui-disabled': {
            bgcolor: alpha(theme.palette.neutral.dark, 0.08),
          },
          '&:hover': {
            bgcolor: theme.palette.primary[50],
          },
        }),
        !isDisabled && {
          right: (theme) => ({ xs: theme.spacing(2), sm: theme.spacing(3) }),
          bottom: (theme) => ({ xs: theme.spacing(8), sm: theme.spacing(3.125) }),
        },
        ...convertSxToArray(sx),
      ]}
    >
      <AddOutlinedIcon />
    </IconButton>
  );
};
