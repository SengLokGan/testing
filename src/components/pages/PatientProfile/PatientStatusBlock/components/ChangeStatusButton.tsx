import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type ChangeStatusButtonProps = {
  onClick: () => void;
};

export const ChangeStatusButton = ({ onClick }: ChangeStatusButtonProps) => {
  const { t } = useTranslation('patient');
  return (
    <Typography
      variant="paragraphM"
      onClick={onClick}
      sx={{ color: (theme) => theme.palette.text.secondary, cursor: 'pointer' }}
    >
      {t('patientStatusBlock.changeStatus')}
    </Typography>
  );
};
