import type { RootState, SystemSliceState } from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

const initialState: SystemSliceState = {
  moduleBuildVersions: {},
  networkConnection: {
    isOnline: true,
    isOffline: false,
    backOnline: false,
    backOffline: false,
  },
  timeZone: '',
  page: {
    isActive: true,
  },
  error: undefined,
};

export interface SystemUpdatePageFocusPayload {
  isActive: boolean;
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    systemUpdateNetworkConnection: (state, { payload }: PayloadAction<SystemSliceState['networkConnection']>) => {
      state.networkConnection = payload;
    },
    systemUpdatePageFocus: (state, { payload }: PayloadAction<SystemUpdatePageFocusPayload>) => {
      state.page.isActive = payload.isActive;
    },
    fetchNotificationContinuously: () => {},
    systemAddError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
    },
    systemDispatch: (state, action: PayloadAction<any>) => {},
    setTimezone: (state, { payload }: PayloadAction<string>) => {
      state.timeZone = payload;
    },
    systemUpdateModuleBuildVersions: (state, { payload }: PayloadAction<{ [key: string]: string | undefined }>) => {
      state.moduleBuildVersions = { ...state.moduleBuildVersions, ...payload };
    },
  },
});

export const {
  systemUpdateNetworkConnection,
  systemUpdatePageFocus,
  fetchNotificationContinuously,
  systemAddError,
  systemDispatch,
  setTimezone,
  systemUpdateModuleBuildVersions,
} = systemSlice.actions;

export const selectSystemNetworkConnection = () => useAppSelector((state: RootState) => state.system.networkConnection);
export const selectSystemPageActivityStatus = () => useAppSelector((state: RootState) => state.system.page.isActive);
export const selectSystemIsOnline = () => useAppSelector((state: RootState) => state.system.networkConnection.isOnline);
export const selectTimezone = () => useAppSelector((state: RootState) => state.system.timeZone);
export const selectSystemModuleBuildVersions = () =>
  useAppSelector((state: RootState) => state.system.moduleBuildVersions);

const systemReducer = systemSlice.reducer;
export default systemReducer;
