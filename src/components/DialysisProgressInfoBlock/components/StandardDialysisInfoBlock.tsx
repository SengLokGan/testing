import { useTranslation } from 'react-i18next';
import type { StandardDialysisInfoBlockProps } from '@types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { BaseProgressBar } from '@components/BaseProgressBar/BaseProgressBar';
import { CardWithIcon } from '@components/CardWithIcon/CardWithIcon';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { UserPermissions, DialysisStatus, AppointmentStatus } from '@enums';
import { PermissionGuard } from '@guards';

export const StandardDialysisInfoBlock = ({
  withInfoIcon = false,
  checkInfoHandler = () => {},
  progressInPercents,
  progressLabel,
  dialysisProcessInfo,
}: StandardDialysisInfoBlockProps) => {
  const { t } = useTranslation('dialysis');
  const { status, bay } = dialysisProcessInfo;
  const [startEndTime, setStartEndTime] = useState('');

  useEffect(() => {
    const { startTime, endTime } = dialysisProcessInfo;
    if (startTime && endTime) {
      const formattedStartTime = format(new Date(startTime), 'hh:mm a');
      const formattedEndTime = format(new Date(endTime), 'hh:mm a');

      setStartEndTime(`${formattedStartTime} - ${formattedEndTime}`);
    }
  }, [dialysisProcessInfo]);

  switch (status) {
    case DialysisStatus.CheckIn:
    case DialysisStatus.PreDialysis:
    case AppointmentStatus.ServiceEncountered:
      return (
        <Paper
          data-testid={`StandardDialysisInfoBlockVariant${status}`}
          sx={[
            (theme) => ({
              minWidth: theme.spacing(43.25),
              width: 1,
              p: `${theme.spacing(2.75)} ${theme.spacing(3)}`,
            }),
          ]}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center">
              {status === DialysisStatus.CheckIn ? (
                <WatchLaterIcon data-testid="checkInDialysisIcon" sx={{ mr: 1 }} />
              ) : (
                <ChangeCircleIcon data-testid="preDialysisIcon" sx={{ fill: '#FFD600', mr: 1 }} />
              )}
              <Typography variant="headerS">
                {t(status === DialysisStatus.CheckIn ? 'progress.waiting' : 'progress.pending')}
              </Typography>
            </Stack>
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
        </Paper>
      );
    case DialysisStatus.HDReading:
    case DialysisStatus.PostDialysis:
      return (
        <Box data-testid="StandardDialysisInfoBlockVariantWithProgress">
          <CardWithIcon
            icon={withInfoIcon ? OpenInNewIcon : null}
            title={
              status === DialysisStatus.HDReading ? t('progress.dialysisInProgress') : t('progress.dialysisIsFinished')
            }
            onIconClick={checkInfoHandler}
          >
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <span>{bay || ''}</span>
              <span>{startEndTime}</span>
            </Stack>
            <BaseProgressBar current={progressInPercents} label={progressLabel} />
          </CardWithIcon>
        </Box>
      );
    default:
      return null;
  }
};
