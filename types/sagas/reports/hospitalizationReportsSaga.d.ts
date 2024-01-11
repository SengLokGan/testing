import { HospitalizationReportCountersResponse, HospitalizationReportResponse } from '@types';
import { AxiosResponse } from 'axios';
export declare function getHospitalizationReportSaga(): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<unknown>>
  | import('redux-saga/effects').PutEffect<{
      type: 'hospitalizationReports/getHospitalizationReportsSuccess';
      payload: {
        content: {
          reason: string;
          id: number;
          patient: {
            id: number;
            name: string;
          };
          date: string;
          returningDate: string;
          details: string;
          clinic: string;
          comment: string;
        }[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hospitalizationReports/setHospitalizationChipsCounters';
      payload: import('@types').HospitalizationReportFilters;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hospitalizationReports/setHospitalizationReportsError';
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
  } & [AxiosResponse<HospitalizationReportResponse, any>, AxiosResponse<HospitalizationReportCountersResponse, any>]
>;
export declare function hospitalizationReportsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
