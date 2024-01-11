import {
  MortalityReportFilters,
  MortalityReportFiltersError,
  MortalityReportPayload,
  MortalityReportsSliceState,
} from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

export const mortalityReportsInitialState: MortalityReportsSliceState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      fromDate: null,
      toDate: null,
      patient: null,
    },
    filtersError: {
      fromDate: null,
      toDate: null,
      patient: null,
    },
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const mortalityReportsSlice = createSlice({
  name: 'mortalityReports',
  initialState: mortalityReportsInitialState,
  reducers: {
    setMortalityReportError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    setMortalityReportFilters: (state, { payload }: PayloadAction<MortalityReportFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setMortalityReportFiltersError: (state, { payload }: PayloadAction<MortalityReportFiltersError>) => {
      state.reports.filtersError = payload;
    },
    clearMortalityReports: () => mortalityReportsInitialState,
    changeMortalityReportPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changeMortalityReportRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    getMortalityReport: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
      if (payload) {
        state.pagination.currentPage = payload.currentPage;
      }
    },
    getMortalityReportSuccess: (state, { payload }: PayloadAction<MortalityReportPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
  },
});

export const {
  setMortalityReportError,
  setMortalityReportFilters,
  setMortalityReportFiltersError,
  clearMortalityReports,
  changeMortalityReportPage,
  changeMortalityReportRowsPerPage,
  getMortalityReport,
  getMortalityReportSuccess,
} = mortalityReportsSlice.actions;

export const selectMortalityReportFilters = () => useAppSelector((state) => state.mortalityReports.reports.filters);
export const selectMortalityReportFiltersError = () =>
  useAppSelector((state) => state.mortalityReports.reports.filtersError);
export const selectCouldGenerateMortalityReport = () =>
  useAppSelector((state) => state.mortalityReports.couldGenerateReport);
export const selectMortalityReportLoading = () => useAppSelector((state) => state.mortalityReports.loading);
export const selectMortalityReportPagination = () => useAppSelector((state) => state.mortalityReports.pagination);
export const selectMortalityReports = () => useAppSelector((state) => state.mortalityReports.reports.content);

const mortalityReportsReducer = mortalityReportsSlice.reducer;
export default mortalityReportsReducer;
