import type { PayloadAction } from '@reduxjs/toolkit';
import { startOfDay, endOfDay } from 'date-fns';
import {
  AddOrEditClinicalNotePayload,
  changeClinicalNotesPage,
  changeClinicalNotesRowsPerPage,
  getClinicalNotesList,
  GetClinicalNotesListPayload,
  getClinicalNotesListSuccess,
  setClinicalNotesListError,
  addOrEditClinicalNote,
  addOrEditClinicalNoteSuccess,
  addOrEditClinicalNoteError,
  deleteClinicalNoteSuccess,
  DeleteClinicalNotePayload,
  deleteClinicalNote,
  removeDrawer,
  addSnack,
} from '@store/slices';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API } from '@utils';
import i18n from 'i18next';
import type { AxiosResponse } from 'axios';
import type { ClinicalNotesTableData } from '@types';
import { SnackType, DrawerType, CustomClinicalNoteTypes, ClinicalNoteTypes } from '@enums';

export function* addOrEditClinicalNoteSaga({
  payload: { isAdding, clinicalNote, patientId },
}: PayloadAction<AddOrEditClinicalNotePayload>) {
  try {
    const { selectedClinicalNoteId } = yield select((state) => state.clinicalNotes);
    yield call(
      API[isAdding ? 'post' : 'put'],
      `/pm/clinical-notes/${isAdding ? '' : selectedClinicalNoteId}`,
      {
        ...clinicalNote,
        patientId,
      },
      { headers: { 'multiline-fields': 'note' } },
    );
    yield put({ type: addOrEditClinicalNoteSuccess.type });
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t(isAdding ? 'clinicalNotes:form.clinicalNoteCreated' : 'clinicalNotes:form.clinicalNoteUpdated'),
      },
    });
    yield put(removeDrawer(DrawerType.ClinicalNotesForm));
    yield put(getClinicalNotesList({ patientId }));
  } catch (error) {
    yield put({ type: addOrEditClinicalNoteError.type, payload: error });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Error, message: i18n.t('hdPrescription:form.updateFailed') },
    });
  }
}

export function* deleteClinicalNoteSaga({ payload: { patientId } }: PayloadAction<DeleteClinicalNotePayload>) {
  try {
    const { selectedClinicalNoteId } = yield select((state) => state.clinicalNotes);
    yield call(API.delete, `/pm/clinical-notes/${selectedClinicalNoteId}`);
    yield put({ type: deleteClinicalNoteSuccess });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Delete, message: i18n.t('clinicalNotes:form.clinicalNoteDeleted') },
    });
    yield put(getClinicalNotesList({ patientId }));
  } catch (error) {
    yield put({ type: addOrEditClinicalNoteError.type, payload: error });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Error, message: i18n.t('common:deleteFailed') },
    });
  }
}

export function* getClinicalNotesListSaga({ payload }: PayloadAction<GetClinicalNotesListPayload>) {
  try {
    const {
      pagination: { currentPage, perPage },
      filters: { from, to, noteTypes },
    } = yield select((state) => state.clinicalNotes);
    const {
      user: { id },
    } = yield select((state) => state.user);

    const noteTypesWithoutCustomTypes = noteTypes.filter(
      (item) => !Object.keys(CustomClinicalNoteTypes).includes(item.name),
    );
    const isMyNotesSelected = noteTypes.find((item) => CustomClinicalNoteTypes[item.name]).selected;
    const selectedNoteTypes = noteTypesWithoutCustomTypes.filter((item) => item.selected);
    const noteTypesToSend = selectedNoteTypes.map((filteredItem) => ClinicalNoteTypes[filteredItem.name]);

    const filtersToSend = {
      from: from ? startOfDay(from) : null,
      to: to ? endOfDay(to) : null,
      types: noteTypesToSend,
    };

    const { data }: AxiosResponse<ClinicalNotesTableData> = yield call(
      API.post,
      '/pm/clinical-notes/search',
      {
        ...filtersToSend,
        patientId: payload.patientId,
        userId: isMyNotesSelected ? id : null,
      },
      { params: { page: currentPage, size: perPage } },
    );
    yield put({
      type: getClinicalNotesListSuccess.type,
      payload: data,
    });
  } catch (error) {
    yield put({ type: setClinicalNotesListError.type, payload: error });
  }
}

export function* clinicalNotesSagaWatcher() {
  yield takeLatest(addOrEditClinicalNote.type, addOrEditClinicalNoteSaga);
  yield takeLatest(
    [getClinicalNotesList.type, changeClinicalNotesPage.type, changeClinicalNotesRowsPerPage.type],
    getClinicalNotesListSaga,
  );
  yield takeLatest(deleteClinicalNote.type, deleteClinicalNoteSaga);
}
