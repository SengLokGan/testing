import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import type { RootState, PatientCensusCountersResponse, PatientCensusReportResponse } from '@types';
import {
  changePatientCensusReportPage,
  changePatientCensusReportRowsPerPage,
  getPatientCensusReport,
  getPatientCensusReportError,
  getPatientCensusReportSuccess,
  setPatientCensusChipsCounters,
} from '@store/slices/reports/patientCensusReportsSlice';
import { PatientCensusIsolationFilter } from '@enums';
import { API, dateToServerFormat, convertPatientCensusDataToTableFormat, setPatientCensusBadges } from '@utils';

export function* getPatientCensusReportSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state: RootState) => state.patientCensusReport);
    const filtersToSend = {
      date: dateToServerFormat(filters.date),
      isolations: filters.isolations
        .filter((isolation) => isolation.name !== PatientCensusIsolationFilter.Isolated && isolation.selected)
        .map((isolation) => isolation.name),
      statuses: filters.statuses.filter((status) => status.selected).map((status) => status.name),
    };
    const [
      {
        data: { content, ...pagination },
      },
      { data: chipsData },
    ]: [AxiosResponse<PatientCensusReportResponse>, AxiosResponse<PatientCensusCountersResponse>] = yield all([
      call(API.post, '/pm/reports/patient-census', filtersToSend, { params: { page: currentPage, size: perPage } }),
      call(API.post, '/pm/reports/patient-census/counters', filtersToSend),
    ]);
    yield put({
      type: getPatientCensusReportSuccess.type,
      payload: {
        content: convertPatientCensusDataToTableFormat(content),
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      },
    });
    yield put({
      type: setPatientCensusChipsCounters.type,
      payload: setPatientCensusBadges(chipsData, filters),
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: getPatientCensusReportError.type, payload: error.message });
    }
  }
}

export function* patientCensusReportsSagaWatcher() {
  yield takeLatest(
    [getPatientCensusReport.type, changePatientCensusReportPage.type, changePatientCensusReportRowsPerPage.type],
    getPatientCensusReportSaga,
  );
}
