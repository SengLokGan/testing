import { AxiosResponse } from 'axios';
import type { RefreshTokenResponse, TokenResponse, User } from '@types';
export declare const ACTIVITY_TIMEOUT = 2400000;
export declare const TOKEN_EXPIRATION_TIME = 600;
export declare function updateToken(): Generator<
  import('@types').InitData | import('redux-saga/effects').CallEffect<unknown> | null,
  void,
  {
    clientId: any;
    authUrl: any;
  } & AxiosResponse<RefreshTokenResponse, any>
>;
export declare function fetchContinuouslySaga(): Generator<
  | import('@types').InitData
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/fetchTokenContinuouslySuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/fetchTokenContinuously';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/fetchTokenContinuouslyError';
    }>
  | null,
  void,
  AxiosResponse<TokenResponse, any>
>;
export declare function checkUserActivitySaga(): Generator<
  | import('redux-saga/effects').CallEffect<Generator<import('@types').InitData | null, void, unknown>>
  | import('redux-saga/effects').CallEffect<true>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/checkActivity';
    }>,
  void,
  unknown
>;
export declare function getUserSummarySaga(): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/getUserSummarySuccess';
      payload: {
        currentOrganizationId: any;
        currentBranchId: any;
        id: number;
        firstName: string;
        lastName: string;
        login: string;
        image?: string | undefined;
        organizations: import('@types').Organization[];
        roles: string[];
        permissions: string[];
        hasOpenEncounter: boolean;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'system/fetchNotificationContinuously';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'init/appInitSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'user/setError';
      payload: unknown;
    }>,
  void,
  AxiosResponse<User, any>
>;
export declare function userSagaWatcher(): Generator<import('redux-saga/effects').ForkEffect<never>, void, unknown>;
