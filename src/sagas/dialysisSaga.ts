import { ERROR_CODES, ROUTES } from '@constants';
import {
  AppointmentEventPlace,
  AppointmentStatus,
  DialysisStatus,
  DialysisSubmitSource,
  DrawerStatus,
  DrawerType,
  HdReadingOfflineOperationType,
  RowHighlightType,
  ServiceModalName,
  SnackType,
  UpdateHdRecordsType,
  VaccinationMedicationModalType,
  VaccinationMedicationResolution,
  VaccineMedicationOmittingStatus,
  VaccineMedicationServiceType,
} from '@enums';
import { PayloadAction } from '@reduxjs/toolkit';
import { updateAppointmentsSaga } from '@sagas/schedules/patientsSchedule';
import { Event, IndexedDbIndex, IndexedDbStorage, IndexedDbStorageTransactionEnum, IndexedDbStore } from '@services';
import {
  addDrawer,
  clearAccessManagementFormData,
  setIsServiceEncountered,
  scrollToAccessManagementSection,
  SkipAppointmentPayload,
} from '@store/slices';
import {
  abortDialysis,
  abortDialysisSuccess,
  addDialysisError,
  addDialysisHdReadingToStorage,
  addDialysisHdReadingToStorageSuccess,
  addHighlightToRows,
  AdministerVaccinationMedicationPayload,
  changeHdReadingRecordStatus,
  closeDialysisModal,
  deleteDialysisHdReading,
  deleteDialysisHdReadingsFromStorage,
  deleteDialysisHdReadingsFromStorageSuccess,
  deleteDialysisHdReadingSuccess,
  deleteDialysisStorage,
  deleteDialysisStorageSuccess,
  editDialysisHdReading,
  editDialysisHdReadingSuccess,
  EditHdReadingPayload,
  finishAndSaveHd,
  finishAndSaveHdSuccess,
  finishHd,
  getDialysis,
  getDialysisPreSuccess,
  getInitDialysisData,
  getInitialDialysisDataSuccess,
  getPostHd,
  getPostHdSuccess,
  getServices,
  getServicesSuccess,
  initDialysisStorage,
  initDialysisStorageSuccess,
  openStartHDModal,
  reactivateAppointment,
  reactivateAppointmentSuccess,
  resetSubmitting,
  saveAdministeringVaccinationMedication,
  saveAdministeringVaccinationMedicationSuccess,
  saveDialysisPre,
  saveDialysisPreSuccess,
  savePostHd,
  savePostHdSuccess,
  sendDialysisStorageRecords,
  sendDialysisStorageRecordsSuccess,
  setCurrentStep,
  setHasBeenRedirectedToAddAccess,
  skipAppointment,
  skipAppointmentSuccess,
  startHd,
  submitDialysisHdReading,
  updateDialysisHdReadingList,
  updateDialysisHdReadingListSuccess,
} from '@store/slices/dialysisSlice';
import { getDialysisProcessInfo } from '@store/slices/patientSlice';
import { addServiceModal, removeServiceModal } from '@store/slices/serviceModalSlice';
import { addSnack } from '@store/slices/snackSlice';
import { systemUpdateNetworkConnection } from '@store/slices/systemSlice';
import { getTodayPatientsAppointments, setTodayPatientsFilterDate } from '@store/slices/todayPatientsSlice';
import type {
  Dialysis,
  DialysisResponse,
  FinishHdForm,
  HdProgressRecord,
  HdProgressRecordWithOperation,
  HdReadingRecordsRequest,
  HdReadingRecordsResponse,
  PostHd,
  PostHdRequest,
  PreDialysisRequest,
  StartHdForm,
} from '@types';
import { API } from '@utils/api';
import { AxiosResponse } from 'axios';
import i18n from 'i18next';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uniqid from 'uniqid';

function* dialysisNetworkConnectionSaga() {
  const networkConnection = yield select((state) => state.system.networkConnection);

  if (networkConnection.backOnline) {
    yield put({ type: sendDialysisStorageRecords.type });
  }
}

