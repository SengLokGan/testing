import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API, dateToServerFormat, getTenantDate } from '@utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addPatientError,
  changeClinicalInfo,
  ChangeClinicalInfoPayload,
  changeClinicalInfoSuccess,
  changeDocuments,
  ChangeDocumentsPayload,
  changeDocumentsSuccess,
  changeFamilyInfo,
  ChangeFamilyInfoPayload,
  changeFamilyInfoSuccess,
  changeMainInfo,
  ChangeMainInfoPayload,
  changeMainInfoSuccess,
  changePatientStatus,
  changePatientStatusSuccess,
  changeTreatmentInfo,
  ChangeTreatmentInfoPayload,
  changeTreatmentInfoSuccess,
  checkHasTodayEncounter,
  createNewPatient,
  createNewPatientSuccess,
  CreatePatientPayload,
  deletePatient,
  deletePatientSuccess,
  getDialysisProcessInfo,
  getDialysisProcessInfoSuccess,
  getPatientClinicalInfo,
  getPatientClinicalInfoSuccess,
  getPatientDemographics,
  getPatientDemographicsSuccess,
  getPatientIsolationStatus,
  getPatientIsolationStatusSuccess,
  getPatientStatusHistory,
  getPatientStatusHistorySuccess,
  getTreatmentInfo,
  getTreatmentInfoSuccess,
  setHasTodayEncounter,
  setIsServiceEncountered,
} from '@store/slices/patientSlice';
import { addSnack } from '@store/slices/snackSlice';
import { AppointmentStatus, PatientStatuses, ServiceModalName, SnackType } from '@enums';
import i18n from 'i18next';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { ERROR_CODES, ROUTES } from '@constants';
import type {
  ClinicalInfoResponse,
  DialysisProcessInfoRequest,
  FamilyInfo,
  FileDocument,
  Patient,
  PatientChangeStatusHistoryResponse,
  PatientIsolationDetectResponse,
  PatientStatus,
  PatientStatusChangeRequest,
  TreatmentInfo,
  WalkInPatient,
} from '@types';
import { removeServiceModal } from '@store/slices';
import { NavigateFunction } from 'react-router-dom';

function* createNewPatientSaga({ payload: { patient, status, messages } }: PayloadAction<CreatePatientPayload>) {
  try {
    const { data: createdPatient }: AxiosResponse<WalkInPatient | Patient> = yield call(API.post, '/pm/patients', {
      ...patient,
      status,
    });
    yield put({ type: createNewPatientSuccess.type, payload: { patient: createdPatient } });
    yield put({ type: addSnack.type, payload: { type: SnackType.Success, message: messages.success } });
  } catch (error: any) {
    if (error?.response?.data.length) {
      for (let err of error.response.data) {
        switch (err?.code) {
          case ERROR_CODES.PATIENT_IS_NOT_UNIQUE:
            yield put({ type: addPatientError.type, payload: { code: ERROR_CODES.PATIENT_IS_NOT_UNIQUE } });
            break;
          case ERROR_CODES.S3_ANTIVIRUS_ERROR:
            yield put({ type: addPatientError.type, payload: err });
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('common:fileUpload.hasNotBeenChecked') },
            });
            break;
          case ERROR_CODES.S3_FILE_IS_NOT_FOUND:
            yield put({ type: addPatientError.type, payload: err });
            break;
          default:
            yield put({ type: addPatientError.type, payload: err });
            yield put({ type: addSnack.type, payload: { type: SnackType.Error, message: messages.error } });
        }
      }
    }
  }
}

function* deletePatientSaga({ payload: { id, navigate } }: PayloadAction<{ id: string; navigate: NavigateFunction }>) {
  //TODO: check API
  try {
    yield call(API.delete, `/pm/patients/${id}`);
    yield put({ type: deletePatientSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientHasBeenDeleted') },
    });
    navigate(`/${ROUTES.patientsOverview}`);
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('patient:modal.deleteError') },
      });
    }
  }
}

function* changePatientMainInfoSaga({ payload: { id, patient, status } }: PayloadAction<ChangeMainInfoPayload>) {
  try {
    const shouldUsePhotoPathFromSlice =
      status === PatientStatuses.Walk_In || status === PatientStatuses.Discharged || status === PatientStatuses.Dead;
    const { photoPath } = yield select((state) => state.patient.patient);
    const { data: patientMainInfo }: AxiosResponse<Patient> = yield call(API.put, `/pm/patients/${id}`, patient);
    yield put({
      type: changeMainInfoSuccess.type,
      payload: {
        ...patientMainInfo,
        photoPath: shouldUsePhotoPathFromSlice ? photoPath : patientMainInfo.photoPath ?? null,
      },
    });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
    });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error?.response?.data[0]?.code === ERROR_CODES.PATIENT_IS_NOT_UNIQUE) {
        yield put({ type: addPatientError.type, payload: { message: ERROR_CODES.PATIENT_IS_NOT_UNIQUE } });
      } else {
        yield put({ type: addPatientError.type, payload: error });
        yield put({
          type: addSnack.type,
          payload: { type: SnackType.Error, message: i18n.t('patient:modal.updateFailed') },
        });
      }
    }
  }
}

