import { TodayInjectionsAreLoading } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsAreLoading/TodayInjectionsAreLoading';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  getTodayPatientsInjections,
  getTodayPatientsShifts,
  selectTodayPatientsFilterDate,
  selectTodayPatientsInjections,
  selectTodayPatientsInjectionsLoading,
  selectTodayPatientsLoading,
  selectTodayPatientsShifts,
} from '@store/slices';
import type { TodayPatientsShiftsWithPatients } from '@types';
import { ShiftCollapseControl } from './components/ShiftCollapseControl/ShiftCollapseControl';
import { TodayInjectionsTable } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/TodayInjectionsTable';
import {
  convertPlannedInjectionsToShiftsWithInjections,
  getTenantDate,
  getTenantEndCurrentDay,
  getTenantStartCurrentDay,
} from '@utils';
import { validatorTimeNotLaterThan, validatorTimeNotEarlierThan } from '@validators';
import Stack from '@mui/material/Stack';
import { format, isAfter, parse } from 'date-fns';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { TodayInjectionsShiftFilters } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsShiftFilters/TodayInjectionsShiftFilters';

interface InjectionFilters {
  [key: number]: string[];
}

const TodayInjections = ({}) => {
  const dispatch = useAppDispatch();
  const isLoading = selectTodayPatientsLoading();
  const areInjectionsLoading = selectTodayPatientsInjectionsLoading();
  const filterDate = selectTodayPatientsFilterDate();
  const [selectedInjectionFilters, setSelectedInjectionFilters] = useState<InjectionFilters>({});
  const [openedShift, setOpenedShift] = useState<number | null>(null);
  const [shiftsWithInjections, setShiftsWithInjections] = useState<TodayPatientsShiftsWithPatients>({});
  const shifts = selectTodayPatientsShifts();
  const shiftIds = Object.keys(shiftsWithInjections).map(Number);
  const injections = selectTodayPatientsInjections();

  useEffect(() => {
    dispatch(getTodayPatientsShifts());
  }, []);

  useEffect(() => {
    dispatch(getTodayPatientsInjections());
  }, [filterDate]);

  useEffect(() => {
    const tenantDate = getTenantDate();

    if (format(new Date(filterDate), 'yyyy-MM-dd') === format(getTenantStartCurrentDay(), 'yyyy-MM-dd')) {
      const activeShift = shifts.find((shift) => {
        const shiftStartDate = new Date(parse(shift.timeStart, 'HH:mm:ss', tenantDate));
        const shiftEndDate = new Date(parse(shift.timeEnd, 'HH:mm:ss', tenantDate));
        return (
          validatorTimeNotEarlierThan(shiftStartDate)(tenantDate) === true &&
          validatorTimeNotLaterThan(shiftEndDate)(tenantDate) === true
        );
      });
      return setOpenedShift(activeShift?.id || null);
    } else if (isAfter(filterDate, getTenantEndCurrentDay())) {
      const firstShift = shifts[0];
      return setOpenedShift(firstShift?.id || null);
    }
    return setOpenedShift(null);
  }, [shifts, filterDate]);

  useEffect(() => {
    setShiftsWithInjections(convertPlannedInjectionsToShiftsWithInjections(shifts, injections));
  }, [shifts, injections]);

  const toggleOpenedShift = useCallback(
    (shiftId: number) => {
      if (openedShift === shiftId) setOpenedShift(null);
      else setOpenedShift(shiftId);
    },
    [openedShift, setOpenedShift],
  );

  const onSelectFilter = useCallback(
    (shiftId, injectionName) => {
      setSelectedInjectionFilters((prevState) => {
        if (prevState[shiftId]?.includes(injectionName)) {
          return {
            ...prevState,
            [shiftId]: prevState[shiftId].filter((item) => item !== injectionName),
          };
        }

        return {
          ...prevState,
          [shiftId]: prevState[shiftId] ? [...prevState[shiftId], injectionName] : [injectionName],
        };
      });
    },
    [setSelectedInjectionFilters],
  );

  return (
    <Stack
      direction="column"
      sx={{
        mt: '0 !important',
        overflowY: 'auto',
        flexShrink: 10,
        flexGrow: 1000,
        '& .MuiAccordion-root': {
          m: '0 !important',
        },
        '& .emptyDataBody': {
          minHeight: (theme) => theme.spacing(37.5),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        '& .MuiAccordion-root.Mui-expanded': {
          borderBottom: (theme) => `solid 1px ${theme.palette.primary.main}`,
        },
        '& .MuiButtonBase-root': {
          p: 0,
        },
        '& .MuiAccordionSummary-content': {
          m: '0 !important',
          p: 0,
        },
      }}
    >
      {shiftIds.map((shiftId) => (
        <Accordion key={shiftId} expanded={openedShift === shiftId} onChange={() => toggleOpenedShift(shiftId)}>
          <AccordionSummary>
            <ShiftCollapseControl
              isOpened={openedShift === shiftId}
              shiftId={shiftId}
              shiftName={shiftsWithInjections[shiftId]?.shiftName || '—'}
              onClick={toggleOpenedShift}
            />
          </AccordionSummary>
          <AccordionDetails
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              p: 0,
              opacity: openedShift === shiftId ? 1 : 0,
            }}
          >
            {areInjectionsLoading ? (
              <TodayInjectionsAreLoading />
            ) : (
              <>
                <TodayInjectionsShiftFilters
                  shiftData={
                    shiftsWithInjections[shiftId]?.patients ? Object.values(shiftsWithInjections[shiftId].patients) : []
                  }
                  shiftId={shiftId}
                  selectedFilters={selectedInjectionFilters[shiftId] || []}
                  onSelect={onSelectFilter}
                />
                <TodayInjectionsTable
                  data={
                    shiftsWithInjections[shiftId]?.patients ? Object.values(shiftsWithInjections[shiftId].patients) : []
                  }
                  filters={selectedInjectionFilters[shiftId] || []}
                  isLoading={isLoading}
                />
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default TodayInjections;
