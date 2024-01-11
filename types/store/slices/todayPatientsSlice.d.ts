import { PayloadAction } from '@reduxjs/toolkit';
import { InjectionType, TodayPatientsTabs, TodayPatientsViewMode } from '@enums';
import type {
  AppointmentsStatusesFilterItem,
  AppointmentsTable,
  PatientIsolationFilterItem,
  Shift,
  TodayPatientsPatientFilterType,
  TodayPatientsPlannedInjectionsResponse,
  TodayPatientsSliceState,
} from '@types';
export declare const todayPatientInitialState: TodayPatientsSliceState;
type TodayPatientFiltersPayload = {
  isolations?: {
    items: PatientIsolationFilterItem[];
  };
  patient?: {
    name: string;
    id: string;
  } | null;
};
export declare const TodayPatientsSlice: import('@reduxjs/toolkit').Slice<
  TodayPatientsSliceState,
  {
    getTodayPatientsAppointments(state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>): void;
    getTodayPatientsAppointmentsSuccess: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<AppointmentsTable>,
    ) => void;
    getTodayPatientsAppointmentsError: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    setTodayPatientsFilterDate: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<Date>,
    ) => void;
    changeTodayPatientsAppointmentsPage: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeTodayPatientsAppointmentsRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeTodayPatientsFilters: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      {
        payload: { patient, isolations },
      }: PayloadAction<TodayPatientFiltersPayload>,
    ) => void;
    changeTodayPatientsStatusesFilters: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      {
        payload,
      }: PayloadAction<{
        items: AppointmentsStatusesFilterItem[];
      }>,
    ) => void;
    setTodayPatientsStatusesCounters: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      {
        payload,
      }: PayloadAction<{
        items: AppointmentsStatusesFilterItem[];
      }>,
    ) => void;
    setTodayPatientsPatientFilter: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<TodayPatientsPatientFilterType>,
    ) => void;
    clearAllTodayPatientsFilters: (state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>) => void;
    changeTodayPatientsActiveTab: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<TodayPatientsTabs>,
    ) => void;
    getTodayPatientsInjections(state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>): void;
    getTodayPatientsInjectionsSuccess: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<TodayPatientsPlannedInjectionsResponse>,
    ) => void;
    getTodayPatientsShifts: (state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>) => void;
    getTodayPatientsShiftsSuccess: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<Shift[]>,
    ) => void;
    updateTodayPatientsInjectionPrepared: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      {
        payload,
      }: PayloadAction<{
        id: number;
        appointmentId: number;
        status: boolean;
        type: InjectionType;
      }>,
    ) => void;
    updateTodayPatientsInjectionPreparedSuccess: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
    ) => void;
    changeTodayPatientsViewMode: (
      state: import('immer/dist/internal').WritableDraft<TodayPatientsSliceState>,
      { payload }: PayloadAction<TodayPatientsViewMode>,
    ) => void;
  },
  'todayPatients'
>;
export declare const getTodayPatientsAppointments: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'todayPatients/getTodayPatientsAppointments'>,
  getTodayPatientsAppointmentsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AppointmentsTable,
    'todayPatients/getTodayPatientsAppointmentsSuccess'
  >,
  getTodayPatientsAppointmentsError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'todayPatients/getTodayPatientsAppointmentsError'
  >,
  changeTodayPatientsAppointmentsPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'todayPatients/changeTodayPatientsAppointmentsPage'
  >,
  setTodayPatientsFilterDate: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Date,
    'todayPatients/setTodayPatientsFilterDate'
  >,
  changeTodayPatientsAppointmentsRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'todayPatients/changeTodayPatientsAppointmentsRowsPerPage'
  >,
  changeTodayPatientsFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TodayPatientFiltersPayload,
    'todayPatients/changeTodayPatientsFilters'
  >,
  clearAllTodayPatientsFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'todayPatients/clearAllTodayPatientsFilters'>,
  changeTodayPatientsStatusesFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      items: AppointmentsStatusesFilterItem[];
    },
    'todayPatients/changeTodayPatientsStatusesFilters'
  >,
  setTodayPatientsStatusesCounters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      items: AppointmentsStatusesFilterItem[];
    },
    'todayPatients/setTodayPatientsStatusesCounters'
  >,
  setTodayPatientsPatientFilter: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TodayPatientsPatientFilterType,
    'todayPatients/setTodayPatientsPatientFilter'
  >,
  changeTodayPatientsActiveTab: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TodayPatientsTabs,
    'todayPatients/changeTodayPatientsActiveTab'
  >,
  getTodayPatientsInjections: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'todayPatients/getTodayPatientsInjections'>,
  getTodayPatientsInjectionsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TodayPatientsPlannedInjectionsResponse,
    'todayPatients/getTodayPatientsInjectionsSuccess'
  >,
  getTodayPatientsShifts: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'todayPatients/getTodayPatientsShifts'>,
  getTodayPatientsShiftsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Shift[],
    'todayPatients/getTodayPatientsShiftsSuccess'
  >,
  updateTodayPatientsInjectionPrepared: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      id: number;
      appointmentId: number;
      status: boolean;
      type: InjectionType;
    },
    'todayPatients/updateTodayPatientsInjectionPrepared'
  >,
  updateTodayPatientsInjectionPreparedSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'todayPatients/updateTodayPatientsInjectionPreparedSuccess'>,
  changeTodayPatientsViewMode: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TodayPatientsViewMode,
    'todayPatients/changeTodayPatientsViewMode'
  >;
export declare const selectTodayPatientsAppointments: () => any;
export declare const selectTodayPatientsLoading: () => any;
export declare const selectTodayPatientsInjectionsLoading: () => any;
export declare const selectTodayPatientsAppointmentsPagination: () => any;
export declare const selectTodayPatientsViewMode: () => any;
export declare const selectTodayPatientsIsolatorFilters: () => any;
export declare const selectTodayPatientFilter: () => any;
export declare const selectTodayPatientsStatusesFilters: () => any;
export declare const selectTodayPatientsActiveTab: () => any;
export declare const selectTodayPatientsInjections: () => any;
export declare const selectTodayPatientsFilterDate: () => any;
export declare const selectTodayPatientsShifts: () => any;
declare const todayPatientsReducer: import('redux').Reducer<TodayPatientsSliceState, import('redux').AnyAction>;
export default todayPatientsReducer;
