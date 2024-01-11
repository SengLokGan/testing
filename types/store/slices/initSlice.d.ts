import type { PayloadAction } from '@reduxjs/toolkit';
import type { InitSliceState } from '@types';
export declare const initSlice: import('@reduxjs/toolkit').Slice<
  InitSliceState,
  {
    appInit: () => void;
    appInitSuccess(
      state: import('immer/dist/internal').WritableDraft<InitSliceState>,
      action: PayloadAction<boolean>,
    ): void;
    appInitError(state: import('immer/dist/internal').WritableDraft<InitSliceState>, action: PayloadAction<any>): void;
    setAppLoading(
      state: import('immer/dist/internal').WritableDraft<InitSliceState>,
      { payload }: PayloadAction<boolean>,
    ): void;
  },
  'init'
>;
export declare const appInit: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'init/appInit'>,
  appInitSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<boolean, 'init/appInitSuccess'>,
  setAppLoading: import('@reduxjs/toolkit').ActionCreatorWithPayload<boolean, 'init/setAppLoading'>,
  appInitError: import('@reduxjs/toolkit').ActionCreatorWithPayload<any, 'init/appInitError'>;
export declare const selectInitLoading: () => any;
declare const initReducer: import('redux').Reducer<InitSliceState, import('redux').AnyAction>;
export default initReducer;
