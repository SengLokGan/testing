import {
  MortalityReportFilters,
  MortalityReportFiltersError,
  MortalityReportPayload,
  MortalityReportsSliceState,
} from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const mortalityReportsInitialState: MortalityReportsSliceState;
export declare const mortalityReportsSlice: import('@reduxjs/toolkit').Slice<
  MortalityReportsSliceState,
  {
    setMortalityReportError: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    setMortalityReportFilters: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<MortalityReportFilters>,
    ) => void;
    setMortalityReportFiltersError: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<MortalityReportFiltersError>,
    ) => void;
    clearMortalityReports: () => MortalityReportsSliceState;
    changeMortalityReportPage: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeMortalityReportRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    getMortalityReport: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getMortalityReportSuccess: (
      state: import('immer/dist/internal').WritableDraft<MortalityReportsSliceState>,
      { payload }: PayloadAction<MortalityReportPayload>,
    ) => void;
  },
  'mortalityReports'
>;
export declare const setMortalityReportError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'mortalityReports/setMortalityReportError'
  >,
  setMortalityReportFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    MortalityReportFilters,
    'mortalityReports/setMortalityReportFilters'
  >,
  setMortalityReportFiltersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    MortalityReportFiltersError,
    'mortalityReports/setMortalityReportFiltersError'
  >,
  clearMortalityReports: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'mortalityReports/clearMortalityReports'>,
  changeMortalityReportPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'mortalityReports/changeMortalityReportPage'
  >,
  changeMortalityReportRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'mortalityReports/changeMortalityReportRowsPerPage'
  >,
  getMortalityReport: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'mortalityReports/getMortalityReport'
  >,
  getMortalityReportSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    MortalityReportPayload,
    'mortalityReports/getMortalityReportSuccess'
  >;
export declare const selectMortalityReportFilters: () => any;
export declare const selectMortalityReportFiltersError: () => any;
export declare const selectCouldGenerateMortalityReport: () => any;
export declare const selectMortalityReportLoading: () => any;
export declare const selectMortalityReportPagination: () => any;
export declare const selectMortalityReports: () => any;
declare const mortalityReportsReducer: import('redux').Reducer<MortalityReportsSliceState, import('redux').AnyAction>;
export default mortalityReportsReducer;
