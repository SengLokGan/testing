import type { Notification, NotificationSliceState } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export interface NotificationsSuccessPayload {
  notificationList: Notification[];
  unreadNotificationCount: number;
}
export declare const notificationSlice: import('@reduxjs/toolkit').Slice<
  NotificationSliceState,
  {
    fetchNotifications: (state: import('immer/dist/internal').WritableDraft<NotificationSliceState>) => void;
    fetchNotificationsSuccess: (
      state: import('immer/dist/internal').WritableDraft<NotificationSliceState>,
      {
        payload: { notificationList, unreadNotificationCount },
      }: PayloadAction<NotificationsSuccessPayload>,
    ) => void;
    fetchNotificationsError: (state: import('immer/dist/internal').WritableDraft<NotificationSliceState>) => void;
    markNotificationRead: (
      state: import('immer/dist/internal').WritableDraft<NotificationSliceState>,
      action: PayloadAction<number>,
    ) => void;
    markNotificationReadSuccess: (
      state: import('immer/dist/internal').WritableDraft<NotificationSliceState>,
      action: PayloadAction<number>,
    ) => void;
    markNotificationReadError: (
      state: import('immer/dist/internal').WritableDraft<NotificationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
  },
  'notification'
>;
export declare const fetchNotifications: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'notification/fetchNotifications'>,
  fetchNotificationsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    NotificationsSuccessPayload,
    'notification/fetchNotificationsSuccess'
  >,
  fetchNotificationsError: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'notification/fetchNotificationsError'>,
  markNotificationRead: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'notification/markNotificationRead'
  >,
  markNotificationReadSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'notification/markNotificationReadSuccess'
  >,
  markNotificationReadError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'notification/markNotificationReadError'
  >;
export declare const selectNotificationsCount: () => any;
export declare const selectNotifications: () => any;
declare const notificationReducer: import('redux').Reducer<NotificationSliceState, import('redux').AnyAction>;
export default notificationReducer;
