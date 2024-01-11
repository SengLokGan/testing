import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { API, getCodeValueFromCatalog } from '@utils';
import {
  changeOverviewPatientPage,
  changeOverviewPatientRowsPerPage,
  changePatientsOverviewFilters,
  changePatientsOverviewStatusesFilters,
  clearPatientsOverviewChipsFilters,
  getFilteredPatientsOverviewList,
  getPatientsOverviewError,
  getPatientsOverviewList,
  getPatientsOverviewListSuccess,
  setPatientsOverviewStatusesCounters,
} from '@store/slices/overviewPatientsSlice';
import type {
  PatientsOverviewFilters,
  OverviewPatient,
  OverviewPatientTable,
  OverviewPatientsStatusesFilterCountersResponse,
} from '@types';
import { AxiosResponse } from 'axios';
import { Virus, VirusStatus, PatientOverviewStatusesFilters } from '@enums';
import { joinAndSortFrequencyDays } from '@utils/frequency';

const GENDER_OTHER = 'other';

const transformData = (data: OverviewPatient[]) => {
  const AmType = {
    CVC: 'CVC',
    VASCULAR_ACCESS: 'VA',
  };

  return data.map((patient, index) => {
    const virusKeys = patient?.virology && (Object.keys(patient.virology) as Virus[]);
    const virology =
      virusKeys?.length > 0
        ? virusKeys.filter((key: Virus) => key !== Virus.Hbsab && patient.virology[key] !== VirusStatus.NonReactive)
        : null;
    const genderCode =
      patient.gender.code && patient.gender.code !== GENDER_OTHER
        ? getCodeValueFromCatalog('gender', patient.gender.code)
        : patient.gender?.extValue;
    const hdSchedule = joinAndSortFrequencyDays(
      patient.hdSchedule?.map((day) => day.slice(0, 3)),
      ', ',
    );
    const access = patient?.amTypes?.map((type) => AmType[type]).join('/');
    return {
      id: patient.id,
      name: {
        id: patient.id,
        name: patient.name,
        photoPath: patient?.photoPath,
      },
      treatments: `${patient?.dialysis?.passed ?? 0}/${patient?.dialysis?.planned ?? 0}`,
      missedTreatment: patient?.dialysis?.missed === undefined ? '—' : `${patient?.dialysis?.missed}`,
      gender: genderCode,
      document: patient.document.number,
      isolation: virology,
      hdSchedule,
      access,
      status: patient.status,
      primaryNurse: index < 2 ? 'Test Test' : '', // TODO RWP-5635 delete after back implementation
      idwg: patient.idwg,
    };
  });
};

const setPatientStatusesBadges = (counters, statusesFilters) => {
  const setBudge = (patientStatus: PatientOverviewStatusesFilters) => {
    switch (patientStatus) {
      case PatientOverviewStatusesFilters.MyPatients:
        return 2; // TODO RWP-5635 paste real data after back modify API
      case PatientOverviewStatusesFilters.Permanent:
        return counters.permanent;
      case PatientOverviewStatusesFilters.Walk_In:
        return counters.walkIn;
      case PatientOverviewStatusesFilters.Visiting:
        return counters.visiting;
      case PatientOverviewStatusesFilters.Hospitalized:
        return counters.hospitalized;
      case PatientOverviewStatusesFilters.Discharged:
        return counters.discharged;
      case PatientOverviewStatusesFilters.Temporary_Transferred:
        return counters.temporaryTransferred;
      case PatientOverviewStatusesFilters.Dead:
        return counters.dead;
      case PatientOverviewStatusesFilters.All:
        return Object.keys(counters).reduce((acc, item) => {
          return acc + counters[item];
        }, 0);
      default:
        return 0;
    }
  };
  return statusesFilters.map((item) => ({ ...item, badge: setBudge(item.name).toString() }));
};

const getActionTypeOnPaginationChange = (filters: PatientsOverviewFilters) => {
  if (filters.isolation.items.some((item) => item.checked)) {
    return getFilteredPatientsOverviewList.type;
  }
  return getPatientsOverviewList.type;
};

function* filterPatientsSaga() {
  try {
    const {
      pagination: { currentPage, perPage },
      filters,
    } = yield select((state) => state.overviewPatients);
    const isolationFiltersToSend = filters.isolation.items
      .filter((filter) => filter.checked)
      .map((item) => item.name.toUpperCase());
    const statusFilters = filters.statuses.items;
    const isAllStatus = filters.statuses.items.find(
      (item) => item.name === PatientOverviewStatusesFilters.All,
    )?.selected;
    const isMyPatients = filters.statuses.items.find(
      (item) => item.name === PatientOverviewStatusesFilters.MyPatients,
    )?.selected;

    const statusesFiltersToSend = statusFilters
      .filter((item) =>
        isAllStatus
          ? // TODO RWP-5635 remove item.name !== PatientOverviewStatusesFilters.MyPatients check, after back implementation
            item.name !== PatientOverviewStatusesFilters.All && item.name !== PatientOverviewStatusesFilters.MyPatients
          : item.selected,
      )
      .map((filteredItem) => filteredItem.name);

    const [patientsList, counters]: [
      AxiosResponse<OverviewPatientTable>,
      AxiosResponse<OverviewPatientsStatusesFilterCountersResponse>,
    ] = yield all([
      isMyPatients
        ? Promise.resolve({ data: {} }) // TODO RWP-5635 remove this promise.resolve after back done API
        : call(
            API.post,
            '/pm/patients/search',
            { isolations: isolationFiltersToSend, statuses: statusesFiltersToSend, patientId: filters?.patient?.id },
            { params: { page: currentPage, size: perPage, sort: 'name,id' } },
          ),
      call(API.post, '/pm/patients/count', {
        isolations: isolationFiltersToSend,
      }),
    ]);
    yield put({
      type: getPatientsOverviewListSuccess.type,
      payload: { ...patientsList.data, content: transformData(patientsList.data.content) },
    });
    yield put({
      type: setPatientsOverviewStatusesCounters.type,
      payload: {
        items: setPatientStatusesBadges(counters.data, filters.statuses.items),
      },
    });
  } catch (error) {
    yield put({ type: getPatientsOverviewError.type });
  }
}

function* changeOverviewPatientPageSaga() {
  const { filters } = yield select((state) => state.overviewPatients);
  yield put({ type: getActionTypeOnPaginationChange({ ...filters }) });
}

function* changeOverviewPatientRowsPerPageSaga() {
  const { filters } = yield select((state) => state.overviewPatients);
  yield put({ type: getActionTypeOnPaginationChange({ ...filters }) });
}

export function* overviewPatientsSagaWatcher() {
  yield takeLatest(
    [
      getPatientsOverviewList.type,
      changePatientsOverviewFilters.type,
      changePatientsOverviewStatusesFilters.type,
      getFilteredPatientsOverviewList.type,
      clearPatientsOverviewChipsFilters.type,
    ],
    filterPatientsSaga,
  );
  yield takeLatest(changeOverviewPatientPage.type, changeOverviewPatientPageSaga);
  yield takeLatest(changeOverviewPatientRowsPerPage.type, changeOverviewPatientRowsPerPageSaga);
}
