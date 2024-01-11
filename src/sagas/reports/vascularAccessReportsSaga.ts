import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getVascularAccessReportsError,
  getVascularAccessReports,
  getVascularAccessReportsSuccess,
  setVascularAccessChipsCounters,
  changeVascularAccessReportsRowsPerPage,
  changeVascularAccessReportsPage,
} from '@store/slices/reports/vascularAccessReportsSlice';
import { AxiosResponse } from 'axios';
import { API } from '@utils/api';
import { ChipsCountersSumNames, VascularAccessFilterNames } from '@enums';
import {
  convertVascularAccessReportsDataToTableFormat,
  setVascularAccessReportsFiltersBadges,
} from '@utils/converters/vascularAccessReports';
import { dateToServerFormat } from '@utils/dateFormat';
import type { VascularAccessChipsCountersResponse, VascularAccessReportsResponse } from '@types';

export function* getVascularAccessReportsSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state) => state.vascularAccessReports);
    const filtersToSend = {
      date: dateToServerFormat(filters.date),
      [VascularAccessFilterNames.accessTypes]: filters.accessTypes
        .filter((item) => item.name !== ChipsCountersSumNames.vascular && item.selected)
        .map((filteredItem) => filteredItem.name),
      [VascularAccessFilterNames.categories]: filters.categories
        .filter((item) => item.name !== ChipsCountersSumNames.cvc && item.selected)
        .map((filteredItem) => filteredItem.name),
    };
    const [
      {
        data: { content, ...pagination },
      },
      { data: chipsData },
    ]: [AxiosResponse<VascularAccessReportsResponse>, AxiosResponse<VascularAccessChipsCountersResponse>] = yield all([
      call(API.post, '/pm/reports/vascular-access', filtersToSend, { params: { page: currentPage, size: perPage } }),
      call(API.post, '/pm/reports/vascular-access/counters', filtersToSend),
    ]);
    yield put({
      type: getVascularAccessReportsSuccess.type,
      payload: {
        content: convertVascularAccessReportsDataToTableFormat(content),
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      },
    });
    yield put({
      type: setVascularAccessChipsCounters.type,
      payload: setVascularAccessReportsFiltersBadges(chipsData, filters),
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: getVascularAccessReportsError.type, payload: error.message });
    }
  }
}

export function* vascularAccessReportsSagaWatcher() {
  yield takeLatest(
    [getVascularAccessReports.type, changeVascularAccessReportsPage.type, changeVascularAccessReportsRowsPerPage.type],
    getVascularAccessReportsSaga,
  );
}
