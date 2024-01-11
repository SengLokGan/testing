import type { SystemSliceState } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export interface SystemUpdatePageFocusPayload {
  isActive: boolean;
}
export declare const systemSlice: import('@reduxjs/toolkit').Slice<
  SystemSliceState,
  {
    systemUpdateNetworkConnection: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      { payload }: PayloadAction<SystemSliceState['networkConnection']>,
    ) => void;
    systemUpdatePageFocus: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      { payload }: PayloadAction<SystemUpdatePageFocusPayload>,
    ) => void;
    fetchNotificationContinuously: () => void;
    systemAddError: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    systemDispatch: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      action: PayloadAction<any>,
    ) => void;
    setTimezone: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    systemUpdateModuleBuildVersions: (
      state: import('immer/dist/internal').WritableDraft<SystemSliceState>,
      {
        payload,
      }: {
        payload: {
          [key: string]: string | undefined;
        };
        type: string;
      },
    ) => void;
  },
  'system'
>;
export declare const systemUpdateNetworkConnection: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      isOnline: boolean;
      isOffline: boolean;
      backOnline: boolean;
      backOffline: boolean;
    },
    'system/systemUpdateNetworkConnection'
  >,
  systemUpdatePageFocus: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SystemUpdatePageFocusPayload,
    'system/systemUpdatePageFocus'
  >,
  fetchNotificationContinuously: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'system/fetchNotificationContinuously'>,
  systemAddError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'system/systemAddError'>,
  systemDispatch: import('@reduxjs/toolkit').ActionCreatorWithPayload<any, 'system/systemDispatch'>,
  setTimezone: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'system/setTimezone'>,
  systemUpdateModuleBuildVersions: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      [key: string]: string | undefined;
    },
    'system/systemUpdateModuleBuildVersions'
  >;
export declare const selectSystemNetworkConnection: () => any;
export declare const selectSystemPageActivityStatus: () => any;
export declare const selectSystemIsOnline: () => any;
export declare const selectTimezone: () => any;
export declare const selectSystemModuleBuildVersions: () => any;
declare const systemReducer: import('redux').Reducer<SystemSliceState, import('redux').AnyAction>;
export default systemReducer;
