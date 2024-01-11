import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { DrawerType, LabOrderEventPlace, ServiceModalName, SnackType } from '@enums';
import { CreateLabTestPayload, LabOrderForEditingResponse, PerformLabTestPayload } from '@types';
import { LabOrdersResponse } from '@src/types';
export declare function getLabOrdersListSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').HighlightedRow[];
      type: 'labOrders/setHighlightedRows';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/updateLabOrdersListSuccess';
      payload: {
        content: import('@types').LabOrdersContent[];
        pagination: {
          currentPage: number;
          perPage: number;
          totalCount: number;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/addLabOrdersError';
      payload: Error;
    }>,
  void,
  {
    patient: any;
    labIds: any;
    order: any;
    shifts: any;
    procedures: any;
    from: any;
    to: any;
    planFrom: any;
    planTo: any;
    appointmentFrom: any;
    appointmentTo: any;
    appointmentId: any;
    submissionFrom: any;
    submissionTo: any;
    resultFrom: any;
    resultTo: any;
    type: any;
  } & AxiosResponse<LabOrdersResponse, any>
>;
export declare function submitLabOrderSaga({
  payload: { id, type, place, mode, formData },
}: PayloadAction<CreateLabTestPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: ServiceModalName;
      type: 'modal/removeServiceModal';
    }>
  | Generator<
      | import('redux-saga/effects').CallEffect<unknown>
      | import('redux-saga/effects').PutEffect<{
          type: 'dialysis/getServicesSuccess';
          payload: any;
        }>,
      void,
      {
        data: any;
      }
    >
  | import('redux-saga/effects').PutEffect<{
      payload: DrawerType;
      type: 'drawer/removeDrawer';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'labOrders/getFilteredLabOrdersList';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/createLabOrderSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/addLabOrdersError';
      payload: any;
    }>,
  void,
  unknown
>;
export declare function performLabOrderSaga({
  payload: { orderId, place, formData },
}: PayloadAction<PerformLabTestPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: ServiceModalName;
      type: 'modal/removeServiceModal';
    }>
  | Generator<
      | import('redux-saga/effects').CallEffect<unknown>
      | import('redux-saga/effects').PutEffect<{
          type: 'dialysis/getServicesSuccess';
          payload: any;
        }>,
      void,
      {
        data: any;
      }
    >
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'labOrders/getFilteredLabOrdersList';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/performLabOrderSuccess';
      payload: LabOrderForEditingResponse;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/addLabOrdersError';
      payload: any;
    }>,
  void,
  AxiosResponse<LabOrderForEditingResponse, any>
>;
export declare function labOrdersCrudSuccessSaga({
  type,
}: PayloadAction<{
  type: string;
}>): Generator<
  | import('redux-saga/effects').PutEffect<{
      payload: undefined;
      type: 'labOrders/getFilteredLabOrdersList';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>,
  void,
  unknown
>;
export declare function deleteUrgentLabOrderSaga({
  type,
  payload: { id, place },
}: PayloadAction<{
  id: string;
  place: LabOrderEventPlace;
}>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').SelectEffect
  | Generator<
      | import('redux-saga/effects').CallEffect<unknown>
      | import('redux-saga/effects').PutEffect<{
          type: 'dialysis/getServicesSuccess';
          payload: any;
        }>,
      void,
      {
        data: any;
      }
    >
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/deleteUrgentLabOrderSuccess';
      payload: any;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/deleteLabResultSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'labOrders/addLabOrdersError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function labOrdersSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
