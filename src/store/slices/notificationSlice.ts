import type { Notification, NotificationSliceState } from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

const initialState: NotificationSliceState = {
  loading: false,
  count: 0,
  notifications: [],
  error: null,
};

export interface NotificationsSuccessPayload {
  notificationList: Notification[];
  unreadNotificationCount: number;
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNotifications: (state) => {
      state.loading = true;
    },
    fetchNotificationsSuccess: (
      state,
      { payload: { notificationList, unreadNotificationCount } }: PayloadAction<NotificationsSuccessPayload>,
    ) => {
      state.loading = true;
      state.notifications = notificationList;
      state.count = unreadNotificationCount;
    },
    fetchNotificationsError: (state) => {
      state.loading = false;
    },
    markNotificationRead: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    markNotificationReadSuccess: (state, action: PayloadAction<number>) => {
      const notificationIndex = state.notifications.findIndex((notification) => {
        return notification.id === action.payload;
      });
      state.notifications[notificationIndex].isRead = true;
      state.count = state.count - 1;
      state.loading = false;
    },
    markNotificationReadError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const {
  fetchNotifications,
  fetchNotificationsSuccess,
  fetchNotificationsError,
  markNotificationRead,
  markNotificationReadSuccess,
  markNotificationReadError,
} = notificationSlice.actions;

export const selectNotificationsCount = () => useAppSelector((state) => state.notification.count);
export const selectNotifications = () => useAppSelector((state) => state.notification.notifications);

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