function* abortDialysisSaga({ type }: PayloadAction<any>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const patientId = yield select((state) => state.patient.patient?.id);
  switch (type) {
    case abortDialysis.type: {
      try {
        yield call(API.delete, `/pm/appointments/${appointmentId}/dialysis`);
        yield put({ type: deleteDialysisStorage.type });
        yield put({ type: abortDialysisSuccess.type });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case abortDialysisSuccess.type: {
      if (location.pathname === ROUTES.main) {
        yield put({ type: getTodayPatientsAppointments.type });
      } else if (patientId) {
        yield put({ type: getDialysisProcessInfo.type, payload: patientId });
      }
      yield put(removeServiceModal(ServiceModalName.DialysisProcedureModal));
      break;
    }
  }
}

function* skipAppointmentSaga({ payload: { id, data, skipPlace } }: PayloadAction<SkipAppointmentPayload>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const dialysisStatus = yield select((state) => state.dialysis.status.activeStep);
  try {
    if (dialysisStatus === DialysisStatus.Cancelled) {
      yield call(API.put, `/pm/appointments/${id}/cancel-info`, data);
    } else {
      yield call(API.post, `/pm/appointments/${id}/cancel`, data);
    }
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t(
          `dialysis:${dialysisStatus === DialysisStatus.Cancelled ? 'appointmentHasChanged' : 'appointmentHasSkipped'}`,
        ),
      },
    });
    yield put({ type: skipAppointmentSuccess.type });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }

  yield put(removeServiceModal(ServiceModalName.SkipAppointmentModal));
  yield updateSummarySaga(appointmentId);
  if (skipPlace === AppointmentEventPlace.Services) {
    yield getServicesSaga(id);
    yield put({ type: getTodayPatientsAppointments.type });
  }
  if (skipPlace === AppointmentEventPlace.Scheduler) {
    yield updateAppointmentsSaga();
  }
}

function* reactivateAppointmentSaga({ payload }: PayloadAction<number>) {
  try {
    yield call(API.post, `/pm/appointments/${payload}/reactivation`);
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t('dialysis:appointmentHasReactivated'),
      },
    });
    yield put({ type: reactivateAppointmentSuccess.type });
    yield getServicesSaga(payload);
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
  yield put(removeServiceModal(ServiceModalName.ConfirmModal));
}

function* hdReadingSuccessSaga({ type }: PayloadAction<any>) {
  switch (type) {
    case initDialysisStorageSuccess.type: {
      yield put({ type: updateDialysisHdReadingList.type });
      break;
    }
    case deleteDialysisHdReadingSuccess.type:
    case editDialysisHdReadingSuccess.type:
    case addDialysisHdReadingToStorageSuccess.type: {
      yield put({ type: sendDialysisStorageRecords.type });
      break;
    }
    case sendDialysisStorageRecordsSuccess.type: {
      if (navigator.onLine) {
        yield put({
          type: deleteDialysisHdReadingsFromStorage.type,
        });
      } else {
        yield put({
          type: updateDialysisHdReadingList.type,
        });
      }
      break;
    }
    case deleteDialysisHdReadingsFromStorageSuccess.type: {
      yield put({ type: updateDialysisHdReadingList.type, payload: { type: UpdateHdRecordsType.UpdateAfterSending } });
      break;
    }
  }
}

