import { useCallback, useEffect, useMemo, useState, Ref } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ShiftSchedulerErrorReason, DaysOfWeek, HDPrescriptionScheduleFrequency } from '@enums';
import type { WithSx, ShiftSchedulerData, ShiftSchedulerDefaultValue, ShiftSchedulerShift } from '@types';
import ShiftDay from '@components/ShiftScheduler/components/ShiftDay';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import useIgnoreFirstRenderEffect from '@hooks/useIgnoreFirstRenderEffect';
import { convertSxToArray } from '@utils/converters/mui';
import { WarningMessage } from '@src/components';

type ShiftSchedulerProps = WithSx<{
  name: string;
  data: ShiftSchedulerData;
  frequency: HDPrescriptionScheduleFrequency;
  days: DaysOfWeek[];
  onChange: (shiftId: number | null, shiftName: string | null, day: DaysOfWeek | null) => void;
  defaultValue?: ShiftSchedulerDefaultValue;
  onError?: (reason: ShiftSchedulerErrorReason | null) => void;
  error?: string;
  fieldRef?: Ref<HTMLElement>;
}>;

type SchedulingData = {
  [key in DaysOfWeek]: {
    [key: number]: {
      shiftName: string;
      count: number;
      isDayAvailable: boolean;
    };
  };
};

const defaultSchedulingData = {
  [DaysOfWeek.Monday]: {},
  [DaysOfWeek.Tuesday]: {},
  [DaysOfWeek.Wednesday]: {},
  [DaysOfWeek.Thursday]: {},
  [DaysOfWeek.Friday]: {},
  [DaysOfWeek.Sunday]: {},
  [DaysOfWeek.Saturday]: {},
};

