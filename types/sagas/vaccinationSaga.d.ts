import { PayloadAction } from '@reduxjs/toolkit';
import { AddVaccinationPayload, DeleteVaccinationPayload, EditVaccinationPayload } from '@store/slices';
import { SnackType } from '@enums';
export declare function getVaccinationsSaga({ payload }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/getVaccinationsListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/addVaccinationError';
      payload: unknown;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function addVaccinationSaga({
  payload: { vaccination, id },
}: PayloadAction<AddVaccinationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/addVaccinationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/getVaccinationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/addVaccinationError';
      payload: any;
    }>,
  void,
  unknown
>;
export declare function editVaccinationSaga({
  payload: { vaccination, id, vaccinationId },
}: PayloadAction<EditVaccinationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/editVaccinationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/getVaccinationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/addVaccinationError';
      payload: any;
    }>,
  void,
  unknown
>;
export declare function deleteVaccinationSaga({
  payload: { id, vaccinationId, status },
}: PayloadAction<DeleteVaccinationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/deleteVaccinationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/getVaccinationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'vaccination/addVaccinationError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function vaccinationSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
