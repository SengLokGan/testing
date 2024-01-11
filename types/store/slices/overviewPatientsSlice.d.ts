import { PayloadAction } from '@reduxjs/toolkit';
import {
  OverviewSliceState,
  ChangePatientsOverviewFiltersPayload,
  ChangePatientsOverviewStatusesFiltersPayload,
  ClientOverviewPatientTable,
  PatientOverviewStatusesFilterItem,
} from '@types';
export declare const patientsOverviewInitialState: OverviewSliceState;
export declare const overviewPatientsSlice: import('@reduxjs/toolkit').Slice<
  OverviewSliceState,
  {
    getPatientsOverviewList: (state: import('immer/dist/internal').WritableDraft<OverviewSliceState>) => void;
    getPatientsOverviewListSuccess: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      { payload }: PayloadAction<ClientOverviewPatientTable>,
    ) => void;
    getPatientsOverviewError: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    getFilteredPatientsOverviewList: (state: import('immer/dist/internal').WritableDraft<OverviewSliceState>) => void;
    changePatientsOverviewFilters: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      {
        payload: { patient, isolations },
      }: PayloadAction<ChangePatientsOverviewFiltersPayload>,
    ) => void;
    changePatientsOverviewStatusesFilters: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      { payload }: PayloadAction<ChangePatientsOverviewStatusesFiltersPayload>,
    ) => void;
    setPatientsOverviewStatusesCounters: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      {
        payload,
      }: PayloadAction<{
        items: PatientOverviewStatusesFilterItem[];
      }>,
    ) => void;
    clearPatientsOverviewChipsFilters: (state: import('immer/dist/internal').WritableDraft<OverviewSliceState>) => void;
    changeOverviewPatientPage: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeOverviewPatientRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<OverviewSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
  },
  'allPatients'
>;
export declare const getPatientsOverviewList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'allPatients/getPatientsOverviewList'>,
  getPatientsOverviewListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClientOverviewPatientTable,
    'allPatients/getPatientsOverviewListSuccess'
  >,
  getPatientsOverviewError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'allPatients/getPatientsOverviewError'
  >,
  getFilteredPatientsOverviewList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'allPatients/getFilteredPatientsOverviewList'>,
  changePatientsOverviewStatusesFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangePatientsOverviewStatusesFiltersPayload,
    'allPatients/changePatientsOverviewStatusesFilters'
  >,
  clearPatientsOverviewChipsFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'allPatients/clearPatientsOverviewChipsFilters'>,
  changePatientsOverviewFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangePatientsOverviewFiltersPayload,
    'allPatients/changePatientsOverviewFilters'
  >,
  setPatientsOverviewStatusesCounters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      items: PatientOverviewStatusesFilterItem[];
    },
    'allPatients/setPatientsOverviewStatusesCounters'
  >,
  changeOverviewPatientRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'allPatients/changeOverviewPatientRowsPerPage'
  >,
  changeOverviewPatientPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'allPatients/changeOverviewPatientPage'
  >;
export declare const selectOverviewPatientsPagination: () => any;
export declare const selectOverviewPatients: () => any;
export declare const selectOverviewPatientsLoading: () => any;
export declare const selectOverviewPatientsIsolatorFilters: () => any;
export declare const selectOverviewPatientsPatientFilter: () => any;
export declare const selectOverviewPatientsStatusesFilters: () => any;
declare const overviewPatientsReducer: import('redux').Reducer<OverviewSliceState, import('redux').AnyAction>;
export default overviewPatientsReducer;
