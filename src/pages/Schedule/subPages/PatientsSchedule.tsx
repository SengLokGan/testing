import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { MainContentContainer } from '@containers/layouts/MainContentContainer';
import { DateControl } from '@components/pages/Schedule/patientsSchedule/components/DateControl/DateControl';
import { useAppDispatch } from '@hooks';
import {
  addServiceModal,
  closeDialysisModal,
  getInitPatientScheduleData,
  selectHasServiceModal,
  selectScheduleLoading,
  selectShifts,
  updateAppointments,
} from '@store/slices';
import { ScheduleTable } from '@components/pages/Schedule/patientsSchedule/ScheduleTable';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import { GlobalAddButton } from '@components/GlobalAddButton/GlobalAddButton';
import { Event } from '@services/Event/Event';
import { footerHeight } from '@constants';
import { PermissionGuard } from '@guards';
import { ServiceModalName, UserPermissions, EventsName } from '@enums';
import { AddHocEventTypes } from '@types';
import { AddServiceModalPlace } from '@enums/components/AddServiceModalPlace';

export const PatientsSchedule = () => {
  const dispatch = useAppDispatch();
  const shifts = selectShifts();
  const isLoading = selectScheduleLoading();
  const isServiceModalOpened = selectHasServiceModal();

  const updateData = (tick) => {
    tick % 5 === 0 && dispatch(updateAppointments());
  };

  const openAddEventModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.AddHocServicesModal,
        payload: {
          type: AddHocEventTypes.HD,
          patient: null,
          date: null,
          shift: null,
          isolationGroupId: null,
          place: AddServiceModalPlace.GLOBAL,
          procedure: null,
          laboratory: null,
          specimenType: null,
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(getInitPatientScheduleData());
    const updateAppointmentsData = () => dispatch(updateAppointments());
    Event.subscribe(EventsName.TimerTick, updateData);
    Event.subscribe(closeDialysisModal.type, updateAppointmentsData);

    return () => {
      Event.unsubscribe(EventsName.TimerTick, updateData);
      Event.unsubscribe(closeDialysisModal.type, updateAppointmentsData);
    };
  }, []);

  if (!shifts.length) {
    return <GlobalLoader />;
  }

  return (
    <>
      {!isServiceModalOpened && (
        <PermissionGuard permissions={[UserPermissions.DialysisAddAppointment]}>
          <GlobalAddButton onClick={openAddEventModal} />
        </PermissionGuard>
      )}
      <MainContentContainer
        testId="patientsSchedule"
        sx={(theme) => ({
          bgcolor: theme.palette.surface.default,
          width: 1,
          height: {
            xs: `calc(100vh - ${theme.spacing(7.125)})`,
            sm: `calc(100vh - ${theme.spacing(7.125 + footerHeight)})`,
          },
        })}
      >
        <Stack
          direction="column"
          sx={{
            width: 1,
            p: 0,
          }}
        >
          <DateControl />
          <ScheduleTable />
        </Stack>
      </MainContentContainer>
      {isLoading && <GlobalLoader />}
    </>
  );
};