export const ShiftScheduler = ({
  data,
  name,
  defaultValue,
  frequency,
  days,
  onChange,
  error,
  onError = () => {},
  sx = [],
  fieldRef,
}: ShiftSchedulerProps) => {
  const { t: tCommon } = useTranslation('common');
  const [schedulingData, setSchedulingData] = useState<SchedulingData>({ ...defaultSchedulingData });
  const [shifts, setShifts] = useState<ShiftSchedulerShift[]>([]);
  const [unavailableShifts, setUnavailableShifts] = useState<number[]>([]);
  const [selectedShift, setSelectedShift] = useState<ShiftSchedulerShift | null>(null);
  const [selectedDay, setSelectedDay] = useState<DaysOfWeek | null>(null);
  const [hoveredShiftId, setHoveredShiftId] = useState<number | null>(null);

  const onHoverShift = useCallback(
    (shiftId: number | null) => {
      setHoveredShiftId(shiftId);
    },
    [setHoveredShiftId],
  );

  const onSelectShift = useCallback(
    (shiftId: number, shiftName: string, day: DaysOfWeek) => {
      setSelectedShift(shiftId && shiftName ? { shiftId, shiftName } : null);
      setSelectedDay(day || null);
    },
    [setSelectedShift, setSelectedDay],
  );

  const sortedByIdShifts = useMemo(() => {
    return [...shifts].sort((a, b) => {
      if (a.shiftId > b.shiftId) return 1;
      if (a.shiftId < b.shiftId) return -1;
      return 0;
    });
  }, [shifts]);

  const renderShiftDaysCells = useCallback(
    (groupDay: DaysOfWeek) => {
      const shiftDay = Object.keys(schedulingData[groupDay]).length
        ? schedulingData[groupDay]
        : {
            ...sortedByIdShifts.reduce(
              (res, { shiftId, shiftName }) => ({
                ...res,
                [shiftId]: { shiftName, count: 0, isDayAvailable: false },
              }),
              {},
            ),
          };

      return (
        <>
          {sortedByIdShifts.map(({ shiftId }) => {
            const { shiftName, count, isDayAvailable } = shiftDay[shiftId];
            const isSelected =
              frequency === HDPrescriptionScheduleFrequency.ONCE_PER_WEEK
                ? shiftId === selectedShift?.shiftId && groupDay === selectedDay
                : shiftId === selectedShift?.shiftId || shiftId === hoveredShiftId;

            return (
              <td key={`${groupDay}-${shiftId}`} data-testid={`shiftScheduler-${name}-${groupDay}-${shiftId}`}>
                <ShiftDay
                  name={name}
                  shiftId={shiftId}
                  shiftName={shiftName}
                  day={groupDay}
                  available={isDayAvailable && !unavailableShifts.includes(shiftId)}
                  selected={isSelected}
                  onClick={onSelectShift}
                  onHover={onHoverShift}
                >
                  {count}
                </ShiftDay>
              </td>
            );
          })}
        </>
      );
    },
    [schedulingData, sortedByIdShifts, unavailableShifts, hoveredShiftId, selectedDay, selectedShift],
  );

  const checkShiftIsFromDefaultValue = useCallback(
    (shiftId?: number) => defaultValue && defaultValue.shiftId && shiftId && defaultValue.shiftId === shiftId,
    [defaultValue],
  );

  const checkDayIsFromDefaultValue = useCallback(
    (day?: DaysOfWeek) => defaultValue && defaultValue.days && day && defaultValue.days.includes(day),
    [defaultValue],
  );

  const setDefaultOrFirstAvailableShift = useCallback(() => {
    const isDefaultShiftAvailable = defaultValue ? !unavailableShifts.includes(defaultValue.shiftId) : false;
    let nextSelectedShift: ShiftSchedulerShift | null = null;

    if (isDefaultShiftAvailable && defaultValue) {
      const shiftData = sortedByIdShifts.find(({ shiftId }) => shiftId === defaultValue.shiftId);
      const allDefaultDaysAreInAvailableDays = defaultValue.days.every((day) => days.includes(day));

      if (shiftData && allDefaultDaysAreInAvailableDays) {
        const allDefaultDaysAreAvailable = defaultValue.days.every((day) => {
          return schedulingData[day] && schedulingData[day][defaultValue.shiftId].isDayAvailable;
        });
        const defaultShift =
          allDefaultDaysAreAvailable && sortedByIdShifts.find(({ shiftId }) => shiftId === defaultValue.shiftId);

        nextSelectedShift = defaultShift || null;
      }
    }

    if (!nextSelectedShift && days?.length) {
      nextSelectedShift =
        sortedByIdShifts.find(({ shiftId }) => {
          return days.every((day) => schedulingData[day] && schedulingData[day][shiftId].isDayAvailable);
        }) || null;
    }

    setSelectedShift(nextSelectedShift || null);
  }, [days, sortedByIdShifts, defaultValue]);

  useEffect(() => {
    const nextSchedulingData: SchedulingData = { ...schedulingData };
    const nextShifts: ShiftSchedulerShift[] = [];
    const nextUnavailableShifts: number[] = [];
    let firstAvailableShiftAndDay: any = null;

    if (data && data.length) {
      data.forEach(({ shiftId, shiftName, dayCountResponse }) => {
        nextShifts.push({ shiftName, shiftId });

        dayCountResponse.forEach(({ day, count: rawCount }) => {
          const rawCountForDefaultValue = rawCount < 0 ? 0 : rawCount;
          const count =
            checkShiftIsFromDefaultValue(shiftId) && checkDayIsFromDefaultValue(day)
              ? rawCountForDefaultValue + 1
              : rawCount;
          const isDayAvailable = days.includes(day) && Boolean(count > 0);
          const isNotInUnavailableShifts = !nextUnavailableShifts.includes(shiftId);

          if (days.includes(day) && count <= 0 && isNotInUnavailableShifts) {
            nextUnavailableShifts.push(shiftId);
          }

          if (!nextSchedulingData[day]) nextSchedulingData[day] = {};

          nextSchedulingData[day]![shiftId] = {
            shiftName,
            count,
            isDayAvailable,
          };

          if (isDayAvailable && !firstAvailableShiftAndDay) {
            firstAvailableShiftAndDay = { shiftId, shiftName, day };
          }
        });
      });
    }

    if (frequency === HDPrescriptionScheduleFrequency.ONCE_PER_WEEK) {
      setSelectedDay(firstAvailableShiftAndDay?.day || null);
      setSelectedShift(
        firstAvailableShiftAndDay
          ? { shiftId: firstAvailableShiftAndDay.shiftId, shiftName: firstAvailableShiftAndDay.shiftName }
          : null,
      );
    }

    setShifts(nextShifts);
    setSchedulingData(nextSchedulingData);
    setUnavailableShifts(nextUnavailableShifts);
  }, [data, days, frequency, defaultValue]);

  useEffect(() => {
    setDefaultOrFirstAvailableShift();
  }, [schedulingData, days]);

  useIgnoreFirstRenderEffect(() => {
    onChange(selectedShift?.shiftId || null, selectedShift?.shiftName || null, selectedDay);
  }, [selectedDay, selectedShift]);

  useIgnoreFirstRenderEffect(() => {
    const allShiftsUnavailable = data.length === unavailableShifts.length;

    if (selectedDay && allShiftsUnavailable) onError(ShiftSchedulerErrorReason.SHIFTS_UNAVAILABLE);
    if (days?.length && allShiftsUnavailable) onError(ShiftSchedulerErrorReason.DAYS_UNAVAILABLE);
  }, [schedulingData, selectedDay, selectedShift, unavailableShifts]);

  return (
    <Box
      data-testid={`shiftScheduler-${name}`}
      mb={2}
      sx={[
        ({ spacing }) => ({
          table: {
            width: 1,
            th: {
              height: spacing(5),
            },
            td: {
              textAlign: 'center',
              height: spacing(5),
            },
          },
        }),
        ...convertSxToArray(sx),
      ]}
      ref={fieldRef}
    >
      <Stack mb={2} direction="row" alignItems="center">
        <Box
          mr={1}
          sx={({ palette, spacing }) => ({
            width: spacing(2),
            height: spacing(2),
            backgroundColor: palette.primary.light,
            borderRadius: spacing(3.75),
          })}
        />
        <Typography variant="labelS">{tCommon('availableSlots')}</Typography>
      </Stack>

      <Box mb={2}>
        <table>
          <thead>
            <tr>
              <th>
                <Typography variant="labelM" align="left">
                  {tCommon('shift')}
                </Typography>
              </th>
              {sortedByIdShifts.map(({ shiftId, shiftName }) => (
                <th key={`shift-column-${shiftId}`}>
                  <Typography variant="labelM">{shiftName}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Monday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:M')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Monday)}
            </tr>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Tuesday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:T')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Tuesday)}
            </tr>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Wednesday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:W')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Wednesday)}
            </tr>
            <tr data-testid={`shiftSchedule-${name}r-row-${DaysOfWeek.Thursday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:T')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Thursday)}
            </tr>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Friday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:F')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Friday)}
            </tr>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Saturday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:S')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Saturday)}
            </tr>
            <tr data-testid={`shiftScheduler-${name}-row-${DaysOfWeek.Sunday}`}>
              <td>
                <Typography variant="labelM" align="left">
                  {tCommon('shortestDays:S')}
                </Typography>
              </td>
              {renderShiftDaysCells(DaysOfWeek.Sunday)}
            </tr>
          </tbody>
        </table>
      </Box>

      {error && <WarningMessage text={error} sx={{ '& .MuiTypography-root': { color: '#3D0600' } }} />}
    </Box>
  );
};
