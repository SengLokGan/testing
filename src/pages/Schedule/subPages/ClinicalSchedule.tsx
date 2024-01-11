import { MainContentContainer } from '@containers/layouts/MainContentContainer';
import Stack from '@mui/material/Stack';
import { YearControl } from '@components/pages/Schedule/clinicalSchedule/components/YearControl/YearControl';
import { ScheduleGrid } from '@components/pages/Schedule/clinicalSchedule/components/ScheduleGrid/ScheduleGrid';
import { useAppDispatch } from '@hooks/storeHooks';
import { useEffect } from 'react';
import {
  addServiceModal,
  clearEvents,
  getClinicalShiftList,
  getEvents,
  selectClinicalScheduleDate,
  selectHasServiceModal,
  selectLoadingClinicalSchedule,
  setClinicalScheduleDate,
} from '@store/slices';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import { UserPermissions } from '@enums/store';
import { GlobalAddButton } from '@components/GlobalAddButton/GlobalAddButton';
import { PermissionGuard } from '@guards/PermissionGuard';
import { ServiceModalName } from '@enums/components';
import { Event } from '@services/Event/Event';
import { EventsName } from '@enums/global';
import { useSearchParams } from 'react-router-dom';
import { getYear, isValid, parse } from 'date-fns';
import { getTenantDate } from '@utils/getTenantDate';
import { TargetAudience } from '@enums/components/TargetAudience';

export const ClinicalSchedule = () => {
  const dispatch = useAppDispatch();
  const isLoading = selectLoadingClinicalSchedule();
  const isServiceModalOpened = selectHasServiceModal();
  const scheduleDate = selectClinicalScheduleDate();

  const [searchParams] = useSearchParams();
  const activeEventDate = searchParams.get('date');

  useEffect(() => {
    if (activeEventDate) {
      const parsedDate = parse(activeEventDate, 'yyyy-MM-dd', getTenantDate());
      if (isValid(parsedDate) && getYear(parsedDate) !== getYear(scheduleDate)) {
        dispatch(setClinicalScheduleDate(parsedDate));
      }
    }
  }, [activeEventDate, scheduleDate]);

  const openAddEventModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.AddClinicalEventModal,
        payload: {
          date: null,
          type: undefined,
          isAllDay: true,
          title: '',
          laboratory: null,
          startTime: null,
          endTime: null,
          comment: '',
          targetAudience: TargetAudience.AssignedPatients,
          dialysisRelated: true,
        },
      }),
    );
  };

  const updateData = (tick) => {
    tick % 5 === 0 && dispatch(getEvents());
  };

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getClinicalShiftList());
    Event.subscribe(EventsName.TimerTick, updateData);

    return () => {
      Event.unsubscribe(EventsName.TimerTick, updateData);
      dispatch(clearEvents());
    };
  }, []);

  return (
    <>
      <MainContentContainer
        testId="clinicalSchedule"
        fullHeight
        sx={(theme) => ({
          bgcolor: theme.palette.surface.default,
          width: 1,
        })}
      >
        {!isServiceModalOpened && (
          <PermissionGuard permissions={UserPermissions.ClinicalScheduleSuitModify}>
            <GlobalAddButton onClick={openAddEventModal} />
          </PermissionGuard>
        )}
        <Stack
          direction="column"
          sx={{
            width: 1,
            p: 0,
          }}
        >
          <YearControl />
          <ScheduleGrid />
        </Stack>
      </MainContentContainer>
      {isLoading && <GlobalLoader />}
    </>
  );
};