function* hdReadingSaga({ type, payload }: PayloadAction<any>) {
  const storage: IndexedDbStorage<HdProgressRecordWithOperation> = yield select(
    (state) => state.dialysis.hdReading.storage,
  );
  const dialysisId = yield select((state) => state.dialysis.dialysisId);
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const hdReadingRecordStatus = yield select((state) => state.dialysis.hdReading.isEditing);
  const patientId = yield select((state) => state.serviceModal[ServiceModalName.DialysisProcedureModal]?.patientId);
  const savedRecords = yield select((state) => state.dialysis.hdReading.savedRecords);
  const bay = yield select((state) => state.dialysis.bay);
  switch (type) {
    case initDialysisStorage.type: {
      try {
        yield IndexedDbStorage.cleanAllDatabasesByNamePattern(/-dialysis-/);

        const store = new IndexedDbStore(
          `hd-readings`,
          [
            new IndexedDbIndex('id', 'id'),
            new IndexedDbIndex('patientId', 'patientId'),
            new IndexedDbIndex('time', 'time'),
            new IndexedDbIndex('hr', 'hr'),
            new IndexedDbIndex('ap', 'ap'),
            new IndexedDbIndex('vp', 'vp'),
            new IndexedDbIndex('tmp', 'tmp'),
            new IndexedDbIndex('ufRate', 'ufRate'),
            new IndexedDbIndex('qb', 'qb'),
            new IndexedDbIndex('qd', 'qd'),
            new IndexedDbIndex('heparinRate', 'heparinRate'),
            new IndexedDbIndex('cumHeparin', 'cumHeparin'),
            new IndexedDbIndex('cumUf', 'cumUf'),
            new IndexedDbIndex('totalUf', 'totalUf'),
            new IndexedDbIndex('conductivity', 'conductivity'),
            new IndexedDbIndex('dialysateTemp', 'dialysateTemp'),
            new IndexedDbIndex('ktV', 'ktV'),
            new IndexedDbIndex('urr', 'urr'),
            new IndexedDbIndex('duringHdNotes', 'duringHdNotes'),
            new IndexedDbIndex('signedBy', 'signedBy'),
            new IndexedDbIndex('modifyingOperation', 'modifyingOperation'),
            new IndexedDbIndex('signedById', 'signedById'),
            new IndexedDbIndex('systolicBp', 'systolicBp'),
            new IndexedDbIndex('diastolicBp', 'diastolicBp'),
          ],
          {
            keyPath: 'id',
          },
        );
        const indexedDbStorage = new IndexedDbStorage<HdProgressRecord>({
          tableName: `patient-${patientId}-dialysis-${dialysisId}`,
          version: 5,
          stores: [store],
        });
        yield indexedDbStorage.openDb();
        yield put({ type: initDialysisStorageSuccess.type, payload: indexedDbStorage });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case addDialysisHdReadingToStorage.type: {
      try {
        if (storage) {
          yield storage
            .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
            .add({
              ...payload,
              id: uniqid(),
              modifyingOperation: HdReadingOfflineOperationType.Create,
              createdAt: new Date().toISOString(),
              bay,
            })
            .endTransaction();
        }
        yield put({ type: addDialysisHdReadingToStorageSuccess.type });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case deleteDialysisHdReadingsFromStorage.type: {
      try {
        if (storage) {
          yield storage
            .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
            .deleteAll()
            .endTransaction();
        }
        yield put({ type: deleteDialysisHdReadingsFromStorageSuccess.type });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case sendDialysisStorageRecords.type: {
      try {
        if (navigator.onLine && !hdReadingRecordStatus) {
          const records = yield storage.startTransaction('hd-readings').readAll().endTransaction();
          const recordsForSend = records.filter(
            (record) => record.modifyingOperation !== HdReadingOfflineOperationType.Delete,
          );
          const recordsForDelete = records.filter(
            (record) => record.modifyingOperation === HdReadingOfflineOperationType.Delete,
          );
          if (records && records.length) {
            if (recordsForSend.length > 0) {
              yield call(
                API.post,
                `pm/appointments/${appointmentId}/dialysis/readings`,
                recordsForSend.map((record) => {
                  return record.modifyingOperation === HdReadingOfflineOperationType.Update
                    ? {
                        ...record,
                        operation: record.modifyingOperation,
                        signedBy: record.signedById,
                        patientId,
                      }
                    : {
                        ...record,
                        patientId,
                        operation: record.modifyingOperation,
                        signedBy: record.signedById,
                        id: null,
                      };
                }),
                { headers: { 'multiline-fields': 'duringHdNotes' } },
              );
            }
            if (recordsForDelete.length > 0) {
              const deleteRecords = recordsForDelete.map((record) =>
                call(API.delete, `pm/appointments/${appointmentId}/dialysis/readings/${record.id}`),
              );
              yield all(deleteRecords);
            }
            yield put({
              type: addSnack.type,
              payload: { type: SnackType.Success, message: i18n.t('dialysis:dataHasBeenSaved') },
            });
          }
        }
        yield put({ type: sendDialysisStorageRecordsSuccess.type });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case updateDialysisHdReadingList.type: {
      try {
        const newAllRecords: HdReadingRecordsRequest[] = [];
        const newSavedRecords: HdReadingRecordsRequest[] = [];
        if (navigator.onLine) {
          const response: AxiosResponse<HdReadingRecordsResponse[]> = yield call(
            API.get,
            `hdd/dialysis/${dialysisId}/readings`,
          );
          newSavedRecords.push(...response.data);
          newAllRecords.push(...response.data);
          const oldFieldsIds = savedRecords.map((record) => record.id);
          const newFields = response.data.filter((record) => !oldFieldsIds.includes(record.id));
          if (newFields.length > 0 && payload?.type === UpdateHdRecordsType.UpdateAfterSending) {
            yield put(
              addHighlightToRows({
                rows: newFields.map((record) => ({
                  id: record.id,
                  type: RowHighlightType.SuccessfullyAdded,
                })),
              }),
            );
          }
        } else {
          const storageRecords = storage
            ? yield storage.startTransaction('hd-readings').readAll().endTransaction()
            : [];
          newSavedRecords.push(...savedRecords);
          const storageRecordsIds: HdProgressRecordWithOperation[] = storageRecords.reduce(
            (records, record) =>
              record.modifyingOperation !== HdReadingOfflineOperationType.Delete ? [...records, record.id] : records,
            [],
          );
          const storageDeletedRecordsIds: HdProgressRecordWithOperation[] = storageRecords.reduce(
            (records, record) =>
              record.modifyingOperation === HdReadingOfflineOperationType.Delete ? [...records, record.id] : records,
            [],
          );
          const filteredSavedRecords = savedRecords.filter(
            (record) => !storageRecordsIds.includes(record?.id) && !storageDeletedRecordsIds.includes(record?.id),
          );
          newAllRecords.push(
            ...storageRecords.filter((record) => record.modifyingOperation !== HdReadingOfflineOperationType.Delete),
            ...filteredSavedRecords,
          );
        }

        yield put({
          type: updateDialysisHdReadingListSuccess.type,
          payload: {
            allRecords: newAllRecords,
            savedRecords: newSavedRecords,
          },
        });
      } catch (error) {
        yield put({ type: addDialysisError.type, payload: error });
      }
      break;
    }
    case changeHdReadingRecordStatus.type: {
      if (!hdReadingRecordStatus) {
        yield put({ type: sendDialysisStorageRecords.type });
      }
      break;
    }
    case deleteDialysisStorage.type: {
      if (storage) {
        yield storage.deleteDB();
        yield put({ type: deleteDialysisStorageSuccess.type });
      }
    }
  }
}

export function* editHdReadingSaga({ payload }: PayloadAction<EditHdReadingPayload>) {
  try {
    const storage: IndexedDbStorage<HdProgressRecordWithOperation> = yield select(
      (state) => state.dialysis.hdReading.storage,
    );
    const bay = yield select((state) => state.dialysis.bay);
    if (storage) {
      const [record] = yield storage.startTransaction('hd-readings').read(payload.hdReadingId).endTransaction();
      if (record) {
        yield storage
          .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
          .update([payload.hdReadingId], {
            ...payload.data,
            modifyingOperation:
              record.modifyingOperation === HdReadingOfflineOperationType.Create
                ? HdReadingOfflineOperationType.Create
                : HdReadingOfflineOperationType.Update,
          })
          .endTransaction();
      } else {
        yield storage
          .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
          .add({
            ...payload.data,
            id: payload.hdReadingId,
            modifyingOperation: HdReadingOfflineOperationType.Update,
            createdAt: new Date().toISOString(),
            bay,
          })
          .endTransaction();
      }
    }
    yield put({ type: editDialysisHdReadingSuccess.type });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

export function* deleteHdReadingSaga({ payload }: PayloadAction<number>) {
  try {
    const storage: IndexedDbStorage<Partial<HdProgressRecordWithOperation>> = yield select(
      (state) => state.dialysis.hdReading.storage,
    );
    const savedRecords = yield select((state) => state.dialysis.hdReading.savedRecords);
    if (storage) {
      const records: HdProgressRecordWithOperation[] = yield storage
        .startTransaction('hd-readings')
        .readAll()
        .endTransaction();
      const recordToDelete = records.find((record) => record.id === payload);
      const savedRecordToDelete = savedRecords.find((record) => record.id === payload);
      if (recordToDelete && savedRecordToDelete) {
        yield storage
          .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
          .update([recordToDelete.id], { modifyingOperation: HdReadingOfflineOperationType.Delete })
          .endTransaction();
      }
      if (!recordToDelete && savedRecordToDelete) {
        yield storage
          .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
          .add({
            id: payload,
            modifyingOperation: HdReadingOfflineOperationType.Delete,
          })
          .endTransaction();
      }
      if (recordToDelete && !savedRecordToDelete) {
        yield storage
          .startTransaction('hd-readings', IndexedDbStorageTransactionEnum.READ_WRITE)
          .delete(payload)
          .endTransaction();
      }
    }
    yield put({ type: deleteDialysisHdReadingSuccess.type });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

export function* getServicesSaga(appointmentId) {
  const { data: services } = yield call(API.get, `/pm/appointments/${appointmentId}/services`);
  yield put({ type: getServicesSuccess.type, payload: services });
}

function* currentStepSaga() {
  const { appointmentId } = yield select((state) => state.serviceModal[ServiceModalName.DialysisProcedureModal]);
  const currentStep: DialysisStatus = yield select((state) => state.dialysis.status.currentStep);
  const activeStep: DialysisStatus = yield select((state) => state.dialysis.status.activeStep);
  const patientId = yield select((state) => state.dialysis.patient?.id);
  try {
    switch (currentStep) {
      case DialysisStatus.Cancelled:
      case DialysisStatus.CheckIn: {
        yield put({ type: getServices.type });
        yield getServicesSaga(appointmentId);
        break;
      }
      case DialysisStatus.PreDialysis: {
        yield put({ type: getDialysis.type });
        let response: AxiosResponse<Dialysis>;
        if (activeStep === DialysisStatus.CheckIn) {
          response = yield call(API.post, `/pm/appointments/${appointmentId}/dialysis`);
          yield updateSummarySaga(appointmentId);
        } else {
          response = yield call(API.get, `/pm/appointments/${appointmentId}/dialysis/pre`);
        }

        yield put({ type: getDialysisPreSuccess.type, payload: response.data });
        break;
      }
      case DialysisStatus.HDReading: {
        yield put({ type: initDialysisStorage.type });
        break;
      }
      case DialysisStatus.PostDialysis: {
        yield put({ type: deleteDialysisStorage.type });
        yield put({ type: getPostHd.type });
        const { data: postDialysis }: AxiosResponse<PostHd> = yield call(
          API.get,
          `/pm/appointments/${appointmentId}/dialysis/post`,
        );
        yield put({ type: getPostHdSuccess.type, payload: postDialysis });
      }
    }
  } catch (error: any) {
    if (error?.response?.data[0]?.code === ERROR_CODES.DIALYSIS_CANNOT_BE_STARTED_WITHOUT_HD_ACCESS) {
      yield put(
        addServiceModal({
          name: ServiceModalName.ConfirmModal,
          payload: {
            cancelCallback: () => Event.fire(closeDialysisModal.type),
            closeCallback: () => Event.fire(closeDialysisModal.type),
            title: i18n.t('dialysis:thereIsNoActiveAccess'),
            text: i18n.t('dialysis:addAccessInformationToInitiateDialysis'),
            confirmButton: i18n.t('dialysis:addAccess'),
            cancelButton: null,
            navigatePath: `/patients-overview/${patientId}/access-management`,
          },
        }),
      );
      yield put(clearAccessManagementFormData());
      yield put(
        addDrawer({
          type: DrawerType.AccessManagementForm,
          status: DrawerStatus.Showed,
          payload: { id: patientId },
          allowedPathsToShowDrawer: [ROUTES.patientsOverview],
        }),
      );
      yield put({ type: setHasBeenRedirectedToAddAccess.type, payload: true });
    } else {
      yield put({ type: addDialysisError.type, payload: error });
    }
  }
}

function* getInitDialysisDataSaga({
  payload: { appointmentId, openOnStep },
}: PayloadAction<{ appointmentId: string; openOnStep?: DialysisStatus }>) {
  try {
    const appointmentSummary = yield getSummarySaga(appointmentId);
    const isServiceEncountered = appointmentSummary.status === AppointmentStatus.ServiceEncountered;

    yield put({ type: setIsServiceEncountered, payload: isServiceEncountered });

    yield put({
      type: setCurrentStep.type,
      payload: openOnStep || (isServiceEncountered ? DialysisStatus.CheckIn : appointmentSummary.status),
    });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* updateSummarySaga(appointmentId) {
  try {
    yield getSummarySaga(appointmentId);
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* getSummarySaga(appointmentId) {
  const { data: appointmentSummary }: AxiosResponse<DialysisResponse> = yield call(
    API.get,
    `pm/appointments/${appointmentId}/summary`,
  );
  const isServiceEncountered = appointmentSummary.status === AppointmentStatus.ServiceEncountered;

  yield put({ type: setIsServiceEncountered, payload: isServiceEncountered });

  const setStatus = () => {
    if (appointmentSummary.status === DialysisStatus.Completed || isServiceEncountered) {
      return DialysisStatus.CheckIn;
    }
    return appointmentSummary.status;
  };

  const status = {
    activeStep: isServiceEncountered ? DialysisStatus.CheckIn : appointmentSummary.status,
    currentStep: setStatus(),
  };

  yield put({
    type: getInitialDialysisDataSuccess.type,
    payload: {
      ...appointmentSummary,
      status,
    },
  });

  return {
    ...appointmentSummary,
    status: setStatus(),
  };
}

function* saveDialysisPreSaga({ payload: { source, ...payload } }: PayloadAction<PreDialysisRequest>) {
  const appointmentId = yield select(
    (state) => state.serviceModal[ServiceModalName.DialysisProcedureModal]?.appointmentId,
  );

  try {
    const { data: preDialysis }: AxiosResponse<Dialysis> = yield call(
      API.post,
      `pm/appointments/${appointmentId}/dialysis/pre`,
      payload,
      { headers: { 'multiline-fields': 'patientCondition,accessCondition,notes' } },
    );
    yield put({ type: saveDialysisPreSuccess.type, payload: preDialysis });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('dialysis:dataHasBeenSaved') },
    });
    yield put({
      type: setCurrentStep.type,
      payload: DialysisStatus.PreDialysis,
    });
    if (source === DialysisSubmitSource.HEADER) {
      Event.fire(openStartHDModal.type);
    }
  } catch (error: any) {
    if (
      error?.response?.data?.length &&
      error.response.data[0] &&
      error.response.data[0].code === 'HD_ACCESS_NOT_SELECTED'
    ) {
      Event.fire(scrollToAccessManagementSection.type);
    }

    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* startHdSaga({ payload }: PayloadAction<StartHdForm>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  try {
    yield call(API.post, `/pm/appointments/${appointmentId}/dialysis/procedure/start`, payload);
    yield put({ type: resetSubmitting.type });
    yield put({ type: setCurrentStep.type, payload: DialysisStatus.HDReading });
    yield updateSummarySaga(appointmentId);
    yield put({ type: setTodayPatientsFilterDate.type, payload: new Date() });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* finishHdSaga({ payload }: PayloadAction<FinishHdForm>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  try {
    yield call(API.post, `/pm/appointments/${appointmentId}/dialysis/procedure/finish`, payload);
    yield put({ type: resetSubmitting.type });
    yield put({ type: setCurrentStep.type, payload: DialysisStatus.PostDialysis });
    yield updateSummarySaga(appointmentId);
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* savePostHdSaga({ payload: { source, ...payload } }: PayloadAction<PostHdRequest>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  try {
    const { data: postDialysis }: AxiosResponse<PostHd> = yield call(
      API.post,
      `/pm/appointments/${appointmentId}/dialysis/post`,
      payload,
      { headers: { 'multiline-fields': 'patientCondition,accessCondition,bleedingStatus,text' } },
    );
    yield put({ type: getPostHdSuccess.type, payload: postDialysis });
    yield put({ type: savePostHdSuccess.type });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('dialysis:dataHasBeenSaved') },
    });
    if (source === DialysisSubmitSource.HEADER) {
      yield put({ type: finishAndSaveHd.type });
    }
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* finishAndSaveHdSaga() {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const patientId = yield select((state) => state.patient.patient?.id);
  try {
    yield call(API.post, `/pm/appointments/${appointmentId}/dialysis/finish`);
    yield put({ type: finishAndSaveHdSuccess.type });

    if (location.pathname === ROUTES.main) {
      yield put({ type: getTodayPatientsAppointments.type });
    } else if (patientId) {
      yield put({ type: getDialysisProcessInfo.type, payload: patientId });
    }
    yield put({ type: deleteDialysisStorage.type });
    yield put({ type: removeServiceModal.type, payload: ServiceModalName.DialysisProcedureModal });
  } catch (error) {
    yield put({ type: addDialysisError.type, payload: error });
  }
}

function* saveAdministeringVaccinationMedicationSaga({
  payload: { serviceId, resolution, serviceType, mode },
}: PayloadAction<AdministerVaccinationMedicationPayload>) {
  const isMedication = serviceType === VaccineMedicationServiceType.Medication;
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const getSnackMessage = () => {
    switch (true) {
      case mode === VaccinationMedicationModalType.Editing:
        return `dialysis:${isMedication ? 'medication' : 'vaccine'}HasChanged`;
      case resolution?.resolution === VaccinationMedicationResolution.Administered:
        return `dialysis:${isMedication ? 'medication' : 'vaccine'}HasAdministered`;
      case resolution?.resolution === VaccineMedicationOmittingStatus.Rescheduled:
        return `dialysis:${isMedication ? 'medication' : 'vaccine'}HasRescheduled`;
      default:
        return `dialysis:${isMedication ? 'medication' : 'vaccine'}HasOmitted`;
    }
  };
  try {
    yield call(
      API[mode === VaccinationMedicationModalType.Editing ? 'put' : 'post'],
      `/pm/appointments/${appointmentId}/${
        isMedication ? 'medication-requests' : 'vaccinations'
      }/${serviceId}/resolution`,
      resolution,
      { headers: { 'multiline-fields': 'comments,comment' } },
    );
    yield put({ type: saveAdministeringVaccinationMedicationSuccess.type });
    yield put(removeServiceModal(ServiceModalName.VaccineMedicationAdministeringModal));
    yield getServicesSaga(appointmentId);
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t(getSnackMessage()) },
    });
  } catch (error: any) {
    yield put({ type: addDialysisError.type, payload: error });
    if (
      error?.response?.data[0]?.code === ERROR_CODES.NO_APPOINTMENTS ||
      error?.response?.data[0]?.code === ERROR_CODES.NEXT_HD_PRESCRIPTION_CANNOT_BE_FOUND
    ) {
      yield put({
        type: addServiceModal.type,
        payload: {
          name: ServiceModalName.ConfirmModal,
          payload: {
            cancelButton: null,
            confirmButton: i18n.t('common:button.ok'),
            title: i18n.t('common:noScheduledHdSession'),
          },
        },
      });
    }
  }
}

export function* dialysisSagaWatcher() {
  yield takeLatest(setCurrentStep.type, currentStepSaga);
  yield takeLatest(getInitDialysisData.type, getInitDialysisDataSaga);
  yield takeLatest(reactivateAppointment.type, reactivateAppointmentSaga);
  yield takeLatest(skipAppointment.type, skipAppointmentSaga);
  yield takeLatest(
    [
      initDialysisStorage.type,
      submitDialysisHdReading.type,
      addDialysisHdReadingToStorage.type,
      changeHdReadingRecordStatus.type,
      sendDialysisStorageRecords.type,
      deleteDialysisHdReadingsFromStorage.type,
      updateDialysisHdReadingList.type,
      deleteDialysisStorage.type,
    ],
    hdReadingSaga,
  );
  yield takeLatest([editDialysisHdReading.type], editHdReadingSaga);
  yield takeLatest([deleteDialysisHdReading.type], deleteHdReadingSaga);
  yield takeLatest(
    [
      addDialysisHdReadingToStorageSuccess.type,
      editDialysisHdReadingSuccess.type,
      deleteDialysisHdReadingSuccess.type,
      sendDialysisStorageRecordsSuccess.type,
      initDialysisStorageSuccess.type,
      updateDialysisHdReadingListSuccess.type,
      deleteDialysisHdReadingsFromStorageSuccess.type,
    ],
    hdReadingSuccessSaga,
  );
  yield takeLatest(saveDialysisPre.type, saveDialysisPreSaga);
  yield takeLatest(startHd.type, startHdSaga);
  yield takeLatest(systemUpdateNetworkConnection.type, dialysisNetworkConnectionSaga);
  yield takeLatest(finishHd.type, finishHdSaga);
  yield takeLatest([abortDialysis.type, abortDialysisSuccess.type], abortDialysisSaga);
  yield takeLatest(savePostHd.type, savePostHdSaga);
  yield takeLatest(finishAndSaveHd.type, finishAndSaveHdSaga);
  yield takeLatest(saveAdministeringVaccinationMedication.type, saveAdministeringVaccinationMedicationSaga);
}
