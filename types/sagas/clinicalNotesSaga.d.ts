import type { PayloadAction } from '@reduxjs/toolkit';
import { AddOrEditClinicalNotePayload, GetClinicalNotesListPayload, DeleteClinicalNotePayload } from '@store/slices';
import type { AxiosResponse } from 'axios';
import type { ClinicalNotesTableData } from '@types';
import { SnackType, DrawerType } from '@enums';
export declare function addOrEditClinicalNoteSaga({
  payload: { isAdding, clinicalNote, patientId },
}: PayloadAction<AddOrEditClinicalNotePayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/removeDrawer';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalNotes/addOrEditClinicalNoteSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: GetClinicalNotesListPayload;
      type: 'clinicalNotes/getClinicalNotesList';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalNotes/addOrEditClinicalNoteError';
      payload: unknown;
    }>,
  void,
  {
    selectedClinicalNoteId: any;
  }
>;
export declare function deleteClinicalNoteSaga({
  payload: { patientId },
}: PayloadAction<DeleteClinicalNotePayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: GetClinicalNotesListPayload;
      type: 'clinicalNotes/getClinicalNotesList';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalNotes/deleteClinicalNoteSuccess'>;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalNotes/addOrEditClinicalNoteError';
      payload: unknown;
    }>,
  void,
  {
    selectedClinicalNoteId: any;
  }
>;
export declare function getClinicalNotesListSaga({ payload }: PayloadAction<GetClinicalNotesListPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalNotes/getClinicalNotesListSuccess';
      payload: ClinicalNotesTableData;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'clinicalNotes/setClinicalNotesListError';
      payload: unknown;
    }>,
  void,
  {
    pagination: {
      currentPage: any;
      perPage: any;
    };
    filters: {
      from: any;
      to: any;
      noteTypes: any;
    };
  } & {
    user: {
      id: any;
    };
  } & AxiosResponse<ClinicalNotesTableData, any>
>;
export declare function clinicalNotesSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
