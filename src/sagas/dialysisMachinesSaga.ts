import i18n from 'i18next';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { addSnack, removeDrawer } from '@store';
import {
  addDialysisMachinesError,
  createDialysisMachine,
  createDialysisMachineSuccess,
  getDialysisMachine,
  getDialysisMachinesList,
  getDialysisMachinesListSuccess,
  getDialysisMachineSuccess,
  updateDialysisMachine,
  updateDialysisMachineSuccess,
  getDialysisMachinesIsolationGroups,
  getDialysisMachinesIsolationGroupsSuccess,
  changeDialysisMachinesPaginationPage,
  changeDialysisMachinesPaginationRowsPerPage,
} from '@store/slices/dialysisMachines';
import { API } from '@utils';
import type {
  FailedRequest,
  DialysisMachinesEditingRequest,
  IsolationGroupsResponse,
  DialysisMachinesCreationRequest,
} from '@types';
import type { AxiosResponse } from 'axios';
import { DrawerType, SnackType } from '@enums';

export function* getDialysisMachinesIsolationGroupsSaga() {
  try {
    const { data }: AxiosResponse<IsolationGroupsResponse> = yield call(API.get, '/pm/isolation-groups');
    yield put(getDialysisMachinesIsolationGroupsSuccess(data));
  } catch (error) {
    yield put(addDialysisMachinesError(error as Error));
  }
}

export function* getDialysisMachinesListSaga() {
  const sort = yield select((state) => state.dialysisMachines.sortBy);
  const sortDir = yield select((state) => state.dialysisMachines.sortDir);
  const pagination = yield select((state) => state.dialysisMachines.pagination);
  try {
    const { data } = yield call(
      API.post,
      '/pm/dialysis-machines/search',
      {},
      {
        params: {
          sort: `${sort},${sortDir}`,
          page: pagination.currentPage,
          size: pagination.perPage,
        },
      },
    );
    yield put(getDialysisMachinesListSuccess(data));
  } catch (error) {
    yield put(addDialysisMachinesError(error as Error));
  }
}

export function* createDialysisMachineSaga({ payload }: PayloadAction<DialysisMachinesCreationRequest>) {
  try {
    const { data } = yield call(API.post, '/pm/dialysis-machines', payload);
    yield put(createDialysisMachineSuccess(data));
    yield put(removeDrawer(DrawerType.DialysisMachineForm));
    yield put(
      addSnack({ type: SnackType.Success, message: i18n.t('dialysisMachine:snacks.dialysisMachineHasBeenAdded') }),
    );
  } catch (error) {
    const errors = (error as FailedRequest)?.response?.data || null;
    yield put(addDialysisMachinesError(errors));
    yield put(
      addSnack({ type: SnackType.Error, message: i18n.t('dialysisMachine:snacks.dialysisMachineHasNotBeenAdded') }),
    );
  }
}

export function* getDialysisMachineSaga({ payload }: PayloadAction<string>) {
  try {
    const { data } = yield call(API.get, `/pm/dialysis-machines/${payload}`);
    yield put(getDialysisMachineSuccess(data));
  } catch (error) {
    yield put(addDialysisMachinesError(error as Error));
  }
}

export function* updateDialysisMachineSaga({
  payload: { id, data: requestData },
}: PayloadAction<{ id: string; data: DialysisMachinesEditingRequest }>) {
  try {
    const { data } = yield call(API.put, `/pm/dialysis-machines/${id}`, requestData);
    yield put(updateDialysisMachineSuccess(data));
    yield put(getDialysisMachine(id));
    yield put(removeDrawer(DrawerType.DialysisMachineForm));
    yield put(
      addSnack({ type: SnackType.Success, message: i18n.t('dialysisMachine:snacks.dialysisMachineHasBeenUpdated') }),
    );
  } catch (error) {
    const errors = (error as FailedRequest)?.response?.data || null;
    yield put(addDialysisMachinesError(errors));
    yield put(
      addSnack({ type: SnackType.Error, message: i18n.t('dialysisMachine:snacks.dialysisMachineHasNotBeenUpdated') }),
    );
  }
}

export function* dialysisMachinesSagaWatcher() {
  yield takeLatest([createDialysisMachine.type], createDialysisMachineSaga);
  yield takeLatest([getDialysisMachinesIsolationGroups.type], getDialysisMachinesIsolationGroupsSaga);
  yield takeLatest(
    [
      getDialysisMachinesList.type,
      changeDialysisMachinesPaginationPage.type,
      changeDialysisMachinesPaginationRowsPerPage.type,
    ],
    getDialysisMachinesListSaga,
  );
  yield takeLatest([getDialysisMachine.type], getDialysisMachineSaga);
  yield takeLatest([updateDialysisMachine.type], updateDialysisMachineSaga);
}