function* changeFamilyInfoSaga({ payload: { familyInfo, id, method } }: PayloadAction<ChangeFamilyInfoPayload>) {
  try {
    const { data: patientFamilyInfo }: AxiosResponse<FamilyInfo> = yield call(
      API[method],
      `/pm/patients/${id}/family`,
      { ...familyInfo },
    );
    yield put({ type: changeFamilyInfoSuccess.type, payload: patientFamilyInfo });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('patient:modal.updateFailed') },
      });
    }
  }
}

function* changeDocumentsSaga({ payload: { files, id } }: PayloadAction<ChangeDocumentsPayload>) {
  try {
    const { data: documents }: AxiosResponse<{ files: FileDocument[] }> = yield call(
      API.put,
      `/pm/patients/${id}/files`,
      { files },
    );
    yield put({
      type: changeDocumentsSuccess.type,
      payload: documents.files,
    });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
    });
  } catch (error: any) {
    if (error?.response?.data.length) {
      for (let err of error.response.data) {
        switch (err?.code) {
          case ERROR_CODES.S3_ANTIVIRUS_ERROR:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('common:fileUpload.hasNotBeenChecked') },
            });
            break;
          case ERROR_CODES.S3_FILE_IS_NOT_FOUND:
            break;
          default:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('patient:modal.updateFailed') },
            });
        }
        yield put({ type: addPatientError.type, payload: err });
      }
    }
  }
}

export function* changePatientClinicalInfoSaga({
  payload: { id, clinicalInfo, method },
}: PayloadAction<ChangeClinicalInfoPayload>) {
  try {
    const { data: patientClinicalInfo }: AxiosResponse<ClinicalInfoResponse> = yield call(
      API[method],
      `/pm/patients/${id}/clinical-info`,
      {
        ...clinicalInfo,
        medicalHistory: clinicalInfo.medicalHistory?.replace(/\n/g, '\\n'),
      },
    );
    yield put({
      type: changeClinicalInfoSuccess.type,
      payload: {
        clinicalInfo: {
          ...patientClinicalInfo,
          medicalHistory: patientClinicalInfo?.medicalHistory?.replace(/\\n/g, '\n'),
        },
      },
    });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('patient:modal.updateFailed') },
      });
    } else {
      console.error(error);
    }
  }
}

export function* changeTreatmentInfoSaga({
  payload: { id, treatmentInfo },
}: PayloadAction<ChangeTreatmentInfoPayload>) {
  try {
    const { data: treatmentInfoData }: AxiosResponse<TreatmentInfo> = yield call(
      API.post,
      `/pm/patients/${id}/treatment`,
      treatmentInfo,
    );
    yield put({ type: changeTreatmentInfoSuccess.type, payload: { treatmentInfo: treatmentInfoData } });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('patient:modal.updateFailed') },
      });
    } else {
      console.error(error);
    }
  }
}

