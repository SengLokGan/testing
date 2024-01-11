import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  changeHospitalizationReportsPage,
  changeHospitalizationRowsPerPage,
  getHospitalizationReports,
  getHospitalizationReportsSuccess,
  setHospitalizationChipsCounters,
  setHospitalizationReportsError,
} from '@src/store/slices';
import { HospitalizationReportCountersResponse, HospitalizationReportResponse, RootState } from '@types';
import {
  API,
  convertHospitalizationReportDataToTableFormat,
  dateToServerFormat,
  setHospitalizationReasonsBadges,
} from '@utils';
import { AxiosResponse } from 'axios';

export function* getHospitalizationReportSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state: RootState) => state.hospitalizationReports);
    const filtersToSend = {
      date: filters?.date ? dateToServerFormat(filters.date) : null,
      patientId: filters.patient?.id,
      reasons: filters.reasons.filter((reasonItem) => reasonItem.selected).map((filteredItem) => filteredItem.name),
    };
    const [
      {
        data: { content, ...pagination },
      },
      { data: chipsData },
    ]: [AxiosResponse<HospitalizationReportResponse>, AxiosResponse<HospitalizationReportCountersResponse>] = yield all(
      [
        call(API.post, '/pm/reports/hospitalization', filtersToSend, { params: { page: currentPage, size: perPage } }),
        call(API.post, '/pm/reports/hospitalization/counters', filtersToSend),
      ],
    );
    yield put({
      type: getHospitalizationReportsSuccess.type,
      payload: {
        content: convertHospitalizationReportDataToTableFormat(content),
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      },
    });
    yield put({
      type: setHospitalizationChipsCounters.type,
      payload: setHospitalizationReasonsBadges(chipsData, filters),
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setHospitalizationReportsError.type, payload: error.message });
    }
  }
}

export function* hospitalizationReportsSagaWatcher() {
  yield takeLatest(
    [getHospitalizationReports.type, changeHospitalizationReportsPage.type, changeHospitalizationRowsPerPage.type],
    getHospitalizationReportSaga,
  );
}
