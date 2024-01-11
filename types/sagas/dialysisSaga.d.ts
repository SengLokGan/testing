import { PayloadAction } from '@reduxjs/toolkit';
import { IndexedDbStorage } from '@services';
import { EditHdReadingPayload } from '@store/slices/dialysisSlice';
import type { HdProgressRecordWithOperation } from '@types';
export declare function editHdReadingSaga({ payload }: PayloadAction<EditHdReadingPayload>): Generator<
  | Promise<any>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      type: 'dialysis/editDialysisHdReadingSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'dialysis/addDialysisError';
      payload: unknown;
    }>,
  void,
  IndexedDbStorage<HdProgressRecordWithOperation> & [any]
>;
export declare function deleteHdReadingSaga({ payload }: PayloadAction<number>): Generator<
  | Promise<any>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      type: 'dialysis/deleteDialysisHdReadingSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'dialysis/addDialysisError';
      payload: unknown;
    }>,
  void,
  IndexedDbStorage<Partial<HdProgressRecordWithOperation>> & HdProgressRecordWithOperation[]
>;
export declare function getServicesSaga(appointmentId: any): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'dialysis/getServicesSuccess';
      payload: any;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function dialysisSagaWatcher(): Generator<import('redux-saga/effects').ForkEffect<never>, void, unknown>;
