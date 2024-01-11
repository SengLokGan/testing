import type { PatientCensusReportSliceState } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  PatientCensusFilters,
  PatientCensusFiltersError,
  PatientCensusReportPayload,
  VascularAccessChipsCountersPayload,
} from '@types';
export declare const patientCensusInitialState: PatientCensusReportSliceState;
export declare const patientCensusReportSlice: import('@reduxjs/toolkit').Slice<
  PatientCensusReportSliceState,
  {
    setCouldGeneratePatientCensusReport: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    getPatientCensusReportError: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getPatientCensusReport: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      {
        payload,
      }: PayloadAction<
        | {
            currentPage: number;
          }
        | undefined
      >,
    ) => void;
    getPatientCensusReportSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<PatientCensusReportPayload>,
    ) => void;
    changePatientCensusReportPage: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changePatientCensusReportRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    setPatientCensusFilters: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<PatientCensusFilters>,
    ) => void;
    setPatientCensusChipsCounters: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<VascularAccessChipsCountersPayload>,
    ) => void;
    setPatientCensusFiltersError: (
      state: import('immer/dist/internal').WritableDraft<PatientCensusReportSliceState>,
      { payload }: PayloadAction<PatientCensusFiltersError>,
    ) => void;
    clearPatientCensusFilters: () => PatientCensusReportSliceState;
  },
  'patientCensusReport'
>;
export declare const setCouldGeneratePatientCensusReport: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'patientCensusReport/setCouldGeneratePatientCensusReport'
  >,
  changePatientCensusReportRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'patientCensusReport/changePatientCensusReportRowsPerPage'
  >,
  getPatientCensusReport: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    | {
        currentPage: number;
      }
    | undefined,
    'patientCensusReport/getPatientCensusReport'
  >,
  getPatientCensusReportSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientCensusReportPayload,
    'patientCensusReport/getPatientCensusReportSuccess'
  >,
  changePatientCensusReportPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'patientCensusReport/changePatientCensusReportPage'
  >,
  getPatientCensusReportError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'patientCensusReport/getPatientCensusReportError'
  >,
  setPatientCensusChipsCounters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VascularAccessChipsCountersPayload,
    'patientCensusReport/setPatientCensusChipsCounters'
  >,
  setPatientCensusFiltersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientCensusFiltersError,
    'patientCensusReport/setPatientCensusFiltersError'
  >,
  clearPatientCensusFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientCensusReport/clearPatientCensusFilters'>,
  setPatientCensusFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientCensusFilters,
    'patientCensusReport/setPatientCensusFilters'
  >;
export declare const selectCouldGeneratePatientCensusReports: () => any;
export declare const selectPatientCensusReportsLoading: () => any;
export declare const selectPatientCensusReports: () => any;
export declare const selectPatientCensusReportsPagination: () => any;
export declare const selectPatientCensusFilters: () => any;
export declare const selectPatientCensusFilterErrors: () => any;
declare const patientCensusReportReducer: import('redux').Reducer<
  PatientCensusReportSliceState,
  import('redux').AnyAction
>;
export default patientCensusReportReducer;
