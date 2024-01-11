import Box from '@mui/material/Box';
import { Grid, Popover } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { setMonth, getYear, getMonth, format, parse, isValid } from 'date-fns';
import { selectClinicalScheduleDate, selectEvents } from '@store/slices';
import { useEffect, useMemo, useState } from 'react';
import { ScheduleDay } from '@components/pages/Schedule/clinicalSchedule/components/ScheduleDay/ScheduleDay';
import { Month } from '@constants/global/month';
import { getPopoverPosition } from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';
import { EventsCard } from '@components/pages/Schedule/clinicalSchedule/components/EventsCard/EventsCard';
import { useSearchParams } from 'react-router-dom';
import { getTenantDate } from '@utils/getTenantDate';

export const ScheduleGrid = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const scheduleDate = selectClinicalScheduleDate();
  const events = selectEvents();

  const [searchParams] = useSearchParams();
  const activeEventDate = searchParams.get('date');

  const [key, setKey] = useState(Date.now());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setKey(Date.now());
  }, [scheduleDate]);

  useEffect(() => {
    if (activeEventDate && Object.keys(events).length) {
      const parsedDate = parse(activeEventDate, 'yyyy-MM-dd', getTenantDate());
      if (isValid(parsedDate)) {
        const dayRef: HTMLElement | null = document.querySelector(`[data-testId="${activeEventDate}"]`);

        setSelectedDate(parsedDate);
        dayRef && setAnchorEl(dayRef);
      }
    }
  }, [activeEventDate, events]);

  const dayEvents = useMemo(() => {
    if (selectedDate && events) {
      const eventsKey = format(selectedDate, 'yyyy-MM-dd');
      return events[getMonth(selectedDate)]?.[eventsKey] || [];
    }
    return [];
  }, [selectedDate, events]);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedDate && setSelectedDate(null);
  };

  return (
    <>
      {Boolean(anchorEl) && (
        <Popover
          open
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
          <EventsCard onClose={handlePopoverClose} date={selectedDate!} events={dayEvents} />
        </Popover>
      )}
      <Box
        key={key}
        data-testid="patientsScheduleTable"
        sx={({ palette, spacing }) => ({
          height: {
            xs: 'calc(100vh - 120px)',
            md: 'calc(100vh - 144px)',
          },
          overflow: 'auto',
          borderTop: `1px solid ${palette.border.default}`,
          padding: spacing(3, 9),
        })}
      >
        <Grid container spacing={2}>
          {Object.values(Month).map((monthIndex) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={monthIndex}>
              <DateCalendar
                views={['day']}
                showDaysOutsideCurrentMonth
                disableHighlightToday={getMonth(new Date()) !== monthIndex}
                defaultCalendarMonth={setMonth(new Date(`${getYear(scheduleDate)}`), monthIndex)}
                fixedWeekNumber={6}
                onChange={(value) => setSelectedDate(value)}
                value={selectedDate && getMonth(selectedDate) === monthIndex ? selectedDate : null}
                slots={{
                  nextIconButton: () => null,
                  previousIconButton: () => null,
                  day: ScheduleDay,
                }}
                slotProps={{
                  day: {
                    events: events[monthIndex],
                    setAnchorEl,
                    monthIndex: monthIndex,
                  } as any,
                }}
                sx={({ palette, spacing }) => ({
                  '.MuiPickersDay-Today': {
                    backgroundColor: palette.primary.light,
                    border: 'unset',
                  },
                  '.MuiPickersDay-root.Mui-selected': {
                    backgroundColor: palette.primary.main,
                  },
                  '.MuiPickersCalendarHeader-root': {
                    pl: spacing(4),
                  },
                  '.MuiPickersSlideTransition-root': {
                    minHeight: '254px',
                  },
                  '.MuiPickersCalendarHeader-label': {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      width: '44px',
                      backgroundColor: palette.primary['100'],
                    },
                  },
                  '.MuiPickersDay-dayOutsideMonth': {
                    pointerEvents: 'none',
                  },
                })}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
