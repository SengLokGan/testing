import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';

type CollapseControlProps = {
  status: boolean;
  onClick: () => void;
};

export const CollapseControl = ({ status, onClick }: CollapseControlProps) => {
  const { t } = useTranslation('patient', { keyPrefix: 'patientStatusBlock' });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={(theme) => ({
        pt: 2,
        borderTop: `solid 1px ${theme.palette.border?.default}`,
      })}
    >
      <Typography
        variant="labelM"
        onClick={onClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: (theme) => theme.palette.text.secondary,
          cursor: 'pointer',
        }}
      >
        {t(status ? 'showLess' : 'showMore')}
        <ExpandMoreIcon
          sx={{
            pl: 1,
            mb: '-3px',
            transition: '.3s',
            transform: `rotateX(${status ? 180 : 0}deg)`,
          }}
        />
      </Typography>
    </Stack>
  );
};
