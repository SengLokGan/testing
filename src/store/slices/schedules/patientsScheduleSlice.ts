import sortBy from 'lodash/sortBy';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import {
  AppointmentsSchedulesResponse,
  IsolationGroupsSummaryResponse,
  PatientsScheduleSliceState,
  ShiftsResponse,
  ShortServices,
  RescheduleHdPrescriptionRequest,
  RescheduleSlaveServicesRequest,
  QuarterlyBloodTestEvent,
  AddHocEventFormType,
  IsoGroupAvailability,
} from '@types';
import { AppointmentEventPlace } from '@enums/global';

const initialState: PatientsScheduleSliceState = {
  loading: false,
  error: null,
  scheduleDate: new Date(),
  shifts: [],
  isolationsGroup: [],
  appointments: [],
  dayTasks: [],
  services: null,
  patientActiveHd: null,
  currentDayAvailabilityShifts: [],
};

export interface RescheduleHdPayload extends RescheduleHdPrescriptionRequest {
  appointmentId: string;
  place?: AppointmentEventPlace;
}

export interface RescheduleSlaveServicesPayload extends RescheduleSlaveServicesRequest {
  appointmentId: string;
  place?: AppointmentEventPlace;
}

export const patientsScheduleSlice = createSlice({
  name: 'patientsSchedule',
  initialState,
  reducers: {
    setScheduleDate: (state, { payload }: PayloadAction<Date>) => {
      state.scheduleDate = payload;
      state.appointments = [];
      state.dayTasks = [];
      state.loading = true;
    },
    getInitPatientScheduleData: () => {},
    getShiftList: () => {},
    getIsolationGroupsList: () => {},
    getAppointmentsList: () => {},
    updateAppointments: (state) => {
      state.loading = true;
    },
    getShiftListSuccess: (state, { payload }: PayloadAction<ShiftsResponse>) => {
      state.shifts = sortBy(payload, 'timeStart');
    },
    getIsolationGroupsListSuccess: (state, { payload }: PayloadAction<IsolationGroupsSummaryResponse>) => {
      state.isolationsGroup = payload;
    },
    getAppointmentsListSuccess: (state, { payload }: PayloadAction<AppointmentsSchedulesResponse>) => {
      state.appointments = payload;
      state.loading = false;
    },
    getDayTasksSuccess: (state, { payload }: PayloadAction<QuarterlyBloodTestEvent[]>) => {
      state.dayTasks = payload;
      state.loading = false;
    },
    setPatientsScheduleError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    getAppointmentServices: (state, payload: PayloadAction<number>) => {},
    setAppointmentServices: (state, { payload }: PayloadAction<ShortServices>) => {
      state.services = payload;
    },
    resetAppointmentServices: (state) => {
      state.services = null;
    },
    rescheduleHdPrescription: (state, { payload }: PayloadAction<RescheduleHdPayload>) => {
      state.loading = true;
    },
    rescheduleSlaveServices: (state, { payload }: PayloadAction<RescheduleSlaveServicesPayload>) => {
      state.loading = true;
    },
    rescheduleSuccess: (state) => {
      state.loading = false;
    },
    saveAddHocEvent: (state, { payload }: PayloadAction<AddHocEventFormType>) => {
      state.loading = true;
    },
    saveAddHocEventSuccess: (state) => {
      state.loading = false;
    },
    getPatientActiveHd: (state, { payload }: PayloadAction<string>) => {},
    getPatientActiveHdSuccess: (state, { payload }: PayloadAction<any>) => {
      state.patientActiveHd = payload;
    },
    resetPatientActiveHd: (state) => {
      state.patientActiveHd = null;
    },
    getDayAvailabilitySuccess: (state, { payload }: PayloadAction<IsoGroupAvailability[]>) => {
      state.currentDayAvailabilityShifts = payload;
    },
  },
});

export const {
  setScheduleDate,
  getShiftList,
  setPatientsScheduleError,
  getShiftListSuccess,
  getInitPatientScheduleData,
  getIsolationGroupsList,
  getIsolationGroupsListSuccess,
  getAppointmentsListSuccess,
  getAppointmentsList,
  updateAppointments,
  getAppointmentServices,
  resetAppointmentServices,
  setAppointmentServices,
  rescheduleHdPrescription,
  rescheduleSlaveServices,
  rescheduleSuccess,
  getDayTasksSuccess,
  saveAddHocEvent,
  saveAddHocEventSuccess,
  getPatientActiveHd,
  getPatientActiveHdSuccess,
  resetPatientActiveHd,
  getDayAvailabilitySuccess,
} = patientsScheduleSlice.actions;

export const selectScheduleDate = () => useAppSelector((state) => state.patientsSchedule.scheduleDate);
export const selectShifts = () => useAppSelector((state) => state.patientsSchedule.shifts);
export const selectIsolationsGroup = () => useAppSelector((state) => state.patientsSchedule.isolationsGroup);
export const selectAppointments = () => useAppSelector((state) => state.patientsSchedule.appointments);
export const selectScheduleLoading = () => useAppSelector((state) => state.patientsSchedule.loading);
export const selectAppointmentServices = () => useAppSelector((state) => state.patientsSchedule.services);
export const selectDayTasks = () => useAppSelector((state) => state.patientsSchedule.dayTasks);
export const selectPatientActiveHd = () => useAppSelector((state) => state.patientsSchedule.patientActiveHd);
export const selectCurrentDayAvailabilityShifts = () =>
  useAppSelector((state) => state.patientsSchedule.currentDayAvailabilityShifts);

const patientsScheduleReducer = patientsScheduleSlice.reducer;
export default patientsScheduleReducer;
