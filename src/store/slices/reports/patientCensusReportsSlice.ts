import type { PatientCensusReportSliceState } from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { PatientCensusIsolationFilter, PatientCensusStatusFilter } from '@enums';
import {
  PatientCensusFilters,
  PatientCensusFiltersError,
  PatientCensusReportPayload,
  VascularAccessChipsCountersPayload,
} from '@types';

export const patientCensusInitialState: PatientCensusReportSliceState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      date: null,
      isolations: [
        { name: PatientCensusIsolationFilter.NonInfectious, selected: false, badge: null },
        { name: PatientCensusIsolationFilter.Isolated, selected: false, badge: null },
        { name: PatientCensusIsolationFilter.Hiv, selected: false, badge: null },
        { name: PatientCensusIsolationFilter.HepB, selected: false, badge: null },
        { name: PatientCensusIsolationFilter.HepC, selected: false, badge: null },
      ],
      statuses: [
        { name: PatientCensusStatusFilter.Permanent, selected: false, badge: null },
        { name: PatientCensusStatusFilter.Visiting, selected: false, badge: null },
        { name: PatientCensusStatusFilter.WalkIn, selected: false, badge: null },
        { name: PatientCensusStatusFilter.Temporary_Transferred, selected: false, badge: null },
        { name: PatientCensusStatusFilter.Discharged, selected: false, badge: null },
        { name: PatientCensusStatusFilter.Hospitalized, selected: false, badge: null },
        { name: PatientCensusStatusFilter.Dead, selected: false, badge: null },
      ],
    },
    filtersError: {
      date: null,
    },
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const patientCensusReportSlice = createSlice({
  name: 'patientCensusReport',
  initialState: patientCensusInitialState,
  reducers: {
    setCouldGeneratePatientCensusReport: (state, { payload }: PayloadAction<boolean>) => {
      state.couldGenerateReport = payload;
    },
    getPatientCensusReportError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    getPatientCensusReport: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
      if (payload) {
        state.pagination.currentPage = payload.currentPage;
      }
    },
    getPatientCensusReportSuccess: (state, { payload }: PayloadAction<PatientCensusReportPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
    changePatientCensusReportPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changePatientCensusReportRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    setPatientCensusFilters: (state, { payload }: PayloadAction<PatientCensusFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setPatientCensusChipsCounters: (state, { payload }: PayloadAction<VascularAccessChipsCountersPayload>) => {
      state.reports.filters = { ...state.reports.filters, ...payload };
      state.couldGenerateReport = false;
      state.loading = false;
    },
    setPatientCensusFiltersError: (state, { payload }: PayloadAction<PatientCensusFiltersError>) => {
      state.reports.filtersError = payload;
    },
    clearPatientCensusFilters: () => patientCensusInitialState,
  },
});

export const {
  setCouldGeneratePatientCensusReport,
  changePatientCensusReportRowsPerPage,
  getPatientCensusReport,
  getPatientCensusReportSuccess,
  changePatientCensusReportPage,
  getPatientCensusReportError,
  setPatientCensusChipsCounters,
  setPatientCensusFiltersError,
  clearPatientCensusFilters,
  setPatientCensusFilters,
} = patientCensusReportSlice.actions;

export const selectCouldGeneratePatientCensusReports = () =>
  useAppSelector((state) => state.patientCensusReport.couldGenerateReport);
export const selectPatientCensusReportsLoading = () => useAppSelector((state) => state.patientCensusReport.loading);
export const selectPatientCensusReports = () => useAppSelector((state) => state.patientCensusReport.reports.content);
export const selectPatientCensusReportsPagination = () =>
  useAppSelector((state) => state.patientCensusReport.pagination);
export const selectPatientCensusFilters = () => useAppSelector((state) => state.patientCensusReport.reports.filters);
export const selectPatientCensusFilterErrors = () =>
  useAppSelector((state) => state.patientCensusReport.reports.filtersError);

const patientCensusReportReducer = patientCensusReportSlice.reducer;
export default patientCensusReportReducer;
