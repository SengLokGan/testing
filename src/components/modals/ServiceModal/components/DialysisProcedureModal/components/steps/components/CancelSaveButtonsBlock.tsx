import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type CancelSaveButtonsBlockProps = {
  isDirty: boolean;
  reset: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export const CancelSaveButtonsBlock = ({ isDirty, reset, onSubmit, isSubmitting }: CancelSaveButtonsBlockProps) => {
  const { t: tCommon } = useTranslation('common');

  return (
    <Box
      sx={(theme) => ({
        position: 'fixed',
        bottom: theme.spacing(3),
        width: theme.spacing(32.5),
        left: `calc(50% - ${theme.spacing(16.25)})`,
        zIndex: theme.zIndex.snackbar,
        display: isDirty ? 'block' : 'none',
      })}
    >
      <Button
        onClick={reset}
        variant="outlined"
        data-testid="cancelHDFormChanges"
        sx={(theme) => ({
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          width: theme.spacing(16.25),
          height: theme.spacing(5.5),
          bgcolor: theme.palette.surface.default,
        })}
      >
        <Typography variant="labelL">{tCommon('button.cancel')}</Typography>
      </Button>
      <Button
        onClick={onSubmit}
        variant="contained"
        disabled={isSubmitting}
        data-testid="saveHDFormChanges"
        sx={(theme) => ({
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: theme.spacing(16.25),
          height: theme.spacing(5.5),
        })}
      >
        <Typography variant="labelL">{tCommon('button.save')}</Typography>
      </Button>
    </Box>
  );
};
