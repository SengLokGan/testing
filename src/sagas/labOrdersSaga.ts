import i18n from 'i18next';
import { endOfDay, startOfDay } from 'date-fns';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { addSnack } from '@store/slices/snackSlice';
import { API } from '@utils';
import {
  addLabOrdersError,
  changeLabOrdersPaginationPage,
  changeLabOrdersPaginationRowsPerPage,
  clearLabOrderFilters,
  createLabOrderSuccess,
  deleteUrgentLabOrder,
  deleteUrgentLabOrderSuccess,
  deleteLabResult,
  deleteLabResultSuccess,
  exportLabOrder,
  exportLabOrders,
  exportLabOrdersFinish,
  getFilteredLabOrdersList,
  getLabTestPlan,
  getLabTestPlanSuccess,
  performLabOrder,
  performLabOrderSuccess,
  printSelectedOrders,
  setHighlightedRows,
  submitLabOrderForm,
  submitLabOrders,
  submitLabOrderSuccess,
  submitLabResultFile,
  submitLabResultFileError,
  submitLabResultFileSuccess,
  submitManualLabResultError,
  submitManualLabResults,
  submitManualLabResultsSuccess,
  updateLabOrdersListSuccess,
} from '@store/slices/labOrdersSlice';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import {
  DrawerType,
  LabOrderEventPlace,
  LabOrdersStatusFilters,
  LabOrderStatus,
  LabTestTypes,
  ServiceModalName,
  SnackType,
  FormType,
} from '@enums';
import {
  CreateLabTestPayload,
  LabOrderForEditingResponse,
  LabOrderSubmitResponse,
  PerformLabTestPayload,
  SubmitLabResultFilePayload,
} from '@types';
import { getServicesSaga } from './dialysisSaga';
import { removeDrawer } from '@store/slices/drawerSlice';
import { LabOrdersResponse, SubmitManualLabResultsPayload } from '@src/types';
import { getFileParamsFromHeaders } from '@utils/getFileParamsFromHeaders';
import { downloadFile } from '@utils/downloadFile';
import { ERROR_CODES } from '@constants/global';
import { theme } from '@src/styles';

export function* getLabOrdersListSaga() {
  const setFilterDate = (from: Date, to: Date) => ({
    from: from ? startOfDay(from) : null,
    to: to ? endOfDay(to) : null,
  });

  const serviceModalPayload = yield select((state) => state.serviceModal[ServiceModalName.DialysisProcedureModal]);
  const sortBy = yield select((state) => state.labOrders.sortBy);
  const sortDir = yield select((state) => state.labOrders.sortDir);
  const pagination = yield select((state) => state.labOrders.pagination);
  const {
    patient,
    labIds,
    order,
    shifts,
    procedures,
    from,
    to,
    planFrom,
    planTo,
    appointmentFrom,
    appointmentTo,
    appointmentId,
    submissionFrom,
    submissionTo,
    resultFrom,
    resultTo,
    type,
  } = yield select((state) => state.labOrders.filters);
  const statusFilters = yield select((state) => state.labOrders.statusFilters);
  const filteredFilters = {
    appointmentId,
    perform: setFilterDate(from, to),
    plan: setFilterDate(planFrom, planTo),
    appointmentDate: setFilterDate(appointmentFrom, appointmentTo),
    submission: setFilterDate(submissionFrom, submissionTo),
    result: setFilterDate(resultFrom, resultTo),
    patientId: patient ? patient.id : null,
    orderNumber: order ? order.label : null,
    shifts: shifts?.length ? shifts.map((shift) => shift.value) : null,
    procedureIds: procedures?.length ? procedures.map((procedure) => procedure.value) : null,
    labIds: labIds?.length ? labIds : null,
    statuses: statusFilters
      .filter((item) => item.selected && item.name !== LabOrdersStatusFilters.All)
      .map((filter) => filter.name),
    type,
  };

  try {
    const {
      data: { content, ...paginationData },
    }: AxiosResponse<LabOrdersResponse> = yield call(
      API.post,
      `/pm/lab-orders/search`,
      {
        ...filteredFilters,
        ...(serviceModalPayload?.appointmentId ? { appointmentId: serviceModalPayload?.appointmentId } : {}),
      },
      {
        params: {
          page: pagination.currentPage,
          size: pagination.perPage,
          sort: `${sortBy},${sortDir}`,
        },
      },
    );

    yield put(
      setHighlightedRows(
        content
          .filter((item) => item.status === LabOrderStatus.DRAFT)
          .map((filteredItem) => ({ id: filteredItem.id, color: theme.palette.error.light })),
      ),
    );

    yield put({
      type: updateLabOrdersListSuccess.type,
      payload: {
        content: content,
        pagination: {
          currentPage: paginationData.pageable.pageNumber,
          perPage: paginationData.pageable.pageSize,
          totalCount: paginationData.totalElements,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addLabOrdersError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* submitLabOrderSaga({
  payload: { id, type, place, mode, formData },
}: PayloadAction<CreateLabTestPayload>) {
  try {
    if (mode === FormType.Add) {
      yield call(API.post, '/pm/lab-orders', {
        ...formData,
        type,
      });
    } else {
      yield call(API.put, `/pm/lab-orders/${id}`, {
        ...formData,
        type,
      });
    }

    if (type === LabTestTypes.UrgentLabTest) {
      yield put(removeServiceModal(ServiceModalName.UrgentLabTest));
    }
    if (type === LabTestTypes.IndividualLab) {
      yield put(removeDrawer(DrawerType.IndividualLabTestPlanForm));
    }
    if (type === LabTestTypes.QuarterlyBT) {
      yield put(removeDrawer(DrawerType.QuarterlyBT));
    }

    if (place === LabOrderEventPlace.Dialysis) {
      const appointmentId = yield select((state) => state.dialysis.appointmentId);
      yield getServicesSaga(appointmentId);
    } else {
      yield put(getFilteredLabOrdersList());
    }
    yield put({ type: createLabOrderSuccess.type });
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t(
          mode === FormType.Add ? 'labOrders:forms.creation.hasBeenCreated' : 'labOrders:forms.labOrderUpdate',
        ),
      },
    });
  } catch (error: any) {
    yield put({ type: addLabOrdersError.type, payload: error });
  }
}

export function* performLabOrderSaga({ payload: { orderId, place, formData } }: PayloadAction<PerformLabTestPayload>) {
  try {
    const appointmentId = yield select((state) => state.dialysis.appointmentId);

    const response: AxiosResponse<LabOrderForEditingResponse> = yield call(
      API.post,
      `/pm/lab-orders/${orderId}/perform`,
      { ...formData },
      { headers: { 'multiline-fields': 'comments' } },
    );
    yield put(removeServiceModal(ServiceModalName.PerformLabTest));
    if (place === LabOrderEventPlace.Dialysis) {
      yield getServicesSaga(appointmentId);
    } else {
      yield put(getFilteredLabOrdersList());
    }
    yield put({ type: performLabOrderSuccess.type, payload: response.data });
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('labOrders:forms.perform.hasBeenPerformed') },
    });
  } catch (error: any) {
    yield put({ type: addLabOrdersError.type, payload: error });
  }
}

