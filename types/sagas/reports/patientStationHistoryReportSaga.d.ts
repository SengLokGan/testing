import { PatientStationHistoryReportResponse } from '@types';
import { AxiosResponse } from 'axios';
export declare function getPatientStationHistoryReportSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').PatientStationHistoryReportPayload;
      type: 'patientStationHistoryReport/getPatientStationHistoryReportSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientStationHistoryReport/setPatientStationHistoryReportError';
      payload: Error;
    }>,
  void,
  {
    pagination: {
      currentPage: any;
      perPage: any;
    };
    reports: {
      filters: any;
    };
  } & AxiosResponse<PatientStationHistoryReportResponse, any>
>;
export declare function patientStationHistoryReportSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
