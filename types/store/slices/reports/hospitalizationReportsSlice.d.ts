import { PayloadAction } from '@reduxjs/toolkit';
import {
  HospitalizationReportFilters,
  HospitalizationReportFiltersErrors,
  HospitalizationReportPayload,
  HospitalizationReportsSliceState,
} from '@types';
export declare const hospitalizationReportsInitialState: HospitalizationReportsSliceState;
export declare const hospitalizationReportsSlice: import('@reduxjs/toolkit').Slice<
  HospitalizationReportsSliceState,
  {
    setCouldGenerateHospitalizationReport: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    setHospitalizationReportsError: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getHospitalizationReports: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getHospitalizationReportsSuccess: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<HospitalizationReportPayload>,
    ) => void;
    changeHospitalizationReportsPage: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeHospitalizationRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    setHospitalizationFilters: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<HospitalizationReportFilters>,
    ) => void;
    setHospitalizationChipsCounters: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<HospitalizationReportFilters>,
    ) => void;
    setHospitalizationFilterErrors: (
      state: import('immer/dist/internal').WritableDraft<HospitalizationReportsSliceState>,
      { payload }: PayloadAction<HospitalizationReportFiltersErrors>,
    ) => void;
    clearHospitalizationReports: () => HospitalizationReportsSliceState;
  },
  'hospitalizationReports'
>;
export declare const clearHospitalizationReports: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hospitalizationReports/clearHospitalizationReports'>,
  setHospitalizationFilterErrors: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HospitalizationReportFiltersErrors,
    'hospitalizationReports/setHospitalizationFilterErrors'
  >,
  setHospitalizationFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HospitalizationReportFilters,
    'hospitalizationReports/setHospitalizationFilters'
  >,
  setHospitalizationReportsError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'hospitalizationReports/setHospitalizationReportsError'
  >,
  setHospitalizationChipsCounters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HospitalizationReportFilters,
    'hospitalizationReports/setHospitalizationChipsCounters'
  >,
  getHospitalizationReports: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'hospitalizationReports/getHospitalizationReports'
  >,
  getHospitalizationReportsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HospitalizationReportPayload,
    'hospitalizationReports/getHospitalizationReportsSuccess'
  >,
  changeHospitalizationReportsPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'hospitalizationReports/changeHospitalizationReportsPage'
  >,
  changeHospitalizationRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'hospitalizationReports/changeHospitalizationRowsPerPage'
  >;
export declare const selectHospitalizationReportsFilters: () => any;
export declare const selectHospitalizationReportsFiltersErrors: () => any;
export declare const selectCouldGenerateHospitalizationReportsFilters: () => any;
export declare const selectIsLoadingHospitalizationReports: () => any;
export declare const selectHospitalizationReportsPagination: () => any;
export declare const selectHospitalizationReports: () => any;
declare const hospitalizationReportsReducer: import('redux').Reducer<
  HospitalizationReportsSliceState,
  import('redux').AnyAction
>;
export default hospitalizationReportsReducer;
