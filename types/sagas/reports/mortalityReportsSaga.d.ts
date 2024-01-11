import { MortalityReportResponse } from '@types';
import { AxiosResponse } from 'axios';
export declare function getMortalityReportSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      type: 'mortalityReports/getMortalityReportSuccess';
      payload: {
        content: import('@types').MortalityReportsContentItem[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'mortalityReports/setMortalityReportError';
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
  } & AxiosResponse<MortalityReportResponse, any>
>;
export declare function mortalityReportsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
