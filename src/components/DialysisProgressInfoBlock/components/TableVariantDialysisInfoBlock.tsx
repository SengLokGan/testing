import { TableVariantDialysisInfoBlockProps } from '@types';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { BaseProgressBar } from '@components/BaseProgressBar/BaseProgressBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { UserPermissions, DialysisStatus } from '@enums';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { PermissionGuard } from '@guards';

export const TableVariantDialysisInfoBlock = ({
  progressInPercents,
  progressLabel,
  dialysisProcessInfo,
  checkInfoHandler = () => {},
}: TableVariantDialysisInfoBlockProps) => {
  const { t } = useTranslation('dialysis');
  const { status } = dialysisProcessInfo;

  const getStatusBlock = () => {
    switch (status) {
      case DialysisStatus.CheckIn:
      case DialysisStatus.PreDialysis:
        return (
          <Stack direction="row" alignItems="center">
            {status === DialysisStatus.CheckIn ? (
              <WatchLaterIcon data-testid="checkInDialysisIcon" sx={(theme) => ({ mr: theme.spacing(0.75) })} />
            ) : (
              <ChangeCircleIcon
                data-testid="preDialysisIcon"
                sx={(theme) => ({ fill: '#FFD600', mr: theme.spacing(0.75) })}
              />
            )}
            <Typography variant="paragraphM">
              {t(status === DialysisStatus.CheckIn ? 'progress.waiting' : 'progress.pending')}
            </Typography>
          </Stack>
        );
      case DialysisStatus.HDReading:
      case DialysisStatus.PostDialysis:
        return (
          <BaseProgressBar
            current={progressInPercents}
            label={progressLabel}
            finished={status === DialysisStatus.PostDialysis}
          />
        );
      case DialysisStatus.Completed:
      case DialysisStatus.Cancelled:
        return (
          <Stack direction="row" alignItems="center">
            {status === DialysisStatus.Completed ? (
              <CheckCircleIcon
                data-testid="completedDialysisIcon"
                sx={(theme) => ({ fill: '#006D3C', mr: theme.spacing(0.75) })}
              />
            ) : (
              <CancelIcon
                data-testid="canceledDialysisIcon"
                sx={(theme) => ({ fill: theme.palette.error[40], mr: theme.spacing(0.75) })}
              />
            )}
            <Typography variant="paragraphM">
              {t(status === DialysisStatus.Completed ? 'progress.completed' : 'progress.canceled')}
            </Typography>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Stack
      data-testid={`TableVariantDialysisInfoBlock${status}`}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {getStatusBlock()}
      <PermissionGuard
        permissions={[
          UserPermissions.DialysisEditMeasurement,
          UserPermissions.DialysisAddMeasurement,
          UserPermissions.DialysisViewMeasurements,
        ]}
        exact={false}
      >
        <IconButton onClick={checkInfoHandler} sx={{ mr: -1, ml: 2 }}>
          <OpenInNewIcon />
        </IconButton>
      </PermissionGuard>
    </Stack>
  );
};
