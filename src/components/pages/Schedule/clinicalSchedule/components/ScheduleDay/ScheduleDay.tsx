import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import { format, getMonth } from 'date-fns';
import { useMemo, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { getEventTypeColor } from '@components/pages/Schedule/clinicalSchedule/utils/getEventTypeColor';
import { ClinicalEvent } from '@types';

type ScheduleDayProps = {
  events?: { [key: number]: { [key: string]: ClinicalEvent[] } };
  setAnchorEl?: (ref: HTMLButtonElement | null) => void;
  monthIndex?: number;
};
export const ScheduleDay = ({
  events,
  setAnchorEl,
  monthIndex,
  ...props
}: PickersDayProps<Date> & ScheduleDayProps) => {
  const { day } = props;
  const dayRef = useRef<HTMLButtonElement>(null);
  const eventsKey = day && format(day, 'yyyy-MM-dd');
  const dayEvents = eventsKey && events && events[eventsKey] ? events[eventsKey] : [];

  const dayEventTypes = useMemo(() => {
    if (dayEvents.length) {
      return dayEvents.reduce((acc, { type }) => {
        if (acc.includes(type)) {
          return acc;
        }
        return [...acc, type];
      }, []);
    }
    return [];
  }, [dayEvents]);

  const onDayClick = () => {
    setAnchorEl && setAnchorEl(dayRef.current);
  };

  return (
    <Stack
      sx={{ position: 'relative' }}
      onClick={onDayClick}
      data-testId={getMonth(day) === monthIndex ? eventsKey : ''}
    >
      {!!dayEventTypes.length && (
        <Stack
          justifyItems="center"
          alignItems="center"
          sx={({ spacing }) => ({
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 1,
            paddingRight: spacing(0.5),
            paddingLeft: '6px',
          })}
          direction="row"
          justifyContent="center"
        >
          {dayEventTypes.map((type) => {
            return (
              <Box
                key={type}
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getEventTypeColor(type),
                  marginLeft: '-3px',
                }}
              />
            );
          })}
        </Stack>
      )}
      <PickersDay
        {...props}
        ref={dayRef}
        sx={({ palette }) => ({
          margin: 0,
          width: '40px',
          height: '40px',
          ...(dayEventTypes.length
            ? {
                border: `1px solid ${palette.text.primary}`,
                borderRadius: '50%',
              }
            : {}),
        })}
      />
    </Stack>
  );
};
