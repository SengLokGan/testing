import type {
  VascularAccessReportsSliceState,
  VascularAccessReportsPayload,
  VascularAccessChipsCountersPayload,
  VascularAccessFilters,
  VascularAccessFiltersErrors,
} from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { CvcTimeCategory, VascularAccessType, ChipsCountersSumNames } from '@enums';

export const vascularAccessInitialState: VascularAccessReportsSliceState = {
  loading: false,
  error: null,
  couldGenerateReport: true,
  reports: {
    content: [],
    filters: {
      date: null,
      accessTypes: [
        { name: ChipsCountersSumNames.vascular, selected: false, badge: null },
        { name: VascularAccessType.AVF, selected: false, badge: null },
        { name: VascularAccessType.AVG, selected: false, badge: null },
      ],
      categories: [
        { name: ChipsCountersSumNames.cvc, selected: false, badge: null },
        { name: CvcTimeCategory.Permanent, selected: false, badge: null },
        { name: CvcTimeCategory.Temporary, selected: false, badge: null },
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

export const vascularAccessReportsSlice = createSlice({
  name: 'vascularAccessReport',
  initialState: vascularAccessInitialState,
  reducers: {
    setCouldGenerateVascularAccessReport: (state, { payload }: PayloadAction<boolean>) => {
      state.couldGenerateReport = payload;
    },
    getVascularAccessReportsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    getVascularAccessReports: (state, { payload }: PayloadAction<{ currentPage: number } | undefined>) => {
      state.loading = true;
      if (payload) {
        state.pagination.currentPage = payload.currentPage;
      }
    },
    getVascularAccessReportsSuccess: (state, { payload }: PayloadAction<VascularAccessReportsPayload>) => {
      state.reports.content = payload.content;
      state.pagination = payload.pagination;
      state.couldGenerateReport = false;
      state.loading = false;
    },
    changeVascularAccessReportsPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = true;
    },
    changeVascularAccessReportsRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    setVascularAccessFilters: (state, { payload }: PayloadAction<VascularAccessFilters>) => {
      state.reports.filters = payload;
      state.couldGenerateReport = true;
    },
    setVascularAccessChipsCounters: (state, { payload }: PayloadAction<VascularAccessChipsCountersPayload>) => {
      state.reports.filters = { ...state.reports.filters, ...payload };
      state.couldGenerateReport = false;
      state.loading = false;
    },
    setVascularAccessFilterErrors: (state, { payload }: PayloadAction<VascularAccessFiltersErrors>) => {
      state.reports.filtersError = payload;
    },
    clearVascularAccessFilters: () => vascularAccessInitialState,
  },
});

export const {
  setCouldGenerateVascularAccessReport,
  getVascularAccessReports,
  getVascularAccessReportsError,
  getVascularAccessReportsSuccess,
  changeVascularAccessReportsPage,
  changeVascularAccessReportsRowsPerPage,
  setVascularAccessFilters,
  setVascularAccessFilterErrors,
  clearVascularAccessFilters,
  setVascularAccessChipsCounters,
} = vascularAccessReportsSlice.actions;

export const selectCouldGenerateVascularAccessReport = () =>
  useAppSelector((state) => state.vascularAccessReports.couldGenerateReport);
export const selectVascularAccessReportsLoading = () => useAppSelector((state) => state.vascularAccessReports.loading);
export const selectVascularAccessReports = () => useAppSelector((state) => state.vascularAccessReports.reports.content);
export const selectPagination = () => useAppSelector((state) => state.vascularAccessReports.pagination);
export const selectVascularAccessFilters = () => useAppSelector((state) => state.vascularAccessReports.reports.filters);
export const selectVascularAccessFilterErrors = () =>
  useAppSelector((state) => state.vascularAccessReports.reports.filtersError);

const vascularAccessReportsReducer = vascularAccessReportsSlice.reducer;
export default vascularAccessReportsReducer;
