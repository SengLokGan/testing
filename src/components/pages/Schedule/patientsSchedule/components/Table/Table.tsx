import { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTableContainerStyles } from './TableStyles';
import {
  selectAppointments,
  selectCurrentDayAvailabilityShifts,
  selectIsolationsGroup,
  selectScheduleDate,
  selectShifts,
} from '@store/slices';
import { prepareOneDayCalendarData, sortOneDayCalendarData } from '@utils';
import { AppointmentGroup } from '../AppointmentsGroup/AppointmentGroup';
import { DayTasks } from '../DayTasks/DayTasks';
import uniqid from 'uniqid';

const SLOT_DURATION = 360;
export const Table = () => {
  const shifts = selectShifts();
  const isolationsGroup = selectIsolationsGroup();
  const appointments = selectAppointments();
  const scheduleDate = selectScheduleDate();
  const availabilityShifts = selectCurrentDayAvailabilityShifts();

  const availableSlots = availabilityShifts.reduce((acc, { isolationGroupId, shifts }) => {
    const shiftWithIsoGroup = shifts.map((shift) => ({
      id: uniqid(),
      duration: SLOT_DURATION / 2 + 1,
      isolationGroupId,
      shiftId: shift.id,
      date: scheduleDate,
    }));
    return [...acc, ...shiftWithIsoGroup];
  }, []);

  const tableData = useMemo(() => {
    if (appointments && isolationsGroup.length && shifts.length) {
      const dataForScheduleOneDay = prepareOneDayCalendarData(
        [...appointments, ...availableSlots],
        isolationsGroup,
        shifts,
      );
      return sortOneDayCalendarData(dataForScheduleOneDay, shifts, SLOT_DURATION);
    }
    return [];
  }, [appointments, isolationsGroup, shifts, availableSlots]);

  const gridTemplateAreasString = useMemo(() => {
    let rowsTemplate = '"day_tasks"';
    Object.keys(tableData).forEach((groupKey) => {
      if (tableData[groupKey].isolations.length) {
        rowsTemplate = rowsTemplate + ` "${tableData[groupKey].isoKey}"`;
        rowsTemplate = `${rowsTemplate} "${Object.keys(tableData[groupKey].slots)
          .map((key) => `${tableData[groupKey].isoKey}_${key}`)
          .join('" "')}"`;
      } else {
        rowsTemplate = `${rowsTemplate} "${Object.keys(tableData[groupKey].slots).join('" "')}"`;
      }
    });
    return rowsTemplate;
  }, [tableData]);

  useEffect(() => {
    const firstActiveAppointment = document.querySelector('[data-testId="activeAppointment"]');
    firstActiveAppointment &&
      firstActiveAppointment.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
  }, []);

  return (
    <Box sx={getTableContainerStyles(gridTemplateAreasString)} data-testid="scheduleTable">
      <DayTasks />
      {Object.keys(tableData).map((groupKey) => (
        <AppointmentGroup group={tableData[groupKey]} key={groupKey} />
      ))}
    </Box>
  );
};
