import { AxiosResponse } from 'axios';
import type { PatientCensusCountersResponse, PatientCensusReportResponse } from '@types';
import { PatientCensusIsolationFilter } from '@enums';
export declare function getPatientCensusReportSaga(): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').AllEffect<import('redux-saga/effects').CallEffect<unknown>>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientCensusReport/getPatientCensusReportSuccess';
      payload: {
        content: {
          patient: {
            name: string;
            id: number;
          };
          address: string;
          age: string;
          gender: string;
          race: string;
          religion: string;
          diagnosis: string;
          virology: string[];
          treatmentReferral: string;
          createdAt: string;
          status: string;
          modifiedAt: string;
          previousStatus: string;
          id: number;
          documentNumber: string;
          phone: string;
        }[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientCensusReport/setPatientCensusChipsCounters';
      payload: {
        isolations: {
          badge: string;
          name: PatientCensusIsolationFilter;
          selected: boolean;
        }[];
        statuses: {
          badge: string;
          name: import('@enums').PatientCensusStatusFilter;
          selected: boolean;
        }[];
        date: Date | null;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patientCensusReport/getPatientCensusReportError';
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
  } & [AxiosResponse<PatientCensusReportResponse, any>, AxiosResponse<PatientCensusCountersResponse, any>]
>;
export declare function patientCensusReportsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