export function* getPatientDemographicsSaga({ payload: id }: PayloadAction<string>) {
  try {
    const { data: patientDemographics }: AxiosResponse<Patient> = yield call(
      API.get,
      `/pm/patients/${id}/demographics`,
    );
    yield put({ type: getPatientDemographicsSuccess.type, payload: patientDemographics });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* getPatientClinicalInfoSaga({ payload: id }: PayloadAction<string>) {
  try {
    const { data: patientClinicalInfo }: AxiosResponse<ClinicalInfoResponse> = yield call(
      API.get,
      `/pm/patients/${id}/clinical-info`,
    );
    yield put({
      type: getPatientClinicalInfoSuccess.type,
      payload: Object.keys(patientClinicalInfo).length
        ? {
            ...patientClinicalInfo,
            medicalHistory: patientClinicalInfo?.medicalHistory?.replace(/\\n/g, '\n'),
          }
        : null,
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* getTreatmentInfoSaga({ payload: id }: PayloadAction<string | number>) {
  try {
    const { data: patientTreatmentInfo }: AxiosResponse<TreatmentInfo> = yield call(
      API.get,
      `/pm/patients/${id}/treatment`,
    );
    yield put({
      type: getTreatmentInfoSuccess.type,
      payload: Object.keys(patientTreatmentInfo).length ? patientTreatmentInfo : null,
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* getDialysisProcessInfoSaga({ payload: id }: PayloadAction<string | number>) {
  try {
    const { data: dialysisProcessInfo }: AxiosResponse<DialysisProcessInfoRequest> = yield call(
      API.get,
      `/pm/patients/${id}/appointments/summary`,
    );
    yield put({
      type: setIsServiceEncountered.type,
      payload: dialysisProcessInfo.status === AppointmentStatus.ServiceEncountered,
    });
    yield put({
      type: getDialysisProcessInfoSuccess.type,
      payload: dialysisProcessInfo,
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* getPatientIsolationStatusSaga({ payload: patientId }: PayloadAction<string | number>) {
  try {
    const { data }: AxiosResponse<PatientIsolationDetectResponse | null | undefined> = yield call(
      API.post,
      '/pm/isolation-groups/detect',
      {
        patientId: patientId,
      },
    );
    yield put(getPatientIsolationStatusSuccess(data || null));
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put(getPatientIsolationStatusSuccess(undefined));
    } else {
      console.error(error);
    }
  }
}

export function* getPatientStatusHistorySaga({ payload }: PayloadAction<number | string>) {
  try {
    const { data }: AxiosResponse<PatientStatus[]> = yield call(API.get, `/pm/patients/${payload}/statuses`);
    yield put(getPatientStatusHistorySuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
      yield put(getPatientIsolationStatusSuccess(undefined));
    } else {
      console.error(error);
    }
  }
}

export function* changePatientStatusSaga({
  payload: { patientId, isHistory, statusId, ...payload },
}: PayloadAction<PatientStatusChangeRequest>) {
  try {
    const response: AxiosResponse<PatientChangeStatusHistoryResponse> = isHistory
      ? yield call(API.put, `/pm/patients/${patientId}/statuses/${statusId}`, payload, {
          headers: {
            'multiline-fields': 'comment',
          },
        })
      : yield call(API.post, `/pm/patients/${patientId}/statuses`, payload);
    yield put(removeServiceModal(ServiceModalName.PatientStatusModal));
    yield put(getPatientDemographics(patientId.toString()));
    yield put(getPatientStatusHistory(patientId.toString()));
    yield put(changePatientStatusSuccess(response.data));
    yield put(
      addSnack({
        type: SnackType.Success,
        message: i18n.t('patient:snacks.statusHasBeenChanged'),
      }),
    );
  } catch (error: any) {
    if (error?.response?.data.length) {
      for (let err of error.response.data) {
        switch (err?.code) {
          case ERROR_CODES.APPOINTMENT_HAS_OPEN_ENCOUNTER:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('patient:snacks.statusCanNotBeChanged') },
            });
            break;
          case ERROR_CODES.S3_ANTIVIRUS_ERROR:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('common:fileUpload.hasNotBeenChecked') },
            });
            break;
          case ERROR_CODES.S3_FILE_IS_NOT_FOUND:
            break;
          default:
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Error, message: i18n.t('patient:snacks.statusHasNotBeenChanged') },
            });
        }
        yield put({ type: addPatientError.type, payload: err });
      }
    }
  }
}

function* checkHasTodayEncounterSaga({ payload }: PayloadAction<string>) {
  try {
    const {
      data: { available },
    }: AxiosResponse<{ available: boolean }> = yield call(API.post, 'pm/prescriptions/start-available', {
      patientId: payload,
      date: dateToServerFormat(getTenantDate()),
    });

    yield put({ type: setHasTodayEncounter.type, payload: !available });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addPatientError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* patientSagaWatcher() {
  yield takeLatest(deletePatient.type, deletePatientSaga);
  yield takeLatest(createNewPatient.type, createNewPatientSaga);
  yield takeLatest(changeMainInfo.type, changePatientMainInfoSaga);
  yield takeLatest(changeFamilyInfo.type, changeFamilyInfoSaga);
  yield takeLatest(changeClinicalInfo.type, changePatientClinicalInfoSaga);
  yield takeLatest(getPatientDemographics.type, getPatientDemographicsSaga);
  yield takeLatest(getPatientClinicalInfo.type, getPatientClinicalInfoSaga);
  yield takeLatest(getTreatmentInfo.type, getTreatmentInfoSaga);
  yield takeLatest(changeDocuments.type, changeDocumentsSaga);
  yield takeLatest(changeTreatmentInfo.type, changeTreatmentInfoSaga);
  yield takeLatest(getDialysisProcessInfo.type, getDialysisProcessInfoSaga);
  yield takeLatest(getPatientIsolationStatus.type, getPatientIsolationStatusSaga);
  yield takeLatest(getPatientStatusHistory.type, getPatientStatusHistorySaga);
  yield takeLatest(changePatientStatus.type, changePatientStatusSaga);
  yield takeLatest(checkHasTodayEncounter.type, checkHasTodayEncounterSaga);
}
