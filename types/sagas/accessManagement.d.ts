import { PayloadAction } from '@reduxjs/toolkit';
import { submitAccessManagementPayload } from '@store/slices/accessManagementSlice';
import { SnackType } from '@enums';
export declare function submitAccessManagementSaga({
  payload: { accessManagement, patientId, hdAccessId },
}: PayloadAction<submitAccessManagementPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/submitAccessManagementSuccess';
      payload: {};
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/getAccessManagements';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/accessManagementError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function getAccessManagementsSaga({ payload: patientId }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/getAccessManagementSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/accessManagementError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function deleteAccessManagementsSaga({
  payload: { hdAccessId, patientId },
}: PayloadAction<{
  hdAccessId: string;
  patientId: string;
}>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/getAccessManagements';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/accessManagementError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function discontinueAccessManagementsSaga({
  payload: { hdAccessId, patientId },
}: PayloadAction<{
  hdAccessId: string;
  patientId: string;
}>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/getAccessManagements';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'accessManagement/accessManagementError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function accessManagementSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
