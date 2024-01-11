import { useMemo, useState, useEffect, useRef } from 'react';
import { getAppointmentStyles } from './AppointmentStyles';
import { Box, Typography, Stack, Popover } from '@mui/material';
import { OneDayCalendarAppointment } from '@types';
import { OneDayCalendarAppointmentStatus } from '@enums/components';
import { getAppointmentServices, resetAppointmentServices, selectScheduleDate, selectShifts } from '@store/slices';
import { parse, differenceInMinutes, isSameDay } from 'date-fns';
import { getTenantDate } from '@utils/getTenantDate';
import { Event } from '@services/Event/Event';
import { EventsName } from '@enums/global/EventsName';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import { ServicesCard } from '../ServicesCard/ServicesCard';
import { getAppointmentStatusIcon, getPopoverPosition } from './utils';
import { HDProgressInfo } from '@components/pages/Schedule/patientsSchedule/components/HDProgressInfo/HDProgressInfo';

type AppointmentProps = {
  appointment: OneDayCalendarAppointment;
  isIso: boolean;
};

export const Appointment = ({ appointment, isIso }: AppointmentProps) => {
  const [timeLeft, setTimeLeft] = useState(appointment.duration);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const appointmentRef = useRef<HTMLElement>(null);
  const { t } = useTranslation('schedule');
  const shifts = selectShifts();
  const scheduleDate = selectScheduleDate();

  const currentShift = useMemo(() => shifts.find((shift) => shift.id === appointment.shiftId), [shifts]);
  const nextShift = useMemo(() => shifts.find((shift) => shift.timeStart === currentShift.timeEnd), [shifts]);

  const currentShiftDuration = useMemo(() => {
    const startTime = parse(currentShift.timeStart, 'HH:mm:ss', new Date());
    const endTime = parse(currentShift.timeEnd, 'HH:mm:ss', new Date());
    return differenceInMinutes(endTime, startTime);
  }, [currentShift]);

  const getTimeLeft = () => {
    if (appointment.startTime) {
      const startTime = getTenantDate(new Date(appointment.startTime));
      const timeLeft = appointment.duration - differenceInMinutes(getTenantDate(), startTime);
      return timeLeft > 0 ? timeLeft : 0;
    } else {
      return appointment.duration;
    }
  };

  const isAppointmentDisable = useMemo(() => {
    const sameDate = isSameDay(getTenantDate(), scheduleDate);
    if (sameDate) {
      return appointment.status === OneDayCalendarAppointmentStatus.COMPLETED;
    } else {
      return true;
    }
  }, [appointment, scheduleDate]);

  useEffect(() => {
    const updateTimeLeft = () => setTimeLeft(getTimeLeft());
    if (isAppointmentDisable) {
      setTimeLeft(appointment.duration);
    } else {
      setTimeLeft(getTimeLeft());
      Event.subscribe(EventsName.TimerTick, updateTimeLeft);
    }

    return () => {
      !isAppointmentDisable && Event.unsubscribe(EventsName.TimerTick, updateTimeLeft);
    };
  }, [isAppointmentDisable]);

  const onAppointmentClick = () => {
    setAnchorEl(appointmentRef.current);
    dispatch(getAppointmentServices(appointment.id));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    dispatch(resetAppointmentServices());
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        {...getPopoverPosition(anchorEl)}
        sx={({ spacing }) => ({
          overflow: 'auto',
          '& .MuiPaper-root': {
            borderRadius: spacing(2),
          },
        })}
      >
        <ServicesCard
          appointment={appointment}
          onClose={handlePopoverClose}
          icon={getAppointmentStatusIcon(appointment.status)}
          timeLeft={timeLeft}
        />
      </Popover>
      <Box
        data-testid={isAppointmentDisable ? 'disabledAppointment' : 'activeAppointment'}
        sx={{
          opacity: isAppointmentDisable ? '0.4' : '1',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={onAppointmentClick}
        ref={appointmentRef}
      >
        <Box sx={getAppointmentStyles(isIso, Boolean(anchorEl))} data-testid="appointment">
          <Typography variant="labelM">{appointment.patientName}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HDProgressInfo
              status={appointment.status}
              duration={appointment.duration}
              startTime={appointment.startTime}
              timeLeft={timeLeft}
            />
            {appointment.duration > currentShiftDuration && !isAppointmentDisable && (
              <Typography variant="labelM" sx={{ color: '#BA1A1A' }}>
                •{' '}
                {`${currentShift.name} ${nextShift?.name ? '' : t('shift')} + ${nextShift?.name || ''} ${
                  nextShift?.name ? t('shifts') : ''
                }`}
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
