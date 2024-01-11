import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import isNull from 'lodash/isNull';
import {
  AppointmentsStatusesFilters,
  InjectionType,
  PatientIsolationFilterNames,
  TodayPatientsTabs,
  TodayPatientsViewMode,
} from '@enums';
import type {
  AppointmentsStatusesFilterItem,
  AppointmentsTable,
  PatientIsolationFilterItem,
  Shift,
  TodayPatientsPatientFilterType,
  TodayPatientsPlannedInjectionsResponse,
  TodayPatientsSliceState,
} from '@types';

export const todayPatientInitialState: TodayPatientsSliceState = {
  loading: false,
  injectionsLoading: false,
  error: undefined,
  appointments: [],
  filterDate: new Date(),
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
  activeTab: TodayPatientsTabs.Patients,
  viewMode: TodayPatientsViewMode.Table,
  injections: [],
  shifts: [],
  filters: {
    patient: null,
    isolation: {
      items: [
        {
          name: PatientIsolationFilterNames.normal,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hepB,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hepC,
          checked: false,
        },
        {
          name: PatientIsolationFilterNames.hiv,
          checked: false,
        },
      ],
    },
    statuses: {
      items: [
        {
          name: AppointmentsStatusesFilters.All,
          selected: true,
          badge: '0',
        },
        {
          name: AppointmentsStatusesFilters.Waitlist,
          selected: false,
          badge: '0',
        },
        {
          name: AppointmentsStatusesFilters.InProgress,
          selected: false,
          badge: '0',
        },
        {
          name: AppointmentsStatusesFilters.Complete,
          selected: false,
          badge: '0',
        },
        {
          name: AppointmentsStatusesFilters.Cancelled,
          selected: false,
          badge: '0',
        },
      ],
    },
  },
};

type TodayPatientFiltersPayload = {
  isolations?: { items: PatientIsolationFilterItem[] };
  patient?: { name: string; id: string } | null;
};
export const TodayPatientsSlice = createSlice({
  name: 'todayPatients',
  initialState: todayPatientInitialState,
  reducers: {
    getTodayPatientsAppointments(state) {
      state.loading = true;
    },
    getTodayPatientsAppointmentsSuccess: (state, { payload }: PayloadAction<AppointmentsTable>) => {
      state.appointments = payload.content;
      state.loading = false;
      state.pagination.totalCount = payload.pagination.totalCount;
      state.error = undefined;
    },
    getTodayPatientsAppointmentsError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    setTodayPatientsFilterDate: (state, { payload }: PayloadAction<Date>) => {
      state.filterDate = payload;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    changeTodayPatientsAppointmentsPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.loading = false;
    },
    changeTodayPatientsAppointmentsRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.loading = false;
    },
    changeTodayPatientsFilters: (
      state,
      { payload: { patient, isolations } }: PayloadAction<TodayPatientFiltersPayload>,
    ) => {
      state.loading = true;
      if (isolations) {
        state.filters.isolation = isolations;
      }
      if (patient || isNull(patient)) {
        // @ts-ignore
        state.filters.patient = patient;
      }
      state.pagination = todayPatientInitialState.pagination;
    },
    changeTodayPatientsStatusesFilters: (
      state,
      { payload }: PayloadAction<{ items: AppointmentsStatusesFilterItem[] }>,
    ) => {
      state.loading = true;
      state.filters.statuses = payload;
      state.pagination = todayPatientInitialState.pagination;
    },
    setTodayPatientsStatusesCounters: (
      state,
      { payload }: PayloadAction<{ items: AppointmentsStatusesFilterItem[] }>,
    ) => {
      state.filters.statuses = payload;
    },
    setTodayPatientsPatientFilter: (state, { payload }: PayloadAction<TodayPatientsPatientFilterType>) => {
      state.filters.patient = payload;
    },
    clearAllTodayPatientsFilters: (state) => {
      state.loading = true;
      state.pagination = todayPatientInitialState.pagination;
      state.filters = todayPatientInitialState.filters;
    },
    changeTodayPatientsActiveTab: (state, { payload }: PayloadAction<TodayPatientsTabs>) => {
      state.activeTab = payload;
    },
    getTodayPatientsInjections(state) {
      state.injectionsLoading = true;
    },
    getTodayPatientsInjectionsSuccess: (state, { payload }: PayloadAction<TodayPatientsPlannedInjectionsResponse>) => {
      state.injections = payload;
      state.injectionsLoading = false;
      state.error = undefined;
    },
    getTodayPatientsShifts: (state) => {
      state.loading = true;
    },
    getTodayPatientsShiftsSuccess: (state, { payload }: PayloadAction<Shift[]>) => {
      state.loading = false;
      state.shifts = payload;
    },
    updateTodayPatientsInjectionPrepared: (
      state,
      { payload }: PayloadAction<{ id: number; appointmentId: number; status: boolean; type: InjectionType }>,
    ) => {
      state.loading = true;
    },
    updateTodayPatientsInjectionPreparedSuccess: (state) => {
      state.loading = false;
    },
    changeTodayPatientsViewMode: (state, { payload }: PayloadAction<TodayPatientsViewMode>) => {
      state.viewMode = payload;
    },
  },
});

export const {
  getTodayPatientsAppointments,
  getTodayPatientsAppointmentsSuccess,
  getTodayPatientsAppointmentsError,
  changeTodayPatientsAppointmentsPage,
  setTodayPatientsFilterDate,
  changeTodayPatientsAppointmentsRowsPerPage,
  changeTodayPatientsFilters,
  clearAllTodayPatientsFilters,
  changeTodayPatientsStatusesFilters,
  setTodayPatientsStatusesCounters,
  setTodayPatientsPatientFilter,
  changeTodayPatientsActiveTab,
  getTodayPatientsInjections,
  getTodayPatientsInjectionsSuccess,
  getTodayPatientsShifts,
  getTodayPatientsShiftsSuccess,
  updateTodayPatientsInjectionPrepared,
  updateTodayPatientsInjectionPreparedSuccess,
  changeTodayPatientsViewMode,
} = TodayPatientsSlice.actions;

export const selectTodayPatientsAppointments = () => useAppSelector((state) => state.todayPatients.appointments);
export const selectTodayPatientsLoading = () => useAppSelector((state) => state.todayPatients.loading);
export const selectTodayPatientsInjectionsLoading = () =>
  useAppSelector((state) => state.todayPatients.injectionsLoading);
export const selectTodayPatientsAppointmentsPagination = () =>
  useAppSelector((state) => state.todayPatients.pagination);
export const selectTodayPatientsViewMode = () => useAppSelector((state) => state.todayPatients.viewMode);
export const selectTodayPatientsIsolatorFilters = () =>
  useAppSelector((state) => state.todayPatients.filters.isolation);
export const selectTodayPatientFilter = () => useAppSelector((state) => state.todayPatients.filters.patient);
export const selectTodayPatientsStatusesFilters = () =>
  useAppSelector((state) => state.todayPatients.filters.statuses.items);
export const selectTodayPatientsActiveTab = () => useAppSelector((state) => state.todayPatients.activeTab);
export const selectTodayPatientsInjections = () => useAppSelector((state) => state.todayPatients.injections);
export const selectTodayPatientsFilterDate = () => useAppSelector((state) => state.todayPatients.filterDate);
export const selectTodayPatientsShifts = () => useAppSelector((state) => state.todayPatients.shifts);

const todayPatientsReducer = TodayPatientsSlice.reducer;
export default todayPatientsReducer;
