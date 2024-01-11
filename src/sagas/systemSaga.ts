import i18n from 'i18next';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchNotificationContinuously,
  systemAddError,
  systemUpdateNetworkConnection,
  systemUpdatePageFocus,
  SystemUpdatePageFocusPayload,
} from '@store/slices/systemSlice';
import { addSnack } from '@store/slices/snackSlice';
import { GET_NEW_NOTIFICATION_DELAY } from '@constants';
import { fetchNotifications } from '@store/slices/notificationSlice';
import { SnackType } from '@enums';
import { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { logOut, setAppLoading } from '@store/slices';
import { ACTIVITY_TIMEOUT, TOKEN_EXPIRATION_TIME, updateToken } from '@sagas/userSaga';

export function* checkTokenAfterInactivitySaga({ payload: { isActive } }: PayloadAction<SystemUpdatePageFocusPayload>) {
  try {
    if (isActive) {
      yield put({ type: setAppLoading.type, payload: true });
      try {
        const { access_token, lastActivityTimeStamp, lastPageActivityTimeStamp } = localStorage;
        if (
          (lastActivityTimeStamp && new Date().getTime() - +lastActivityTimeStamp > ACTIVITY_TIMEOUT) ||
          (lastPageActivityTimeStamp && new Date().getTime() - +lastPageActivityTimeStamp > ACTIVITY_TIMEOUT)
        ) {
          yield put({ type: logOut.type });
        } else {
          const decoded: any = jwt_decode(access_token);
          const time_exp = decoded.exp;
          if (time_exp - new Date().getTime() / 1000 < TOKEN_EXPIRATION_TIME) {
            yield call(updateToken);
          }
        }
      } catch (e) {
        yield put({ type: logOut.type });
      }
      localStorage.removeItem('lastPageActivityTimeStamp');
      yield put({ type: setAppLoading.type, payload: false });
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setAppLoading.type, payload: false });
      yield put(systemAddError(error));
    } else {
      console.error(error);
    }
  }
}

export function* updateNetworkConnectionSaga() {
  const isBackOnline = yield select((state) => state.system.networkConnection.backOnline);

  try {
    yield put(
      addSnack(
        isBackOnline
          ? { type: SnackType.Success, message: i18n.t('connectionRestored'), clear: true }
          : { type: SnackType.Error, message: i18n.t('noConnection') },
      ),
    );
    if (isBackOnline) {
      yield put({ type: systemUpdatePageFocus.type, payload: { isActive: true } });
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(systemAddError(error));
    } else {
      console.error(error);
    }
  }
}

export function* fetchNotificationContinuouslySaga() {
  const pageIsActive = yield select((state) => state.system?.page?.isActive);
  const branchId = yield select((state) => state.user.user.currentBranchId);

  if (pageIsActive && branchId) {
    yield put({ type: fetchNotifications.type });
  }
  yield delay(GET_NEW_NOTIFICATION_DELAY);
  yield put({ type: fetchNotificationContinuously.type });
}

export function* systemSagaTakeEvery() {
  yield takeLatest(systemUpdatePageFocus.type, checkTokenAfterInactivitySaga);
  yield takeLatest(systemUpdateNetworkConnection.type, updateNetworkConnectionSaga);
  yield takeLatest(fetchNotificationContinuously.type, fetchNotificationContinuouslySaga);
}
