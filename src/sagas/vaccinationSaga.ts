import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addSnack,
  addVaccination,
  addVaccinationError,
  AddVaccinationPayload,
  addVaccinationSuccess,
  deleteVaccination,
  DeleteVaccinationPayload,
  deleteVaccinationSuccess,
  editVaccination,
  EditVaccinationPayload,
  editVaccinationSuccess,
  exportVaccination,
  exportVaccinationFinish,
  getVaccinationsList,
  getVaccinationsListSuccess,
} from '@store/slices';
import { API } from '@utils';
import i18n from 'i18next';
import { SnackType } from '@enums';
import { AxiosResponse } from 'axios';
import { getFileParamsFromHeaders } from '@utils/getFileParamsFromHeaders';
import { downloadFile } from '@utils/downloadFile';
import { ERROR_CODES } from '@constants/global';

export function* getVaccinationsSaga({ payload }: PayloadAction<string>) {
  try {
    const { data: vaccinations } = yield call(API.get, `pm/patients/${payload}/vaccinations`);
    yield put({
      type: getVaccinationsListSuccess.type,
      payload: vaccinations,
    });
  } catch (error) {
    yield put({ type: addVaccinationError.type, payload: error });
  }
}

export function* addVaccinationSaga({ payload: { vaccination, id } }: PayloadAction<AddVaccinationPayload>) {
  try {
    yield call(API.post, `/pm/patients/${id}/vaccinations`, vaccination);
    yield put({ type: addVaccinationSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('vaccination:form.vaccinationCreated') },
    });
    yield put({ type: getVaccinationsList.type, payload: id });
  } catch (error: any) {
    if (error?.response?.data.length) {
      for (let err of error.response.data) {
        switch (err?.code) {
          case ERROR_CODES.S3_ANTIVIRUS_ERROR:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('common:fileUpload.hasNotBeenChecked') },
            });
            break;
          case ERROR_CODES.S3_FILE_IS_NOT_FOUND:
            break;
          default:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('vaccination:form.updateFailed') },
            });
        }
        yield put({ type: addVaccinationError.type, payload: err });
      }
    }
  }
}
export function* editVaccinationSaga({
  payload: { vaccination, id, vaccinationId },
}: PayloadAction<EditVaccinationPayload>) {
  try {
    yield call(API.put, `/pm/patients/${id}/vaccinations/${vaccinationId}`, vaccination);
    yield put({ type: editVaccinationSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('vaccination:form.vaccinationUpdated') },
    });
    yield put({ type: getVaccinationsList.type, payload: id });
  } catch (error: any) {
    if (error?.response?.data.length) {
      for (let err of error.response.data) {
        switch (err?.code) {
          case ERROR_CODES.S3_ANTIVIRUS_ERROR:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('common:fileUpload.hasNotBeenChecked') },
            });
            break;
          case ERROR_CODES.S3_FILE_IS_NOT_FOUND:
            break;
          default:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('vaccination:form.updateFailed') },
            });
        }
        yield put({ type: addVaccinationError.type, payload: err });
      }
    }
  }
}

export function* deleteVaccinationSaga({
  payload: { id, vaccinationId, status },
}: PayloadAction<DeleteVaccinationPayload>) {
  try {
    yield call(API.delete, `/pm/patients/${id}/vaccinations/${vaccinationId}`, { params: { status } });
    yield put({ type: deleteVaccinationSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Delete, message: i18n.t('vaccination:vaccinationDeleted') },
    });
    yield put({ type: getVaccinationsList.type, payload: id });
  } catch (error) {
    yield put({ type: addVaccinationError.type, payload: error });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Error, message: i18n.t('vaccination:form.updateFailed') },
    });
  }
}

function* exportVaccinationSaga({ payload }: PayloadAction<string>) {
  try {
    const { data, headers }: AxiosResponse<Blob> = yield call(
      API.get,
      `/pm/patients/${payload}/vaccinations/printing`,
      {
        responseType: 'blob',
      },
    );
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportVaccinationFinish());
  } catch (error) {
    console.error(error);
    yield put(exportVaccinationFinish());
  }
}

export function* vaccinationSagaWatcher() {
  yield takeLatest(getVaccinationsList.type, getVaccinationsSaga);
  yield takeLatest(addVaccination.type, addVaccinationSaga);
  yield takeLatest(editVaccination.type, editVaccinationSaga);
  yield takeLatest(deleteVaccination.type, deleteVaccinationSaga);
  yield takeLatest(exportVaccination.type, exportVaccinationSaga);
}
