import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import isNull from 'lodash/isNull';
import { PatientStatuses, PatientIsolationFilterNames, PatientOverviewStatusesFilters } from '@enums';
import {
  OverviewSliceState,
  ChangePatientsOverviewFiltersPayload,
  ChangePatientsOverviewStatusesFiltersPayload,
  ClientOverviewPatientTable,
  PatientOverviewStatusesFilterItem,
} from '@types';

export const patientsOverviewInitialState: OverviewSliceState = {
  loading: false,
  error: null,
  patients: [],
  filters: {
    patient: null,
    isolation: {
      items: [
        {
          name: PatientIsolationFilterNames.normal,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hepB,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hepC,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hiv,
          checked: false,
        },
      ],
    },
    statuses: {
      items: [
        {
          name: PatientOverviewStatusesFilters.All,
          selected: true,
          badge: '0',
        },
        // TODO add it after implementing my patients for primary nurse
        // {
        //   name: PatientOverviewStatusesFilters.MyPatients,
        //   selected: false,
        //   badge: '0',
        // },
        {
          name: PatientOverviewStatusesFilters.Permanent,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Visiting,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Walk_In,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Temporary_Transferred,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Hospitalized,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Discharged,
          selected: false,
          badge: '0',
        },
        {
          name: PatientOverviewStatusesFilters.Dead,
          selected: false,
          badge: '0',
        },
      ],
    },
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const overviewPatientsSlice = createSlice({
  name: 'allPatients',
  initialState: patientsOverviewInitialState,
  reducers: {
    getPatientsOverviewList: (state) => {
      state.loading = true;
    },
    getPatientsOverviewListSuccess: (state, { payload }: PayloadAction<ClientOverviewPatientTable>) => {
      state.patients = payload.content;
      state.pagination.totalCount = payload.totalElements;
      state.loading = false;
    },
    getPatientsOverviewError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    getFilteredPatientsOverviewList: (state) => {
      state.loading = true;
    },
    changePatientsOverviewFilters: (
      state,
      { payload: { patient, isolations } }: PayloadAction<ChangePatientsOverviewFiltersPayload>,
    ) => {
      state.loading = true;
      if (isolations) {
        state.filters.isolation = isolations;
      }
      if (patient || isNull(patient)) {
        // @ts-ignore
        state.filters.patient = patient;
      }
      state.pagination = patientsOverviewInitialState.pagination;
    },
    changePatientsOverviewStatusesFilters: (
      state,
      { payload }: PayloadAction<ChangePatientsOverviewStatusesFiltersPayload>,
    ) => {
      state.loading = true;
      state.filters.statuses = payload;
      state.pagination = patientsOverviewInitialState.pagination;
    },
    setPatientsOverviewStatusesCounters: (
      state,
      { payload }: PayloadAction<{ items: PatientOverviewStatusesFilterItem[] }>,
    ) => {
      state.filters.statuses = payload;
    },
    clearPatientsOverviewChipsFilters: (state) => {
      state.loading = true;
      state.pagination = patientsOverviewInitialState.pagination;
      state.filters.isolation = patientsOverviewInitialState.filters.isolation;
      state.filters.patient = patientsOverviewInitialState.filters.patient;
    },
    changeOverviewPatientPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = false;
    },
    changeOverviewPatientRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = false;
    },
  },
});

export const {
  getPatientsOverviewList,
  getPatientsOverviewListSuccess,
  getPatientsOverviewError,
  getFilteredPatientsOverviewList,
  changePatientsOverviewStatusesFilters,
  clearPatientsOverviewChipsFilters,
  changePatientsOverviewFilters,
  setPatientsOverviewStatusesCounters,
  changeOverviewPatientRowsPerPage,
  changeOverviewPatientPage,
} = overviewPatientsSlice.actions;
export const selectOverviewPatientsPagination = () => useAppSelector((state) => state.overviewPatients.pagination);
export const selectOverviewPatients = () =>
  useAppSelector((state) =>
    state.overviewPatients.patients.map((patient) => ({
      ...patient,
      name: {
        ...patient.name,
        photoPath:
          patient.status === PatientStatuses.Walk_In ||
          patient.status === PatientStatuses.Discharged ||
          patient.status === PatientStatuses.Dead
            ? undefined
            : patient.name.photoPath,
      },
    })),
  );
export const selectOverviewPatientsLoading = () => useAppSelector((state) => state.overviewPatients.loading);
export const selectOverviewPatientsIsolatorFilters = () =>
  useAppSelector((state) => state.overviewPatients.filters.isolation);
export const selectOverviewPatientsPatientFilter = () =>
  useAppSelector((state) => state.overviewPatients.filters?.patient);
export const selectOverviewPatientsStatusesFilters = () =>
  useAppSelector((state) => state.overviewPatients.filters.statuses.items);

const overviewPatientsReducer = overviewPatientsSlice.reducer;
export default overviewPatientsReducer;
