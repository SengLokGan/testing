import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Dictionaries } from '@utils/getOptionsListFormCatalog';
import { DialysisMachineStatus as DialysisMachineStatusEnum } from '@enums';
import { useMemo } from 'react';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

interface DialysisMachineStatusProps {
  caption?: boolean;
  status?: DialysisMachineStatusEnum;
}

export const DialysisMachineStatus = ({ caption = false, status }: DialysisMachineStatusProps) => {
  const { t } = useTranslation('dialysisMachine');
  const { t: tStatuses } = useTranslation(Dictionaries.DialysisMachineStatuses);

  const statusIcon = useMemo(() => {
    switch (status) {
      case DialysisMachineStatusEnum.SPARE:
        return (
          <>
            <ChangeCircleIcon sx={{ fill: ({ palette }) => palette.icon.main, mr: 1 }} />
          </>
        );
      case DialysisMachineStatusEnum.RETIRED:
        return (
          <>
            <CancelIcon sx={{ fill: ({ palette }) => palette.error.main, mr: 1 }} />
          </>
        );
      case DialysisMachineStatusEnum.STANDBY:
        return (
          <>
            <ErrorIcon sx={{ fill: ({ palette }) => palette.primary.main, mr: 1 }} />
          </>
        );
      case DialysisMachineStatusEnum.UNDER_REPAIR:
        return (
          <>
            <BuildCircleIcon sx={{ fill: '#FF9254', mr: 1 }} />
          </>
        );
      default:
        return (
          <>
            <CheckCircleIcon sx={{ fill: '#006D3C', mr: 1 }} />
          </>
        );
    }
  }, []);

  if (status === undefined) return null;

  return (
    <Stack direction="row" alignItems="center">
      {statusIcon}
      {caption ? (
        <Typography component="span" variant="paragraphM">
          {t(status ? tStatuses(status) : '—')}
        </Typography>
      ) : null}
    </Stack>
  );
};
