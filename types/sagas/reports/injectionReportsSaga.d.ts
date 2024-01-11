import { InjectionReportResponse } from '@types';
import { AxiosResponse } from 'axios';
export declare function getInjectionReportSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: import('@store/slices').InjectionReportPayload;
      type: 'injectionReports/getInjectionReportSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'injectionReports/setInjectionReportError';
      payload: string;
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
  } & AxiosResponse<InjectionReportResponse, any>
>;
export declare function injectionReportsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
