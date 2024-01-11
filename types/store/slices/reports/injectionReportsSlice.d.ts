import {
  InjectionReportFilters,
  InjectionReportFiltersError,
  InjectionReportsSliceState,
  InjectionReportsContentItem,
  Pagination,
} from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export type InjectionReportPayload = {
  content: InjectionReportsContentItem[];
  pagination: Pagination;
};
export declare const injectionReportsInitialState: InjectionReportsSliceState;
export declare const injectionReportsSlice: import('@reduxjs/toolkit').Slice<
  InjectionReportsSliceState,
  {
    setCouldGenerateInjectionReport: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    setInjectionReportError: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    setInjectionReportFilters: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<InjectionReportFilters>,
    ) => void;
    setInjectionReportFiltersError: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<InjectionReportFiltersError>,
    ) => void;
    clearInjectionReportsFilters: () => InjectionReportsSliceState;
    changeInjectionReportPage: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeInjectionReportRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    getInjectionReport: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getInjectionReportSuccess: (
      state: import('immer/dist/internal').WritableDraft<InjectionReportsSliceState>,
      { payload }: PayloadAction<InjectionReportPayload>,
    ) => void;
  },
  'injectionReports'
>;
export declare const setCouldGenerateInjectionReport: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'injectionReports/setCouldGenerateInjectionReport'
  >,
  changeInjectionReportPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'injectionReports/changeInjectionReportPage'
  >,
  changeInjectionReportRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'injectionReports/changeInjectionReportRowsPerPage'
  >,
  clearInjectionReportsFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'injectionReports/clearInjectionReportsFilters'>,
  getInjectionReportSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    InjectionReportPayload,
    'injectionReports/getInjectionReportSuccess'
  >,
  setInjectionReportError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'injectionReports/setInjectionReportError'
  >,
  setInjectionReportFiltersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    InjectionReportFiltersError,
    'injectionReports/setInjectionReportFiltersError'
  >,
  setInjectionReportFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    InjectionReportFilters,
    'injectionReports/setInjectionReportFilters'
  >,
  getInjectionReport: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'injectionReports/getInjectionReport'
  >;
export declare const selectInjectionReportFilters: () => any;
export declare const selectInjectionReportFiltersError: () => any;
export declare const selectCouldGenerateInjectionReport: () => any;
export declare const selectInjectionReportLoading: () => any;
export declare const selectInjectionReportPagination: () => any;
export declare const selectInjectionReports: () => any;
declare const injectionReportsReducer: import('redux').Reducer<InjectionReportsSliceState, import('redux').AnyAction>;
export default injectionReportsReducer;
