import type { AxiosResponse } from 'axios';
import type { AppointmentsResponse, AppointmentsStatusesFilterCountersResponse } from '@types';
import { AppointmentsStatusesFilters } from '@enums';
export declare function filterTodayPatientsSaga(): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<unknown>>
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'todayPatients/getTodayPatientsInjections';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'todayPatients/getTodayPatientsAppointmentsSuccess';
      payload: {
        content: {
          name: {
            id: number;
            name: string;
            photoPath: string;
          };
          isolation: string[] | null;
          hdProgress: {
            patientId: number;
            appointmentId: number;
          };
          status:
            | import('@enums').DialysisStatus
            | import('@enums').AppointmentStatus.Waiting
            | import('@enums').AppointmentStatus.CheckedIn
            | import('@enums').AppointmentStatus.Cancelled;
          id: number;
          dialysisId: number;
          bay: string;
          startTime: Date;
          endTime: Date;
          duration: number;
          patientStatus: import('@enums').PatientStatuses;
          specialNotes: import('@enums').SpecialNote[];
        }[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'todayPatients/setTodayPatientsStatusesCounters';
      payload: {
        items: {
          badge: string;
          name: AppointmentsStatusesFilters;
          selected: boolean;
        }[];
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'todayPatients/getTodayPatientsAppointmentsError';
    }>,
  void,
  {
    pagination: {
      currentPage: any;
      perPage: any;
    };
    filterDate: any;
    filters: any;
    activeTab: any;
  } & [AxiosResponse<AppointmentsResponse, any>, AxiosResponse<AppointmentsStatusesFilterCountersResponse, any>]
>;
export declare function todayPatientsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
