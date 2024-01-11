import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import {
  getShiftColumnStyles,
  getTimeLineStyles,
  getTimeLineWrapperStyles,
} from '@components/pages/Schedule/patientsSchedule/components/TimeLine/TimeLineStyles';
import { selectScheduleDate, selectShifts } from '@store/slices';
import { parse } from 'date-fns';
import { dateToServerFormat } from '@utils/dateFormat';
import { getTenantDate } from '@utils/getTenantDate';
import { Event } from '@services/Event/Event';
import { EventsName } from '@enums/global/EventsName';

export const TimeLine = () => {
  const [position, setPosition] = useState(0);
  const scheduleDate = selectScheduleDate();
  const shifts = selectShifts();

  const getTimerPosition = () => {
    const startTimeStamp = parse(shifts[0].timeStart, 'HH:mm:ss', getTenantDate()).getTime();
    const endTimeStamp = parse(shifts[shifts.length - 1].timeEnd, 'HH:mm:ss', getTenantDate()).getTime();
    const nowTimeStamp = getTenantDate().getTime();
    const position = (nowTimeStamp - startTimeStamp) / ((endTimeStamp - startTimeStamp) / 100);
    return position > 100 ? 100 : position;
  };

  const updatePosition = (tick) => {
    tick % 2 === 0 && setPosition(getTimerPosition());
  };

  useEffect(() => {
    setPosition(getTimerPosition());
    Event.subscribe(EventsName.TimerTick, updatePosition);

    return () => Event.unsubscribe(EventsName.TimerTick, updatePosition);
  }, []);

  const isCurrentDay = useMemo(() => {
    return dateToServerFormat(getTenantDate()) === dateToServerFormat(scheduleDate);
  }, [scheduleDate]);

  return (
    <Box sx={getTimeLineWrapperStyles(shifts.length)}>
      {shifts.map((shift) => (
        <Box key={shift.id} sx={getShiftColumnStyles}></Box>
      ))}
      {isCurrentDay && <Box sx={getTimeLineStyles(position)} data-testid="timeline"></Box>}
    </Box>
  );
};
