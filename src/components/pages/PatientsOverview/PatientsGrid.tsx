import { EmptyDataBody, PaginationComponent } from '@components';
import { Pagination } from '@types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PatientCard } from './PatientCard';
import {
  changeOverviewPatientPage,
  changeOverviewPatientRowsPerPage,
  selectOverviewPatients,
  selectOverviewPatientsLoading,
} from '@store/slices/overviewPatientsSlice';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

type PatientsGridProps = {
  pagination: Pagination;
};

const MIN_COUNT_PER_PAGE = 10;

export const PatientsGrid = ({ pagination }: PatientsGridProps) => {
  const patientsList = selectOverviewPatients();
  const loading = selectOverviewPatientsLoading();

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
        pb: 3,
      })}
    >
      <Grid container spacing={2} sx={{ p: 3 }}>
        {patientsList.map((patient) => (
          <Grid item xs={6} sm={4} md={3} key={patient.id}>
            <PatientCard patient={patient} />
          </Grid>
        ))}
      </Grid>
      {pagination && pagination.totalCount > MIN_COUNT_PER_PAGE && (
        <PaginationComponent
          pagination={pagination}
          onChangePage={changeOverviewPatientPage}
          onChangeRowsPerPage={changeOverviewPatientRowsPerPage}
        />
      )}
      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress size="4rem" />
        </Backdrop>
      )}
    </Box>
  );
};
