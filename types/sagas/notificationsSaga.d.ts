import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import type { NotificationsResponse } from '@types';
export declare function fetchNotificationsSaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@store/slices').NotificationsSuccessPayload;
      type: 'notification/fetchNotificationsSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'notification/fetchNotificationsError';
      payload: unknown;
    }>,
  void,
  AxiosResponse<NotificationsResponse, any>
>;
export declare function markNotificationReadSaga({ payload }: PayloadAction<number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'notification/markNotificationReadSuccess';
      payload: number;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'notification/markNotificationReadError';
      payload: Error;
    }>,
  void,
  unknown
>;
export declare function notificationsSagaWatcher(): Generator<
  import('redux-saga/effects').ForkEffect<never>,
  void,
  unknown
>;
