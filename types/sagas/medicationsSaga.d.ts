import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddMedicationPayload,
  EditMedicationPayload,
  DeleteMedicationPayload,
  ChangeMedicationPayload,
} from '@store/slices';
import { ServiceModalName, SnackType } from '@enums';
import type { DiscontinueMedicationRequest } from '@types';
export declare function getMedicationsSaga({ payload }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsListSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsListError';
      payload: unknown;
    }>,
  void,
  {
    data: any;
  }
>;
export declare function addMedicationSaga({
  payload: { medication, id },
}: PayloadAction<AddMedicationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/addMedicationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/addMedicationError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function editMedicationSaga({
  payload: { medication, id, medicationId, type },
}: PayloadAction<EditMedicationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/editMedicationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/addMedicationError';
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
          text: null;
        };
      };
    }>,
  void,
  unknown
>;
export declare function deleteMedicationSaga({
  payload: { id, medicationId },
}: PayloadAction<DeleteMedicationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/deleteMedicationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/deleteMedicationError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function discontinueMedicationSaga({
  payload: { patientId, medicationId, ...payload },
}: PayloadAction<DiscontinueMedicationRequest>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/discontinueMedicationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsList';
      payload: string;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/discontinueMedicationError';
      payload: unknown;
    }>,
  void,
  unknown
>;
export declare function changeMedicationSaga({
  payload: { addMedicationData, discontinueMedicationData },
}: PayloadAction<ChangeMedicationPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/changeMedicationSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/changeMedicationError';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'medications/getMedicationsList';
      payload: string;
    }>,
  void,
  unknown
>;
export declare function medicationSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
