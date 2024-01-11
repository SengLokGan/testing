import { EmptyDataBody, PaginationComponent } from '@components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TodayPatientCard } from './TodayPatientCard';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {
  changeTodayPatientsAppointmentsPage,
  changeTodayPatientsAppointmentsRowsPerPage,
  selectTodayPatientsAppointments,
  selectTodayPatientsAppointmentsPagination,
  selectTodayPatientsLoading,
} from '@store/slices';

export const TodayPatientsGrid = () => {
  const patientsList = selectTodayPatientsAppointments();
  const pagination = selectTodayPatientsAppointmentsPagination();
  const loading = selectTodayPatientsLoading();

  if (patientsList.length === 0 && !loading) {
    return <EmptyDataBody />;
  }

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        background: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 3 }}
        columnSpacing={3}
        sx={(theme) => ({ p: { xs: theme.spacing(1, 2), sm: theme.spacing(3) } })}
      >
        {patientsList.map((patient) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
            <TodayPatientCard patient={patient} />
          </Grid>
        ))}
      </Grid>
      {pagination && (
        <PaginationComponent
          pagination={pagination}
          onChangePage={changeTodayPatientsAppointmentsPage}
          onChangeRowsPerPage={changeTodayPatientsAppointmentsRowsPerPage}
        />
      )}
      {loading && (
        <Backdrop sx={(theme) => ({ color: theme.palette.primary[100], zIndex: theme.zIndex.drawer + 1 })} open>
          <CircularProgress size="4rem" />
        </Backdrop>
      )}
    </Box>
  );
};