export function* labOrdersCrudSuccessSaga({ type }: PayloadAction<{ type: string }>) {
  yield put(getFilteredLabOrdersList());

  yield put({
    type: addSnack.type,
    payload: {
      type: SnackType.Delete,
      message: i18n.t(
        type === deleteLabResultSuccess.type ? 'labOrders:labResultDeleted' : 'labOrders:labOrderDeleted',
      ),
    },
  });
}

function* submitLabOrdersSaga({
  payload: { orderIds, place },
}: PayloadAction<{ orderIds: string[]; place: LabOrderEventPlace }>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);

  try {
    const { data }: AxiosResponse<LabOrderSubmitResponse> = yield call(API.post, `/pm/lab-orders/submit`, {
      orderIds,
    });

    if (place === LabOrderEventPlace.Dialysis) {
      yield getServicesSaga(appointmentId);
      yield put({ type: submitLabOrderSuccess.type });
    }
    const allSuccess = data.results.map((result) => result.success);
    const hasError = allSuccess.includes(false);
    yield put({
      type: addSnack.type,
      payload: {
        type: hasError ? SnackType.Error : SnackType.Success,
        message: i18n.t(`labOrders:${hasError ? 'notAllOrderSubmitted' : 'labOrderSubmitted'}`),
        clear: hasError,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addLabOrdersError.type, payload: error });
      yield put({
        type: addSnack.type,
        payload: { type: SnackType.Error, message: i18n.t('common:systemError') },
      });
    }
  }
}

