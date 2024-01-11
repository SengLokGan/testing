import { Box, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { BaseProgressBar } from '@components/BaseProgressBar/BaseProgressBar';
import { OneDayCalendarAppointmentStatus } from '@enums/components';
import { getHoursAndMinutes } from '@utils/getTimeFromDate';
import { format, isValid, parse } from 'date-fns';
import { selectScheduleDate } from '@store/slices';
import { HemodialysisServices, ShiftServices } from '@types';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type HemodialysisServiceProps = {
  openServicesScreen: () => void;
  hemodialysis: HemodialysisServices;
  shift: ShiftServices;
  icon: ReactElement;
  timeLeft: number;
};
export const HemodialysisService = ({
  openServicesScreen,
  hemodialysis,
  shift,
  icon,
  timeLeft,
}: HemodialysisServiceProps) => {
  const { t } = useTranslation('schedule');
  const { t: tDialysis } = useTranslation('dialysis');
  const scheduleDate = selectScheduleDate();
  const getHemodialysisStatusTitle = () => {
    const { status } = hemodialysis;
    switch (status) {
      case OneDayCalendarAppointmentStatus.CHECK_IN:
      case OneDayCalendarAppointmentStatus.PRE_DIALYSIS:
        return tDialysis(status === OneDayCalendarAppointmentStatus.CHECK_IN ? 'progress.waiting' : 'progress.pending');
      case OneDayCalendarAppointmentStatus.HD_READING:
      case OneDayCalendarAppointmentStatus.POST_DIALYSIS:
        return tDialysis(
          status === OneDayCalendarAppointmentStatus.HD_READING
            ? 'progress.dialysisInProgress'
            : 'progress.dialysisIsFinished',
        );
      case OneDayCalendarAppointmentStatus.COMPLETED:
        return t('statuses.completed');
      default:
        return '';
    }
  };

  const getTimeString = (time) => {
    if (!time) return '';
    const dateTime = parse(time, 'HH:mm:ss', new Date());
    return isValid(dateTime) ? format(dateTime, 'HH:mm a') : '';
  };

  const progress = useMemo(() => {
    return hemodialysis.status === OneDayCalendarAppointmentStatus.POST_DIALYSIS
      ? 100
      : 100 - timeLeft / (hemodialysis.duration / 100);
  }, [hemodialysis, timeLeft]);

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} sx={{ cursor: 'pointer' }} alignItems="center" onClick={openServicesScreen}>
        <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
          {t('hdProcedure')}
        </Typography>
        <OpenInNewIcon sx={({ palette }) => ({ color: palette.primary.main, ml: 1 })} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        {hemodialysis.startedAt &&
        (hemodialysis.status === OneDayCalendarAppointmentStatus.HD_READING ||
          hemodialysis.status === OneDayCalendarAppointmentStatus.POST_DIALYSIS) ? (
          <Box sx={{ width: 1 }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="labelM">{hemodialysis.location.name}</Typography>
              <BaseProgressBar
                current={progress}
                label={`- ${getHoursAndMinutes(timeLeft)}`}
                finished={hemodialysis.status === OneDayCalendarAppointmentStatus.POST_DIALYSIS}
              />
            </Stack>
          </Box>
        ) : (
          <>
            {hemodialysis.status === OneDayCalendarAppointmentStatus.COMPLETED ? (
              <CheckCircleIcon fontSize="small" sx={{ color: '#006D3C' }} />
            ) : (
              icon
            )}
            <Typography variant="labelM">{getHemodialysisStatusTitle()}</Typography>
          </>
        )}
      </Stack>
      <Stack direction="column" spacing={0}>
        <Typography variant="paragraphM">{format(scheduleDate, 'EEEE, MMMM dd, yyyy')}</Typography>
        <Typography variant="paragraphM">{getHoursAndMinutes(hemodialysis.duration)}</Typography>
        <Typography variant="paragraphM">{`${getTimeString(shift.startTime)} – ${getTimeString(shift.endTime)} (${
          shift.name
        } ${t('shift')})`}</Typography>
      </Stack>
    </Stack>
  );
};
