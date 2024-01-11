import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PatientStationHistoryReportResponse, RootState } from '@types';
import { AxiosResponse } from 'axios';
import { API } from '@utils/api';
import {
  changePatientStationHistoryReportPage,
  changePatientStationHistoryReportRowsPerPage,
  getPatientStationHistoryReport,
  getPatientStationHistoryReportSuccess,
  setPatientStationHistoryReportError,
} from '@store/slices';
import { endOfDay } from 'date-fns';

export function* getPatientStationHistoryReportSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      reports: { filters },
    } = yield select((state: RootState) => state.patientStationHistoryReport);
    const filtersToSend = {
      from: filters.fromDate,
      to: endOfDay(filters.toDate),
      patientId: filters.patient?.id,
      locationId: filters.locations?.value,
      startTime: filters.startTime,
      endTime: filters.endTime,
    };
    const {
      data: { content, ...pagination },
    }: AxiosResponse<PatientStationHistoryReportResponse> = yield call(
      API.post,
      '/pm/reports/patient-station',
      filtersToSend,
      {
        params: { page: currentPage, size: perPage },
      },
    );
    yield put(
      getPatientStationHistoryReportSuccess({
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
      yield put({ type: setPatientStationHistoryReportError.type, payload: error });
    }
  }
}

export function* patientStationHistoryReportSagaWatcher() {
  yield takeLatest(
    [
      getPatientStationHistoryReport.type,
      changePatientStationHistoryReportPage.type,
      changePatientStationHistoryReportRowsPerPage.type,
    ],
    getPatientStationHistoryReportSaga,
  );
}