export function* deleteUrgentLabOrderSaga({
  type,
  payload: { id, place },
}: PayloadAction<{ id: string; place: LabOrderEventPlace }>) {
  const appointmentId = yield select((state) => state.dialysis.appointmentId);
  const isLabOrder = type === deleteUrgentLabOrder.type;

  try {
    const response = yield call(API.delete, `/pm/lab-${isLabOrder ? 'orders' : 'results'}/${id}`);
    if (isLabOrder) {
      yield put({ type: deleteUrgentLabOrderSuccess.type, payload: response.data });
      if (place === LabOrderEventPlace.Dialysis) {
        yield getServicesSaga(appointmentId);
      }
    } else {
      yield put({ type: deleteLabResultSuccess.type });
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addLabOrdersError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

function* exportLabOrdersSaga() {
  const { patient, labIds, orderStatus, order, shifts, procedures, from, to, appointmentId } = yield select(
    (state) => state.labOrders.filters,
  );
  const params = {
    appointmentId,
    from: from ? startOfDay(from) : null,
    to: to ? endOfDay(to) : null,
    patientId: patient ? patient.id : null,
    orderNumber: order ? order.label : null,
    shifts: shifts?.length ? shifts.map((shift) => shift.value) : null,
    procedureIds: procedures?.length ? procedures.map((procedure) => procedure.value) : null,
    labIds: labIds?.length ? labIds : null,
    statuses: orderStatus?.length ? orderStatus : null,
  };

  try {
    const { data, headers }: AxiosResponse<Blob> = yield call(API.post, '/pm/lab-orders/export', params, {
      responseType: 'blob',
    });
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportLabOrdersFinish());
  } catch (error) {
    console.error(error);
    yield put(exportLabOrdersFinish());
  }
}

function* exportLabOrderSaga({ payload }: PayloadAction<number>) {
  try {
    const { data, headers }: AxiosResponse<Blob> = yield call(API.get, `/pm/lab-orders/${payload}/printing`, {
      responseType: 'blob',
    });
    const { fileName, fileType } = getFileParamsFromHeaders(headers);
    downloadFile(data, fileName, fileType);
    yield put(exportLabOrdersFinish());
  } catch (error) {
    console.error(error);
    yield put(exportLabOrdersFinish());
  }
}

function* printSelectedOrdersSaga({ payload }: PayloadAction<number[]>) {
  for (const labOrderId of payload) {
    yield put({ type: exportLabOrder.type, payload: labOrderId });
  }
}

function* submitManualLabResultsSaga({
  payload: { isEditing, labOrderId, submitData },
}: PayloadAction<SubmitManualLabResultsPayload>) {
  try {
    yield call(API[isEditing ? 'put' : 'post'], `/pm/lab-results/${labOrderId}`, { ...submitData });
    yield put({ type: submitManualLabResultsSuccess.type });
    yield put(removeServiceModal(ServiceModalName.EnterLabResultModal));
    yield put({
      type: addSnack.type,
      payload: {
        type: SnackType.Success,
        message: i18n.t(`labOrders:forms.manualResultEnter.${isEditing ? 'labResultChanged' : 'labResultAdded'}`),
      },
    });
    yield put(getFilteredLabOrdersList());
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
              payload: { type: SnackType.Error, message: i18n.t('common:systemError') },
            });
        }
        yield put({ type: submitManualLabResultError.type, payload: err });
      }
    }
  }
}

function* attachLabResultFileSaga({ payload: { file, labOrderId } }: PayloadAction<SubmitLabResultFilePayload>) {
  try {
    yield call(API.post, `/pm/lab-orders/${labOrderId}/files`, { file });
    yield put({ type: submitLabResultFileSuccess.type });
    yield put(removeServiceModal(ServiceModalName.AttachFileModal));
    yield put({
      type: addSnack.type,
      payload: { type: SnackType.Success, message: i18n.t('labOrders:fileAttached') },
    });
    yield put(getFilteredLabOrdersList());
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
              payload: { type: SnackType.Error, message: i18n.t('common:systemError') },
            });
        }
        yield put({ type: submitLabResultFileError.type, payload: err });
      }
    }
  }
}

function* getLabTestPlanSaga({ payload }: PayloadAction<string>) {
  try {
    const response = yield call(API.get, `/pm/lab-orders/${payload}`);

    yield put({
      type: getLabTestPlanSuccess.type,
      payload: response.data,
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: addLabOrdersError.type, payload: error });
    } else {
      console.error(error);
    }
  }
}

export function* labOrdersSagaWatcher() {
  yield takeLatest(
    [
      getFilteredLabOrdersList.type,
      clearLabOrderFilters.type,
      changeLabOrdersPaginationPage.type,
      changeLabOrdersPaginationRowsPerPage.type,
    ],
    getLabOrdersListSaga,
  );
  yield takeLatest(submitLabOrderForm.type, submitLabOrderSaga);
  yield takeLatest(performLabOrder.type, performLabOrderSaga);
  yield takeLatest(submitLabOrders.type, submitLabOrdersSaga);
  yield takeLatest([deleteUrgentLabOrder.type, deleteLabResult.type], deleteUrgentLabOrderSaga);
  yield takeLatest([deleteUrgentLabOrderSuccess.type, deleteLabResultSuccess.type], labOrdersCrudSuccessSaga);
  yield takeLatest(exportLabOrders.type, exportLabOrdersSaga);
  yield takeEvery(exportLabOrder.type, exportLabOrderSaga);
  yield takeLatest(printSelectedOrders.type, printSelectedOrdersSaga);
  yield takeLatest(submitManualLabResults.type, submitManualLabResultsSaga);
  yield takeLatest(submitLabResultFile.type, attachLabResultFileSaga);
  yield takeLatest(getLabTestPlan.type, getLabTestPlanSaga);
}
