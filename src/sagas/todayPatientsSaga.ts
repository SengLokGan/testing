import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  changeTodayPatientsAppointmentsPage,
  changeTodayPatientsAppointmentsRowsPerPage,
  changeTodayPatientsFilters,
  changeTodayPatientsStatusesFilters,
  clearAllTodayPatientsFilters,
  getTodayPatientsAppointments,
  getTodayPatientsAppointmentsError,
  getTodayPatientsAppointmentsSuccess,
  getTodayPatientsInjections,
  getTodayPatientsInjectionsSuccess,
  getTodayPatientsShifts,
  getTodayPatientsShiftsSuccess,
  setTodayPatientsFilterDate,
  setTodayPatientsStatusesCounters,
  updateTodayPatientsInjectionPrepared,
  updateTodayPatientsInjectionPreparedSuccess,
} from '@store/slices/todayPatientsSlice';
import { API, dateToServerFormat } from '@utils';
import type { AxiosResponse } from 'axios';
import type {
  RootState,
  AppointmentsResponse,
  AppointmentsStatusesFilterCountersResponse,
  TodayPatientsPlannedInjectionsResponse,
  Shift,
} from '@types';
import { AppointmentsStatusesFilters, InjectionType, TodayPatientsTabs } from '@enums';
import { convertAppointmentsToTableFormat, setAppointmentsStatusesBadges } from '@utils/converters/appointments';
import type { PayloadAction } from '@reduxjs/toolkit';

export function* filterTodayPatientsSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      filterDate,
      filters,
      activeTab,
    } = yield select((state: RootState) => state.todayPatients);

    const isolationFiltersToSend = filters.isolation.items
      .filter((filter) => filter.checked)
      .map((item) => item.name.toUpperCase());
    const statusFilters = filters.statuses.items;
    const isAllStatus = statusFilters.find((item) => item.name === AppointmentsStatusesFilters.All)?.selected;
    const statusFilterToSend = isAllStatus ? '' : statusFilters.find((item) => item.selected);
    const formattedFilterDate = dateToServerFormat(filterDate);

    const [
      {
        data: { content, ...pagination },
      },
      counters,
    ]: [AxiosResponse<AppointmentsResponse>, AxiosResponse<AppointmentsStatusesFilterCountersResponse>] = yield all([
      call(
        API.post,
        '/pm/appointments/search',
        {
          isolations: isolationFiltersToSend,
          date: formattedFilterDate,
          status: statusFilterToSend.name,
          patientId: filters?.patient?.id,
        },
        { params: { page: currentPage, size: perPage, sort: 'patient.name,id' } },
      ),
      call(API.post, '/pm/appointments/count', { isolations: isolationFiltersToSend, date: formattedFilterDate }),
    ]);

    if (activeTab === TodayPatientsTabs.Injections) {
      yield put(getTodayPatientsInjections());
    }

    yield put({
      type: getTodayPatientsAppointmentsSuccess.type,
      payload: {
        content: convertAppointmentsToTableFormat(content),
        pagination: {
          currentPage: pagination.pageable.pageNumber,
          perPage: pagination.pageable.pageSize,
          totalCount: pagination.totalElements,
        },
      },
    });
    yield put({
      type: setTodayPatientsStatusesCounters.type,
      payload: {
        items: setAppointmentsStatusesBadges(counters.data, filters.statuses.items),
      },
    });
  } catch (error) {
    yield put({ type: getTodayPatientsAppointmentsError.type });
  }
}

function* todayPatientsInjectionsSaga() {
  try {
    const { filterDate, filters } = yield select((state: RootState) => state.todayPatients);

    const formattedFilterDate = dateToServerFormat(filterDate);

    const { data }: AxiosResponse<TodayPatientsPlannedInjectionsResponse> = yield call(
      API.post,
      '/pm/appointments/injections/search',
      {
        date: formattedFilterDate,
        patientId: filters?.patient?.id,
      },
    );

    yield put(getTodayPatientsInjectionsSuccess(data));
  } catch (error: any) {
    yield put(getTodayPatientsAppointmentsError(error));
  }
}

function* updateTodayPatientsInjectionPreparedSaga({
  payload: { id, appointmentId, status, type },
}: PayloadAction<{ id: number; appointmentId: number; status: boolean; type: InjectionType }>) {
  try {
    yield call(API.put, `pm/appointments/${appointmentId}/injections/${id}/prepare`, {
      type,
      prepared: status,
    });
    yield put(updateTodayPatientsInjectionPreparedSuccess());
    yield put(getTodayPatientsInjections());
  } catch (error: any) {
    yield put(getTodayPatientsAppointmentsError(error));
  }
}

function* getTodayPatientsShiftsSaga() {
  try {
    const { data }: AxiosResponse<Shift[]> = yield call(API.get, `/pm/shifts`);
    yield put(getTodayPatientsShiftsSuccess(data));
  } catch (error: any) {
    yield put(getTodayPatientsAppointmentsError(error));
  }
}

export function* todayPatientsSagaWatcher() {
  yield takeLatest(
    [
      getTodayPatientsAppointments.type,
      setTodayPatientsFilterDate.type,
      changeTodayPatientsAppointmentsPage.type,
      changeTodayPatientsAppointmentsRowsPerPage.type,
      clearAllTodayPatientsFilters.type,
      changeTodayPatientsFilters.type,
      changeTodayPatientsStatusesFilters.type,
    ],
    filterTodayPatientsSaga,
  );
  yield takeLatest([getTodayPatientsInjections.type], todayPatientsInjectionsSaga);
  yield takeLatest([updateTodayPatientsInjectionPrepared.type], updateTodayPatientsInjectionPreparedSaga);
  yield takeLatest([getTodayPatientsShifts.type], getTodayPatientsShiftsSaga);
}
