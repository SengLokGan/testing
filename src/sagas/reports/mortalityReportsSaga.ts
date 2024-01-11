import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  changeMortalityReportPage,
  changeMortalityReportRowsPerPage,
  getMortalityReport,
  getMortalityReportSuccess,
  setMortalityReportError,
} from '@store/slices';
import { RootState, MortalityReportResponse } from '@types';
import { API, dateToServerFormat } from '@utils';
import { AxiosResponse } from 'axios';

export function* getMortalityReportSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state: RootState) => state.mortalityReports);
    const filtersToSend = {
      from: filters.fromDate ? dateToServerFormat(filters.fromDate) : null,
      to: filters.toDate ? dateToServerFormat(filters.toDate) : null,
      patientId: filters.patient?.id,
    };
    const {
      data: { content, ...pagination },
    }: AxiosResponse<MortalityReportResponse> = yield call(API.post, '/pm/reports/mortality', filtersToSend, {
      params: { page: currentPage, size: perPage },
    });
    yield put({
      type: getMortalityReportSuccess.type,
      payload: {
        content,
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setMortalityReportError.type, payload: error.message });
    }
  }
}

export function* mortalityReportsSagaWatcher() {
  yield takeLatest(
    [getMortalityReport.type, changeMortalityReportPage.type, changeMortalityReportRowsPerPage.type],
    getMortalityReportSaga,
  );
}
