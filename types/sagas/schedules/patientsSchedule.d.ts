import { PayloadAction } from '@reduxjs/toolkit';
export declare function getShiftListSaga(): Generator<
  import('redux-saga/effects').CallEffect<unknown>,
  any,
  {
    data: any;
  }
>;
export declare function getIsolationGroupsListSaga(): Generator<
  import('redux-saga/effects').CallEffect<unknown>,
  any,
  {
    data: any;
  }
>;
export declare function getAppointmentsListSaga(): Generator<
  import('redux-saga/effects').CallEffect<unknown> | import('redux-saga/effects').SelectEffect,
  any,
  {
    data: any;
  }
>;
export declare function getInitPatientScheduleDataSaga(): Generator<
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<any>>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getIsolationGroupsListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getAppointmentsListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getShiftListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getDayTasksSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: import('@reduxjs/toolkit').ActionCreatorWithPayload<
        import('@types').IsoGroupAvailability[],
        'patientsSchedule/getDayAvailabilitySuccess'
      >;
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/setPatientsScheduleError';
      payload: Error;
    }>,
  void,
  [any, any, any, any, any]
>;
export declare function updateAppointmentsSaga(): Generator<
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<any>>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getAppointmentsListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/getDayTasksSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: import('@reduxjs/toolkit').ActionCreatorWithPayload<
        import('@types').IsoGroupAvailability[],
        'patientsSchedule/getDayAvailabilitySuccess'
      >;
      payload: any;
    }>,
  void,
  [any, any, any]
>;
export declare function getAppointmentServicesSaga({ payload: appointmentId }: PayloadAction<number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/setAppointmentServices';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientsSchedule/setPatientsScheduleError';
      payload: Error;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function patientsScheduleSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
