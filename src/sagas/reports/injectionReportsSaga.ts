import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  changeInjectionReportPage,
  changeInjectionReportRowsPerPage,
  getInjectionReport,
  getInjectionReportSuccess,
  setInjectionReportError,
} from '@store/slices';
import { InjectionReportResponse, RootState } from '@types';
import { API } from '@utils';
import { AxiosResponse } from 'axios';
import { endOfDay } from 'date-fns';

export function* getInjectionReportSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state: RootState) => state.injectionReports);
    const filtersToSend = {
      from: filters.fromDate,
      to: endOfDay(filters.toDate),
      patientId: filters.patient?.id,
      shiftIds: filters.shifts?.length ? filters.shifts.map((shift) => shift.value) : null,
    };
    const {
      data: { content, ...pagination },
    }: AxiosResponse<InjectionReportResponse> = yield call(API.post, '/pm/reports/injections', filtersToSend, {
      params: { page: currentPage, size: perPage },
    });
    yield put(
      getInjectionReportSuccess({
        content,
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setInjectionReportError.type, payload: error.message });
    }
  }
}

export function* injectionReportsSagaWatcher() {
  yield takeLatest(
    [getInjectionReport.type, changeInjectionReportPage.type, changeInjectionReportRowsPerPage.type],
    getInjectionReportSaga,
  );
}
