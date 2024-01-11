import { SystemUpdatePageFocusPayload } from '@store/slices/systemSlice';
import { PayloadAction } from '@reduxjs/toolkit';
export declare function checkTokenAfterInactivitySaga({
  payload: { isActive },
}: PayloadAction<SystemUpdatePageFocusPayload>): Generator<
  | import('redux-saga/effects').CallEffect<
      Generator<
        import('../types').InitData | import('redux-saga/effects').CallEffect<unknown> | null,
        void,
        {
          clientId: any;
          authUrl: any;
        } & import('axios').AxiosResponse<import('../types').RefreshTokenResponse, any>
      >
    >
  | import('redux-saga/effects').PutEffect<{
      type: 'init/setAppLoading';
      payload: boolean;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/logOut';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: Error;
      type: 'system/systemAddError';
    }>,
  void,
  unknown
>;
export declare function updateNetworkConnectionSaga(): Generator<
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      payload: import('../types').SnackState & {
        noDuplicates?: boolean | undefined;
        clear?: boolean | undefined;
      };
      type: 'snack/addSnack';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: Error;
      type: 'system/systemAddError';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'system/systemUpdatePageFocus';
      payload: {
        isActive: boolean;
      };
    }>,
  void,
  unknown
>;
export declare function fetchNotificationContinuouslySaga(): Generator<
  | import('redux-saga/effects').CallEffect<true>
  | import('redux-saga/effects').SelectEffect
  | import('redux-saga/effects').PutEffect<{
      type: 'notification/fetchNotifications';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'system/fetchNotificationContinuously';
    }>,
  void,
  unknown
>;
export declare function systemSagaTakeEvery(): Generator<import('redux-saga/effects').ForkEffect<never>, void, unknown>;
