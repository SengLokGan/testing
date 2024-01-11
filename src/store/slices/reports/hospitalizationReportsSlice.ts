import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientHospitalizationReason } from '@enums';
import {
  HospitalizationReportFilters,
  HospitalizationReportFiltersErrors,
  HospitalizationReportPayload,
  HospitalizationReportsSliceState,
} from '@types';
import { useAppSelector } from '@hooks/storeHooks';

export const hospitalizationReportsInitialState: HospitalizationReportsSliceState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      date: null,
      patient: null,
      reasons: [
        { name: PatientHospitalizationReason.HD_RELATED, selected: false, badge: null },
        { name: PatientHospitalizationReason.NON_HD_RELATED, selected: false, badge: null },
        { name: PatientHospitalizationReason.VASCULAR_RELATED, selected: false, badge: null },
        { name: PatientHospitalizationReason.UNKNOWN, selected: false, badge: null },
      ],
    },
    filtersErrors: {
      date: null,
      patient: null,
    },
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const hospitalizationReportsSlice = createSlice({
  name: 'hospitalizationReports',
  initialState: hospitalizationReportsInitialState,
  reducers: {
    setCouldGenerateHospitalizationReport: (state, { payload }: PayloadAction<boolean>) => {
      state.couldGenerateReport = payload;
    },
    setHospitalizationReportsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    getHospitalizationReports: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
      if (payload) {
        state.pagination.currentPage = payload.currentPage;
      }
    },
    getHospitalizationReportsSuccess: (state, { payload }: PayloadAction<HospitalizationReportPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
    changeHospitalizationReportsPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changeHospitalizationRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    setHospitalizationFilters: (state, { payload }: PayloadAction<HospitalizationReportFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setHospitalizationChipsCounters: (state, { payload }: PayloadAction<HospitalizationReportFilters>) => {
      state.reports.filters = { ...state.reports.filters, ...payload };
      state.couldGenerateReport = false;
      state.loading = false;
    },
    setHospitalizationFilterErrors: (state, { payload }: PayloadAction<HospitalizationReportFiltersErrors>) => {
      state.reports.filtersErrors = payload;
    },
    clearHospitalizationReports: () => hospitalizationReportsInitialState,
  },
});

export const {
  clearHospitalizationReports,
  setHospitalizationFilterErrors,
  setHospitalizationFilters,
  setHospitalizationReportsError,
  setHospitalizationChipsCounters,
  getHospitalizationReports,
  getHospitalizationReportsSuccess,
  changeHospitalizationReportsPage,
  changeHospitalizationRowsPerPage,
} = hospitalizationReportsSlice.actions;

export const selectHospitalizationReportsFilters = () =>
  useAppSelector((state) => state.hospitalizationReports.reports.filters);
export const selectHospitalizationReportsFiltersErrors = () =>
  useAppSelector((state) => state.hospitalizationReports.reports.filtersErrors);
export const selectCouldGenerateHospitalizationReportsFilters = () =>
  useAppSelector((state) => state.hospitalizationReports.couldGenerateReport);
export const selectIsLoadingHospitalizationReports = () =>
  useAppSelector((state) => state.hospitalizationReports.isLoading);
export const selectHospitalizationReportsPagination = () =>
  useAppSelector((state) => state.hospitalizationReports.pagination);
export const selectHospitalizationReports = () =>
  useAppSelector((state) => state.hospitalizationReports.reports.content);

const hospitalizationReportsReducer = hospitalizationReportsSlice.reducer;
export default hospitalizationReportsReducer;
