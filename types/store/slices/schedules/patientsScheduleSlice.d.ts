import { PayloadAction } from '@reduxjs/toolkit';
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
export interface RescheduleHdPayload extends RescheduleHdPrescriptionRequest {
  appointmentId: string;
  place?: AppointmentEventPlace;
}
export interface RescheduleSlaveServicesPayload extends RescheduleSlaveServicesRequest {
  appointmentId: string;
  place?: AppointmentEventPlace;
}
export declare const patientsScheduleSlice: import('@reduxjs/toolkit').Slice<
  PatientsScheduleSliceState,
  {
    setScheduleDate: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<Date>,
    ) => void;
    getInitPatientScheduleData: () => void;
    getShiftList: () => void;
    getIsolationGroupsList: () => void;
    getAppointmentsList: () => void;
    updateAppointments: (state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>) => void;
    getShiftListSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<ShiftsResponse>,
    ) => void;
    getIsolationGroupsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<IsolationGroupsSummaryResponse>,
    ) => void;
    getAppointmentsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<AppointmentsSchedulesResponse>,
    ) => void;
    getDayTasksSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<QuarterlyBloodTestEvent[]>,
    ) => void;
    setPatientsScheduleError: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    getAppointmentServices: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      payload: PayloadAction<number>,
    ) => void;
    setAppointmentServices: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<ShortServices>,
    ) => void;
    resetAppointmentServices: (state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>) => void;
    rescheduleHdPrescription: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<RescheduleHdPayload>,
    ) => void;
    rescheduleSlaveServices: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<RescheduleSlaveServicesPayload>,
    ) => void;
    rescheduleSuccess: (state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>) => void;
    saveAddHocEvent: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<AddHocEventFormType>,
    ) => void;
    saveAddHocEventSuccess: (state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>) => void;
    getPatientActiveHd: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getPatientActiveHdSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<any>,
    ) => void;
    resetPatientActiveHd: (state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>) => void;
    getDayAvailabilitySuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientsScheduleSliceState>,
      { payload }: PayloadAction<IsoGroupAvailability[]>,
    ) => void;
  },
  'patientsSchedule'
>;
export declare const setScheduleDate: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Date,
    'patientsSchedule/setScheduleDate'
  >,
  getShiftList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/getShiftList'>,
  setPatientsScheduleError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'patientsSchedule/setPatientsScheduleError'
  >,
  getShiftListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ShiftsResponse,
    'patientsSchedule/getShiftListSuccess'
  >,
  getInitPatientScheduleData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/getInitPatientScheduleData'>,
  getIsolationGroupsList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/getIsolationGroupsList'>,
  getIsolationGroupsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    IsolationGroupsSummaryResponse,
    'patientsSchedule/getIsolationGroupsListSuccess'
  >,
  getAppointmentsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AppointmentsSchedulesResponse,
    'patientsSchedule/getAppointmentsListSuccess'
  >,
  getAppointmentsList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/getAppointmentsList'>,
  updateAppointments: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/updateAppointments'>,
  getAppointmentServices: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'patientsSchedule/getAppointmentServices'
  >,
  resetAppointmentServices: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/resetAppointmentServices'>,
  setAppointmentServices: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ShortServices,
    'patientsSchedule/setAppointmentServices'
  >,
  rescheduleHdPrescription: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    RescheduleHdPayload,
    'patientsSchedule/rescheduleHdPrescription'
  >,
  rescheduleSlaveServices: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    RescheduleSlaveServicesPayload,
    'patientsSchedule/rescheduleSlaveServices'
  >,
  rescheduleSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/rescheduleSuccess'>,
  getDayTasksSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    QuarterlyBloodTestEvent[],
    'patientsSchedule/getDayTasksSuccess'
  >,
  saveAddHocEvent: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AddHocEventFormType,
    'patientsSchedule/saveAddHocEvent'
  >,
  saveAddHocEventSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/saveAddHocEventSuccess'>,
  getPatientActiveHd: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'patientsSchedule/getPatientActiveHd'
  >,
  getPatientActiveHdSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    any,
    'patientsSchedule/getPatientActiveHdSuccess'
  >,
  resetPatientActiveHd: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patientsSchedule/resetPatientActiveHd'>,
  getDayAvailabilitySuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    IsoGroupAvailability[],
    'patientsSchedule/getDayAvailabilitySuccess'
  >;
export declare const selectScheduleDate: () => any;
export declare const selectShifts: () => any;
export declare const selectIsolationsGroup: () => any;
export declare const selectAppointments: () => any;
export declare const selectScheduleLoading: () => any;
export declare const selectAppointmentServices: () => any;
export declare const selectDayTasks: () => any;
export declare const selectPatientActiveHd: () => any;
export declare const selectCurrentDayAvailabilityShifts: () => any;
declare const patientsScheduleReducer: import('redux').Reducer<PatientsScheduleSliceState, import('redux').AnyAction>;
export default patientsScheduleReducer;
