import { PayloadAction } from '@reduxjs/toolkit';
import { AddHdPrescriptionPayload, DeleteHdPrescriptionPayload } from '@store/slices/hdPrescriptionSlice';
import { ServiceModalName, SnackType } from '@enums';
export declare function addHdPrescriptionSaga({
  payload: { hdPrescription, id },
}: PayloadAction<AddHdPrescriptionPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/addHdPrescriptionSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/getHdPrescriptionsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/addHdPrescriptionError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function viewHdPrescriptionsSaga({ payload }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/getHdPrescriptionsListSuccess';
      payload: {
        content: any;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/addHdPrescriptionsError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function deleteHdPrescriptionSaga({ payload }: PayloadAction<DeleteHdPrescriptionPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/deleteHdPrescriptionSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/getHdPrescriptionsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/addHdPrescriptionsError';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'modal/addServiceModal';
      payload: {
        name: ServiceModalName;
        payload: {
          cancelButton: null;
          confirmButton: string;
          title: string;
          text: string;
        };
      };
    }>,
  void,
  unknown
>;
export declare function getShiftDictionarySaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/getShiftDictionarySuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'hdPrescription/addHdPrescriptionError';
      payload: unknown;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function hdPrescriptionSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
