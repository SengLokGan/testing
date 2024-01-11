import {
  PatientStationHistoryFilters,
  PatientStationHistoryFiltersError,
  PatientStationHistoryReportPayload,
  patientStationHistoryState,
} from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const patientStationHistoryInitialState: patientStationHistoryState;
export declare const patientStationHistoryReportSlice: import('@reduxjs/toolkit').Slice<
  patientStationHistoryState,
  {
    setCouldGeneratePatientStationHistoryReport: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    setPatientStationHistoryReportError: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<string>,
    ) => void;
    setPatientStationHistoryReportFilters: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<PatientStationHistoryFilters>,
    ) => void;
    setPatientStationHistoryReportFiltersError: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<PatientStationHistoryFiltersError>,
    ) => void;
    clearPatientStationHistoryReportsFilters: () => patientStationHistoryState;
    changePatientStationHistoryReportPage: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changePatientStationHistoryReportRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<number>,
    ) => void;
    getPatientStationHistoryReport: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getPatientStationHistoryReportSuccess: (
      state: import('immer/dist/internal').WritableDraft<patientStationHistoryState>,
      { payload }: PayloadAction<PatientStationHistoryReportPayload>,
    ) => void;
  },
  'patientStationHistoryReport'
>;
export declare const setCouldGeneratePatientStationHistoryReport: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'patientStationHistoryReport/setCouldGeneratePatientStationHistoryReport'
  >,
  setPatientStationHistoryReportError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'patientStationHistoryReport/setPatientStationHistoryReportError'
  >,
  setPatientStationHistoryReportFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientStationHistoryFilters,
    'patientStationHistoryReport/setPatientStationHistoryReportFilters'
  >,
  setPatientStationHistoryReportFiltersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientStationHistoryFiltersError,
    'patientStationHistoryReport/setPatientStationHistoryReportFiltersError'
  >,
  clearPatientStationHistoryReportsFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientStationHistoryReport/clearPatientStationHistoryReportsFilters'>,
  changePatientStationHistoryReportPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'patientStationHistoryReport/changePatientStationHistoryReportPage'
  >,
  changePatientStationHistoryReportRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'patientStationHistoryReport/changePatientStationHistoryReportRowsPerPage'
  >,
  getPatientStationHistoryReport: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'patientStationHistoryReport/getPatientStationHistoryReport'
  >,
  getPatientStationHistoryReportSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientStationHistoryReportPayload,
    'patientStationHistoryReport/getPatientStationHistoryReportSuccess'
  >;
export declare const selectPatientStationHistoryReportFilters: () => any;
export declare const selectPatientStationHistoryReportFiltersError: () => any;
export declare const selectCouldGeneratePatientStationHistoryReport: () => any;
export declare const selectPatientStationHistoryReportLoading: () => any;
export declare const selectPatientStationHistoryReportPagination: () => any;
export declare const selectPatientStationHistoryReports: () => any;
declare const patientStationHistoryReportReducer: import('redux').Reducer<
  patientStationHistoryState,
  import('redux').AnyAction
>;
export default patientStationHistoryReportReducer;
