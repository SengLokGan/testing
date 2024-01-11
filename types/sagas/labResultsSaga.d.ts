import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
export declare function labResultsSaga({ type, payload }: PayloadAction<any>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: import('../types').LabResultsListResponse;
      type: 'labResults/getLabResultsListSuccess';
    }>,
  void,
  {
    from: any;
    to: any;
    procedure: any;
    labName: any;
  }
>;
export declare function labResultsAssistanceSaga({
  type,
}: PayloadAction<{
  type: string;
}>): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: string | number;
      type: 'labResults/getLabResultsList';
    }>,
  void,
  unknown
>;
export declare function exportLabResultsSaga({ payload }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'labResults/exportLabResultsFinish';
    }>,
  void,
  {
    from: any;
    to: any;
    procedure: any;
    labName: any;
  } & {
    data: any;
    headers: any;
  }
>;
export declare function exportLabResultSaga({ payload }: PayloadAction<number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'labResults/exportLabResultsFinish';
    }>,
  void,
  AxiosResponse<Blob, any>
>;
export declare function labResultsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
