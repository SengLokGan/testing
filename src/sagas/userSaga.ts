import { AxiosResponse } from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {
  checkActivity,
  fetchTokenContinuously,
  fetchTokenContinuouslyError,
  fetchTokenContinuouslySuccess,
  getUserSummary,
  getUserSummarySuccess,
  logOut,
  setBranch,
  setError,
} from '@store/slices/userSlice';
import { API, getStorageInitData, setHeaders } from '../utils';
import { LocationBrowserStorage } from '../services';
import type { RefreshTokenResponse, TokenResponse, User } from '@types';
import { appInitSuccess } from '@store/slices/initSlice';
import { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@constants';
import { Headers } from '@enums';
import { getTodayPatientsAppointments } from '@store/slices/todayPatientsSlice';
import { fetchNotificationContinuously } from '@store/slices/systemSlice';
import { clearStorageDataBeforeLogout } from '@utils/clearStorageDataBeforeLogout';

export const ACTIVITY_TIMEOUT = 2400000;
const ACTIVITY_CHECK_FREQUENCY = 60000;
export const TOKEN_EXPIRATION_TIME = 600;
const TOKEN_CHECK_FREQUENCY = 600000;
const browserHistory = new LocationBrowserStorage();

export function* updateToken() {
  const { clientId, authUrl } = yield getStorageInitData();
  const { refresh_token } = localStorage;
  const response: AxiosResponse<RefreshTokenResponse> = yield call(
    API.post,
    '',
    new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refresh_token,
    }),
    {
      baseURL: `${authUrl}/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: (data, headers) => {
        delete headers?.common;
        return data;
      },
    },
  );
  const newToken = response.data.access_token;
  localStorage.setItem('access_token', newToken);
  setHeaders({ [Headers.Authorization]: newToken });
}

export function* fetchContinuouslySaga() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const initData = yield getStorageInitData();

    if (initData) {
      if (!localStorage.access_token && !code) {
        return window.location.replace(initData.logInUrl);
      }

      if (localStorage.access_token) {
        try {
          const { access_token } = localStorage;
          const decoded: any = jwt_decode(access_token);
          const time_exp = decoded.exp;
          if (time_exp - new Date().getTime() / 1000 < TOKEN_EXPIRATION_TIME) {
            yield call(updateToken);
          }
        } catch (e) {
          yield call(logOutSaga);
        }
      } else {
        const response: AxiosResponse<TokenResponse> = yield call(
          API.post,
          '',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: initData.clientId,
            redirect_uri: window.location.origin,
            code: code!,
          }),
          {
            baseURL: `${initData?.authUrl}/oauth2/token`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            transformRequest: (data, headers) => {
              delete headers?.common;
              return data;
            },
          },
        );

        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        setHeaders({ [Headers.Authorization]: access_token });
      }
      yield put({ type: fetchTokenContinuouslySuccess.type });
    }

    window.history.replaceState(null, '', window.location.pathname);
    browserHistory.reset(location.pathname);
    yield delay(TOKEN_CHECK_FREQUENCY);
    yield put({ type: fetchTokenContinuously.type });
  } catch (e) {
    yield put({ type: fetchTokenContinuouslyError.type });
  }
}

export function* checkUserActivitySaga() {
  const lastActivityTimeStamp = localStorage.getItem('lastActivityTimeStamp');

  if (lastActivityTimeStamp && new Date().getTime() - +lastActivityTimeStamp > ACTIVITY_TIMEOUT) {
    yield call(logOutSaga);
  }
  yield delay(ACTIVITY_CHECK_FREQUENCY);
  yield put({ type: checkActivity.type });
}

function* logOutSaga() {
  const initData = yield getStorageInitData();
  browserHistory.clear();
  clearStorageDataBeforeLogout();
  if (initData) {
    window.location.replace(initData.logOutUrl);
  }
  window.location.replace('/');
}

export function* getUserSummarySaga() {
  try {
    const userData: AxiosResponse<User> = yield call(API.get, '/pm/users/me/summary');
    const user = userData.data;
    const localOrganizationId = JSON.parse(localStorage.getItem('currentOrganizationId') as any);
    const localBranchId = JSON.parse(localStorage.getItem('currentBranchId') as any);

    if (localOrganizationId && localBranchId) {
      setHeaders({ [Headers.BranchId]: localBranchId });
    } else {
      user.currentBranchId && localStorage.setItem('currentBranchId', user.currentBranchId);
      user.currentOrganizationId && localStorage.setItem('currentOrganizationId', user.currentOrganizationId);
      user.currentBranchId && setHeaders({ [Headers.BranchId]: user.currentBranchId });
    }

    yield put({
      type: getUserSummarySuccess.type,
      payload: {
        ...user,
        currentOrganizationId: localOrganizationId || user.currentOrganizationId,
        currentBranchId: localBranchId || user.currentBranchId,
      },
    });
    yield put({ type: fetchNotificationContinuously.type });
    yield put({ type: appInitSuccess.type });
  } catch (error) {
    yield put({ type: setError.type, payload: error });
  }
}

function* setBranchSaga({
  payload: { value, navigate },
}: PayloadAction<{ value: string; navigate: NavigateFunction }>) {
  yield call(updateToken);
  localStorage.setItem('currentBranchId', value);
  setHeaders({ [Headers.BranchId]: value });
  navigate(ROUTES.main);
  try {
    const userData: AxiosResponse<User> = yield call(API.get, 'pm/users/me/summary');
    const user = userData.data;
    yield put({ type: getUserSummarySuccess.type, payload: user });
    yield put({ type: getTodayPatientsAppointments.type });
  } catch (error) {
    yield put({ type: setError.type, payload: error });
  }
}

export function* userSagaWatcher() {
  yield takeLatest(fetchTokenContinuously.type, fetchContinuouslySaga);
  yield takeLatest(checkActivity.type, checkUserActivitySaga);
  yield takeLatest(logOut.type, logOutSaga);
  yield takeLatest(getUserSummary.type, getUserSummarySaga);
  yield takeLatest(setBranch.type, setBranchSaga);
}
