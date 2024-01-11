import { PayloadAction } from '@reduxjs/toolkit';
import { startOfDay, endOfDay } from 'date-fns';
import {
  clearLabResultsFilters,
  getLabResultsList,
  getLabResultsListSuccess,
  setLabResultsFilter,
  exportLabResults,
  exportLabResultsFinish,
  exportLabResult,
} from '@store/slices/labResultsSlice';
import { validateDataValue, API } from '@utils';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { downloadFile } from '@utils/downloadFile';
import { getFileParamsFromHeaders } from '@utils/getFileParamsFromHeaders';
import { AxiosResponse } from 'axios';

export function* labResultsSaga({ type, payload }: PayloadAction<any>) {
  const { from, to, procedure, labName } = yield select((state) => state.labResults.filters);

  const filters = {
    from: from ? startOfDay(from) : null,
    to: to ? endOfDay(to) : null,
    labIds: validateDataValue(labName, []),
    procedureIds: validateDataValue(
      procedure.map((procedure) => procedure.value),
      [],
    ),
  };
  try {
    if (type === getLabResultsList.type && payload) {
      const response = yield call(API.post, '/pm/lab-results/search', { ...filters, patientId: payload });
      yield put(getLabResultsListSuccess(response.data));
    } else {
      yield put(getLabResultsListSuccess({ resultPackages: [], specifications: [] }));
    }
  } catch (error) {
    yield put(getLabResultsListSuccess({ resultPackages: [], specifications: [] }));
    console.error(error);
  }
}

export function* labResultsAssistanceSaga({ type }: PayloadAction<{ type: string }>) {
  const patientId = yield select((state) => state.patient.patient?.id);
  const errors = yield select((state) => state.labResults.filtersError);
  if (
    (type === setLabResultsFilter.type || type === clearLabResultsFilters.type) &&
    !errors.from &&
    !errors.to &&
    patientId
  ) {
    yield put(getLabResultsList(patientId));
  }
}
export function* exportLabResultsSaga({ payload }: PayloadAction<string>) {
  const { from, to, procedure, labName } = yield select((state) => state.labResults.filters);

  const params = {
    from: from ? startOfDay(from) : null,
    to: to ? endOfDay(to) : null,
    labIds: validateDataValue(labName, []),
    procedureIds: validateDataValue(
      procedure.map((procedure) => procedure.value),
      [],
    ),
    patientId: payload,
  };

  try {
    const { data, headers } = yield call(API.post, '/pm/lab-results/export', params, { responseType: 'blob' });
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportLabResultsFinish());
  } catch (error) {
    console.error(error);
    yield put(exportLabResultsFinish());
  }
}

export function* exportLabResultSaga({ payload }: PayloadAction<number>) {
  try {
    const { data, headers }: AxiosResponse<Blob> = yield call(API.get, `/pm/lab-results/${payload}/printing`, {
      responseType: 'blob',
    });
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportLabResultsFinish());
  } catch (error) {
    console.error(error);
    yield put(exportLabResultsFinish());
  }
}

export function* labResultsSagaWatcher() {
  yield takeLatest([getLabResultsList.type], labResultsSaga);
  yield takeLatest(exportLabResults.type, exportLabResultsSaga);
  yield takeLatest(exportLabResult.type, exportLabResultSaga);
  yield takeLatest([setLabResultsFilter.type, clearLabResultsFilters.type], labResultsAssistanceSaga);
}
