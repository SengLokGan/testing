import {
  PatientStationHistoryFilters,
  PatientStationHistoryFiltersError,
  PatientStationHistoryReportPayload,
  patientStationHistoryState,
} from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

export const patientStationHistoryInitialState: patientStationHistoryState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      fromDate: null,
      toDate: null,
      patient: null,
      locations: { label: '', value: '' },
      startTime: null,
      endTime: null,
    },
    filtersError: {
      fromDate: null,
      toDate: null,
      patient: null,
      startTime: null,
      endTime: null,
    },
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const patientStationHistoryReportSlice = createSlice({
  name: 'patientStationHistoryReport',
  initialState: patientStationHistoryInitialState,
  reducers: {
    setCouldGeneratePatientStationHistoryReport: (state, { payload }: PayloadAction<boolean>) => {
      state.couldGenerateReport = payload;
    },
    setPatientStationHistoryReportError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    setPatientStationHistoryReportFilters: (state, { payload }: PayloadAction<PatientStationHistoryFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setPatientStationHistoryReportFiltersError: (
      state,
      { payload }: PayloadAction<PatientStationHistoryFiltersError>,
    ) => {
      state.reports.filtersError = payload;
    },
    clearPatientStationHistoryReportsFilters: () => patientStationHistoryInitialState,
    changePatientStationHistoryReportPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changePatientStationHistoryReportRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    getPatientStationHistoryReport: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
    },
    getPatientStationHistoryReportSuccess: (state, { payload }: PayloadAction<PatientStationHistoryReportPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
  },
});

export const {
  setCouldGeneratePatientStationHistoryReport,
  setPatientStationHistoryReportError,
  setPatientStationHistoryReportFilters,
  setPatientStationHistoryReportFiltersError,
  clearPatientStationHistoryReportsFilters,
  changePatientStationHistoryReportPage,
  changePatientStationHistoryReportRowsPerPage,
  getPatientStationHistoryReport,
  getPatientStationHistoryReportSuccess,
} = patientStationHistoryReportSlice.actions;

export const selectPatientStationHistoryReportFilters = () =>
  useAppSelector((state) => state.patientStationHistoryReport.reports.filters);
export const selectPatientStationHistoryReportFiltersError = () =>
  useAppSelector((state) => state.patientStationHistoryReport.reports.filtersError);
export const selectCouldGeneratePatientStationHistoryReport = () =>
  useAppSelector((state) => state.patientStationHistoryReport.couldGenerateReport);
export const selectPatientStationHistoryReportLoading = () =>
  useAppSelector((state) => state.patientStationHistoryReport.loading);
export const selectPatientStationHistoryReportPagination = () =>
  useAppSelector((state) => state.patientStationHistoryReport.pagination);
export const selectPatientStationHistoryReports = () =>
  useAppSelector((state) => state.patientStationHistoryReport.reports.content);

const patientStationHistoryReportReducer = patientStationHistoryReportSlice.reducer;
export default patientStationHistoryReportReducer;
