import type {
  VascularAccessReportsSliceState,
  VascularAccessReportsPayload,
  VascularAccessChipsCountersPayload,
  VascularAccessFilters,
  VascularAccessFiltersErrors,
} from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const vascularAccessInitialState: VascularAccessReportsSliceState;
export declare const vascularAccessReportsSlice: import('@reduxjs/toolkit').Slice<
  VascularAccessReportsSliceState,
  {
    setCouldGenerateVascularAccessReport: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    getVascularAccessReportsError: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getVascularAccessReports: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getVascularAccessReportsSuccess: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<VascularAccessReportsPayload>,
    ) => void;
    changeVascularAccessReportsPage: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeVascularAccessReportsRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    setVascularAccessFilters: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<VascularAccessFilters>,
    ) => void;
    setVascularAccessChipsCounters: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<VascularAccessChipsCountersPayload>,
    ) => void;
    setVascularAccessFilterErrors: (
      state: import('immer/dist/internal').WritableDraft<VascularAccessReportsSliceState>,
      { payload }: PayloadAction<VascularAccessFiltersErrors>,
    ) => void;
    clearVascularAccessFilters: () => VascularAccessReportsSliceState;
  },
  'vascularAccessReport'
>;
export declare const setCouldGenerateVascularAccessReport: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'vascularAccessReport/setCouldGenerateVascularAccessReport'
  >,
  getVascularAccessReports: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'vascularAccessReport/getVascularAccessReports'
  >,
  getVascularAccessReportsError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'vascularAccessReport/getVascularAccessReportsError'
  >,
  getVascularAccessReportsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VascularAccessReportsPayload,
    'vascularAccessReport/getVascularAccessReportsSuccess'
  >,
  changeVascularAccessReportsPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'vascularAccessReport/changeVascularAccessReportsPage'
  >,
  changeVascularAccessReportsRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'vascularAccessReport/changeVascularAccessReportsRowsPerPage'
  >,
  setVascularAccessFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VascularAccessFilters,
    'vascularAccessReport/setVascularAccessFilters'
  >,
  setVascularAccessFilterErrors: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VascularAccessFiltersErrors,
    'vascularAccessReport/setVascularAccessFilterErrors'
  >,
  clearVascularAccessFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vascularAccessReport/clearVascularAccessFilters'>,
  setVascularAccessChipsCounters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VascularAccessChipsCountersPayload,
    'vascularAccessReport/setVascularAccessChipsCounters'
  >;
export declare const selectCouldGenerateVascularAccessReport: () => any;
export declare const selectVascularAccessReportsLoading: () => any;
export declare const selectVascularAccessReports: () => any;
export declare const selectPagination: () => any;
export declare const selectVascularAccessFilters: () => any;
export declare const selectVascularAccessFilterErrors: () => any;
declare const vascularAccessReportsReducer: import('redux').Reducer<
  VascularAccessReportsSliceState,
  import('redux').AnyAction
>;
export default vascularAccessReportsReducer;
