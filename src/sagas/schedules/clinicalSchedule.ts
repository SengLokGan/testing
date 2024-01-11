import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  addSnack,
  getEvents,
  getEventsSuccess,
  removeServiceModal,
  submitEventForm,
  setClinicalScheduleError,
  getClinicalShiftList,
  getClinicalShiftListSuccess,
  setClinicalScheduleDate,
  deleteEvent,
} from '@store/slices';
import { API } from '@utils/api';
import { ClinicalEventFormType } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
import { transformEventsData } from '@components/pages/Schedule/clinicalSchedule/utils/transformEventsData';
import { format, getYear } from 'date-fns';
import { ServiceModalName, SnackType } from '@enums/components';
import i18n from 'i18next';

function* getEventsSaga() {
  try {
    const date = yield select((state) => state.clinicalSchedule.clinicalScheduleDate);

    const { data } = yield call(API.get, `pm/calendar/events?year=${getYear(date)}`);
    yield put({ type: getEventsSuccess.type, payload: transformEventsData(data) });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setClinicalScheduleError.type, payload: error });
    }
  }
}

export function* getClinicalShiftListSaga() {
  try {
    const { data } = yield call(API.get, 'pm/shifts');
    yield put({ type: getClinicalShiftListSuccess.type, payload: data });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setClinicalScheduleError.type, payload: error });
    }
  }
}

function* submitEventFormSaga({
  payload: { date, laboratory, startTime, endTime, id, doctor, ...formData },
}: PayloadAction<ClinicalEventFormType & { id?: string }>) {
  try {
    const params = {
      date: format(date!, 'yyyy-MM-dd'),
      labId: laboratory?.value,
      startTime: startTime ? format(startTime, 'HH:mm') : null,
      endTime: endTime ? format(endTime, 'HH:mm') : null,
      doctorId: doctor ? doctor.value : null,
      ...formData,
    };

    if (id) {
      yield call(API.put, `pm/calendar/events/${id}`, params);
    } else {
      yield call(API.post, 'pm/calendar/events', params);
    }

    yield put({ type: getEvents.type });
    yield put({ type: removeServiceModal, payload: ServiceModalName.AddClinicalEventModal });
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t(id ? 'schedule:changeEvent' : 'schedule:createEvent'),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setClinicalScheduleError.type, payload: error });
    }
  }
}

function* deleteEventSaga({ payload: id }: PayloadAction<string>) {
  try {
    yield call(API.delete, `/pm/calendar/events/${id}`);
    yield put({ type: getEvents.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Delete, message: i18n.t('schedule:eventsHasBeenDeleted') },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: setClinicalScheduleError.type, payload: error });
    }
  }
}

export function* clinicalScheduleSagaWatcher() {
  yield takeLatest(getEvents.type, getEventsSaga);
  yield takeLatest(submitEventForm.type, submitEventFormSaga);
  yield takeLatest(getClinicalShiftList.type, getClinicalShiftListSaga);
  yield takeLatest(setClinicalScheduleDate.type, getEventsSaga);
  yield takeLatest(deleteEvent.type, deleteEventSaga);
}
