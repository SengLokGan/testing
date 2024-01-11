import {
  InjectionReportFilters,
  InjectionReportFiltersError,
  InjectionReportsSliceState,
  InjectionReportsContentItem,
  Pagination,
} from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

export type InjectionReportPayload = {
  content: InjectionReportsContentItem[];
  pagination: Pagination;
};

export const injectionReportsInitialState: InjectionReportsSliceState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      fromDate: null,
      toDate: null,
      patient: null,
      injection: null,
      shifts: [],
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

export const injectionReportsSlice = createSlice({
  name: 'injectionReports',
  initialState: injectionReportsInitialState,
  reducers: {
    setCouldGenerateInjectionReport: (state, { payload }: PayloadAction<boolean>) => {
      state.couldGenerateReport = payload;
    },
    setInjectionReportError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    setInjectionReportFilters: (state, { payload }: PayloadAction<InjectionReportFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setInjectionReportFiltersError: (state, { payload }: PayloadAction<InjectionReportFiltersError>) => {
      state.reports.filtersError = payload;
    },
    clearInjectionReportsFilters: () => injectionReportsInitialState,
    changeInjectionReportPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changeInjectionReportRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    getInjectionReport: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
      if (payload) {
        state.pagination.currentPage = payload.currentPage;
      }
    },
    getInjectionReportSuccess: (state, { payload }: PayloadAction<InjectionReportPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
  },
});

export const {
  setCouldGenerateInjectionReport,
  changeInjectionReportPage,
  changeInjectionReportRowsPerPage,
  clearInjectionReportsFilters,
  getInjectionReportSuccess,
  setInjectionReportError,
  setInjectionReportFiltersError,
  setInjectionReportFilters,
  getInjectionReport,
} = injectionReportsSlice.actions;

export const selectInjectionReportFilters = () => useAppSelector((state) => state.injectionReports.reports.filters);
export const selectInjectionReportFiltersError = () =>
  useAppSelector((state) => state.injectionReports.reports.filtersError);
export const selectCouldGenerateInjectionReport = () =>
  useAppSelector((state) => state.injectionReports.couldGenerateReport);
export const selectInjectionReportLoading = () => useAppSelector((state) => state.injectionReports.loading);
export const selectInjectionReportPagination = () => useAppSelector((state) => state.injectionReports.pagination);
export const selectInjectionReports = () => useAppSelector((state) => state.injectionReports.reports.content);

const injectionReportsReducer = injectionReportsSlice.reducer;
export default injectionReportsReducer;
