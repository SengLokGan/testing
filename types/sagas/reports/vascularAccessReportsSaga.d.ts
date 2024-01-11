import { AxiosResponse } from 'axios';
import { ChipsCountersSumNames } from '@enums';
import type { VascularAccessChipsCountersResponse, VascularAccessReportsResponse } from '@types';
export declare function getVascularAccessReportsSaga(): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<unknown>>
  | import('redux-saga/effects').PutEffect<{
      type: 'vascularAccessReport/getVascularAccessReportsSuccess';
      payload: {
        content: {
          vaCreationDate: string;
          category: string;
          vaType: string;
          cvcCategory: string;
          side: string;
          vaNeedleType: string;
          vaNeedleSizeA: string;
          vaNeedleSizeV: string;
          cvcInstillation: string;
          patient: {
            id: number;
            name: string;
          };
          vaCreationPerson: string;
          vaCreatedPlace: string;
          comments: string;
        }[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vascularAccessReport/setVascularAccessChipsCounters';
      payload: {
        accessTypes: {
          badge: string;
          name: import('@enums').VascularAccessType | ChipsCountersSumNames.vascular;
          selected: boolean;
        }[];
        categories: {
          badge: string;
          selected: boolean;
          name: import('@enums').CvcTimeCategory | ChipsCountersSumNames.cvc;
        }[];
        date: Date | null;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vascularAccessReport/getVascularAccessReportsError';
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
  } & [AxiosResponse<VascularAccessReportsResponse, any>, AxiosResponse<VascularAccessChipsCountersResponse, any>]
>;
export declare function vascularAccessReportsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
