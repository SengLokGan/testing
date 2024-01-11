import { OneDayCalendarAppointmentStatus } from '@enums/components';
import Typography from '@mui/material/Typography';
import { getAppointmentStatusIcon } from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';
import { getHoursAndMinutes } from '@utils/getTimeFromDate';

type HDProgressInfoProps = {
  status: OneDayCalendarAppointmentStatus;
  duration: number;
  startTime?: string;
  timeLeft: number;
};

export const HDProgressInfo = ({ status, duration, startTime, timeLeft }: HDProgressInfoProps) => {
  return (
    <>
      {getAppointmentStatusIcon(status)}
      <Typography variant="labelM">
        {status === OneDayCalendarAppointmentStatus.POST_DIALYSIS
          ? `${getHoursAndMinutes(duration, ':')}`
          : `${startTime ? '-' : ''} ${getHoursAndMinutes(timeLeft, ':')}`}
      </Typography>
    </>
  );
};
