import { call, put, takeLatest } from 'redux-saga/effects';
import { API } from '@utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addSnack } from '@store/slices/snackSlice';
import { SnackType } from '@enums';
import i18n from 'i18next';
import type { AxiosResponse } from 'axios';
import type { Staff } from '@types';
import {
  addStaffUserError,
  changeStaffUserInfo,
  ChangeStaffUserInfoPayload,
  changeStaffUserInfoSuccess,
  getStaffUserInfo,
  getStaffUserInfoSuccess,
} from '@store/slices';
import { ERROR_CODES } from '@constants/global';

export function* getStaffUserInfoSaga({ payload: id }: PayloadAction<string>) {
  try {
    const { data: staffUserInfo }: AxiosResponse<Staff> = yield call(API.get, `/pm/users/${id}`);
    yield put(getStaffUserInfoSuccess(staffUserInfo));
  } catch (error: any) {
    yield put({ type: addStaffUserError.type, payload: error });
  }
}

function* changeStaffUserSaga({ payload: { staffUser, id } }: PayloadAction<ChangeStaffUserInfoPayload>) {
  try {
    const { data: staffUserInfo }: AxiosResponse<Staff> = yield call(API.put, `/pm/users/${id}`, staffUser);
    yield put(changeStaffUserInfoSuccess(staffUserInfo));
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('staffManagement:modal.staffUserInfoUpdated') },
    });
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
              payload: { type: SnackType.Error, message: i18n.t('staffManagement:modal.updateFailed') },
            });
        }
        yield put({ type: addStaffUserError.type, payload: err });
      }
    }
  }
}

export function* staffUserSagaWatcher() {
  yield takeLatest(getStaffUserInfo.type, getStaffUserInfoSaga);
  yield takeLatest(changeStaffUserInfo.type, changeStaffUserSaga);
}
