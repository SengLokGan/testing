import { PayloadAction } from '@reduxjs/toolkit';
import {
  addHdPrescription,
  addHdPrescriptionError,
  AddHdPrescriptionPayload,
  addHdPrescriptionsError,
  addHdPrescriptionSuccess,
  DeleteHdPrescriptionPayload,
  deleteHdPrescription,
  deleteHdPrescriptionSuccess,
  getHdPrescriptionsList,
  getHdPrescriptionsListSuccess,
  getShiftDictionary,
  getShiftDictionarySuccess,
  discontinueHdPrescription,
  discontinueHdPrescriptionSuccess,
  exportHdPrescription,
  exportHdPrescriptionFinish,
} from '@store/slices/hdPrescriptionSlice';
import { addSnack } from '@store/slices/snackSlice';
import { API } from '@utils';
import i18n from 'i18next';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { ServiceModalName, SnackType } from '@enums';
import { ERROR_CODES } from '@constants/global';
import { DiscontinueHdPrescriptionRequest } from '@types';
import { AxiosResponse } from 'axios';
import { getFileParamsFromHeaders } from '@utils/getFileParamsFromHeaders';
import { downloadFile } from '@utils/downloadFile';

export function* addHdPrescriptionSaga({ payload: { hdPrescription, id } }: PayloadAction<AddHdPrescriptionPayload>) {
  try {
    yield call(API.post, `/pm/patients/${id}/prescriptions`, hdPrescription);
    yield put({ type: addHdPrescriptionSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('hdPrescription:form.hdPrescriptionCreate') },
    });
    yield put({ type: getHdPrescriptionsList.type, payload: id });
  } catch (error) {
    yield put({ type: addHdPrescriptionError.type, payload: error });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Error, message: i18n.t('hdPrescription:form.updateFailed') },
    });
  }
}

export function* viewHdPrescriptionsSaga({ payload }: PayloadAction<string>) {
  try {
    const response = yield call(API.get, `pm/patients/${payload}/prescriptions`);
    yield put({
      type: getHdPrescriptionsListSuccess.type,
      payload: {
        content: response.data,
      },
    });
  } catch (error) {
    yield put({ type: addHdPrescriptionsError.type, payload: error });
  }
}
export function* deleteHdPrescriptionSaga({ payload }: PayloadAction<DeleteHdPrescriptionPayload>) {
  try {
    const { patientId } = payload;
    yield call(API.delete, `pm/patients/${patientId}/prescriptions`);
    yield put({ type: deleteHdPrescriptionSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Delete, message: i18n.t('hdPrescription:form.hdPrescriptionDelete') },
    });
    yield put({ type: getHdPrescriptionsList.type, payload: patientId });
  } catch (error: any) {
    yield put({ type: addHdPrescriptionsError.type, payload: error });
    if (error?.response?.data[0]?.code === ERROR_CODES.HD_PRESCRIPTION_CANNOT_BE_DELETED) {
      yield put({
        type: addServiceModal.type,
        payload: {
          name: ServiceModalName.ConfirmModal,
          payload: {
            cancelButton: null,
            confirmButton: i18n.t('common:button.ok'),
            title: i18n.t('hdPrescription:form.hdPrescriptionCanNotDelete'),
            text: i18n.t('hdPrescription:form.procedurePerformed'),
          },
        },
      });
    } else {
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('medications:form.updateFailed') },
      });
    }
  }
}

export function* getShiftDictionarySaga() {
  try {
    const { data } = yield call(API.get, `/pm/shifts`);
    yield put({
      type: getShiftDictionarySuccess.type,
      payload: data,
    });
  } catch (error) {
    yield put({ type: addHdPrescriptionError.type, payload: error });
  }
}

function* discontinueHdPrescriptionSaga({
  payload: { prescriptionId, patientId, ...params },
}: PayloadAction<DiscontinueHdPrescriptionRequest>) {
  try {
    yield call(API.post, `pm/patients/${patientId}/prescriptions/${prescriptionId}/discontinue`, params);
    yield put({ type: getHdPrescriptionsList.type, payload: patientId });
    yield put({ type: discontinueHdPrescriptionSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('hdPrescription:discontinueSuccess') },
    });
  } catch (error) {
    yield put({ type: addHdPrescriptionError.type, payload: error });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Error, message: i18n.t('hdPrescription:form.updateFailed') },
    });
  }
}

function* exportHdPrescriptionSaga({ payload }: PayloadAction<string>) {
  try {
    const { data, headers }: AxiosResponse<Blob> = yield call(
      API.get,
      `/pm/patients/${payload}/prescriptions/printing`,
      {
        responseType: 'blob',
      },
    );
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportHdPrescriptionFinish());
  } catch (error) {
    console.error(error);
    yield put(exportHdPrescriptionFinish());
  }
}

export function* hdPrescriptionSagaWatcher() {
  yield takeLatest(addHdPrescription.type, addHdPrescriptionSaga);
  yield takeLatest(getHdPrescriptionsList.type, viewHdPrescriptionsSaga);
  yield takeLatest(deleteHdPrescription.type, deleteHdPrescriptionSaga);
  yield takeLatest(getShiftDictionary.type, getShiftDictionarySaga);
  yield takeLatest(discontinueHdPrescription.type, discontinueHdPrescriptionSaga);
  yield takeLatest(exportHdPrescription.type, exportHdPrescriptionSaga);
}
