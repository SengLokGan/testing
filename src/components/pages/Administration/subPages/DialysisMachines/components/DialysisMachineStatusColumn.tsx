import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import { DialysisMachineStatus } from '@enums';

export const DialysisMachineStatusColumn = ({ status }: { status: DialysisMachineStatus }) => {
  const { t } = useTranslation('dialysisMachines');

  const statusContent = useMemo(() => {
    switch (status) {
      case DialysisMachineStatus.SPARE:
        return (
          <>
            <ChangeCircleIcon sx={{ fill: '#73777D', mr: 1 }} />
            <Typography component="span" variant="paragraphM">
              {t('machineStatuses.spare')}
            </Typography>
          </>
        );
      case DialysisMachineStatus.RETIRED:
        return (
          <>
            <CancelIcon sx={{ fill: '#BA1A1A', mr: 1 }} />
            <Typography component="span" variant="paragraphM">
              {t('machineStatuses.retired')}
            </Typography>
          </>
        );
      case DialysisMachineStatus.STANDBY:
        return (
          <>
            <ErrorIcon sx={{ fill: '#006398', mr: 1 }} />
            <Typography component="span" variant="paragraphM">
              {t('machineStatuses.standby')}
            </Typography>
          </>
        );
      case DialysisMachineStatus.UNDER_REPAIR:
        return (
          <>
            <BuildCircleIcon sx={{ fill: '#FF9254', mr: 1 }} />
            <Typography component="span" variant="paragraphM">
              {t('machineStatuses.underRepair')}
            </Typography>
          </>
        );
      default:
        return (
          <>
            <CheckCircleIcon sx={{ fill: '#006D3C', mr: 1 }} />
            <Typography component="span" variant="paragraphM">
              {t('machineStatuses.active')}
            </Typography>
          </>
        );
    }
  }, []);

  return (
    <Stack direction="row" alignItems="center">
      {statusContent}
    </Stack>
  );
};
