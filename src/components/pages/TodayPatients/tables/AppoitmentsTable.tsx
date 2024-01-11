import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import {
  changeTodayPatientsAppointmentsPage,
  changeTodayPatientsAppointmentsRowsPerPage,
  selectTodayPatientsActiveTab,
  selectTodayPatientsAppointments,
  selectTodayPatientsAppointmentsPagination,
  selectTodayPatientsLoading,
} from '@store/slices/todayPatientsSlice';
import { RichTable } from '@components';
import { getAppointmentsTableColumns } from '@constants';
import { useMemo } from 'react';
import { useAppDispatch } from '@hooks/storeHooks';
import { ServiceModalName, PatientStatuses, TodayPatientsTabs } from '@enums';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { TodayPatientsFilters } from '../components';

export const AppointmentsTable = () => {
  const dispatch = useAppDispatch();
  const activeTab = selectTodayPatientsActiveTab();
  const pagination = selectTodayPatientsAppointmentsPagination();
  const appointments = selectTodayPatientsAppointments();
  const loading = selectTodayPatientsLoading();
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const transformedAppointments = useMemo(
    () =>
      appointments.map((appointment) => ({
        ...appointment,
        name: {
          ...appointment.name,
          photoPath:
            appointment.patientStatus === PatientStatuses.Walk_In ||
            appointment.patientStatus === PatientStatuses.Discharged ||
            appointment.patientStatus === PatientStatuses.Dead
              ? undefined
              : appointment.name.photoPath,
        },
      })),
    [appointments],
  );
  const isInjectionsTab = useMemo(() => activeTab === TodayPatientsTabs.Injections, [activeTab]);
  const isPatientsTab = useMemo(() => activeTab === TodayPatientsTabs.Patients, [activeTab]);
  const appointmentsTableColumns = useMemo(getAppointmentsTableColumns, []);

  appointmentsTableColumns[2].cellCallback = (payload) => {
    dispatch(addServiceModal({ name: ServiceModalName.DialysisProcedureModal, payload }));
  };

  return (
    <RichTable
      renderBody={activeTab === TodayPatientsTabs.Patients}
      fullScreen
      headerDivider
      columns={appointmentsTableColumns}
      rows={transformedAppointments}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changeTodayPatientsAppointmentsPage}
      onChangeRowsPerPage={changeTodayPatientsAppointmentsRowsPerPage}
      stickyHeader
      tableContainerProps={{
        sx: {
          overflowY: activeTab === TodayPatientsTabs.Injections ? 'hidden' : 'initial',
          flexShrink: 0,
        },
      }}
      defaultHeaderContainer={false}
    >
      <Box
        sx={{
          position: 'sticky',
          left: 0,
          p: (theme) => theme.spacing(2, isXs ? 0 : 2, isXs ? 0 : 0, isXs ? 0 : 2),
          zIndex: 10,
          borderBottom: (theme) => ({
            xs: `solid 1px ${theme.palette.border.default}`,
            md: 'none',
          }),
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        }}
      >
        <TodayPatientsFilters key="today-patients-filters" />
      </Box>
    </RichTable>
  );
};
