import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type { AccessManagementSliceState, AccessManagement } from '@types';

export type submitAccessManagementPayload = {
  accessManagement: AccessManagement;
  patientId: string;
  hdAccessId?: string;
};

const initialState: AccessManagementSliceState = {
  accessManagementLoaded: false,
  submitting: false,
  loading: false,
  saveSuccess: false,
  isFileLoading: false,
  error: undefined,
  accessManagementForm: null,
  accessManagement: [],
};

export const AccessManagementSlice = createSlice({
  name: 'accessManagement',
  initialState,
  reducers: {
    clearAccessManagementSaveSuccessState: (state) => {
      state.saveSuccess = false;
    },
    submitAccessManagement: (state, payload: PayloadAction<submitAccessManagementPayload>) => {
      state.submitting = true;
    },
    accessManagementError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.submitting = false;
      state.saveSuccess = false;
      state.error = payload?.message;
    },
    submitAccessManagementSuccess: (state, payload: PayloadAction<submitAccessManagementPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.submitting = false;
    },
    getAccessManagements: (state, payload: PayloadAction<string>) => {
      state.loading = true;
    },
    getAccessManagementSuccess: (state, { payload }: PayloadAction<AccessManagement[]>) => {
      state.accessManagement = payload;
      state.loading = false;
    },
    clearAccessManagementFormData: (state) => {
      state.accessManagementForm = null;
    },
    addAccessManagementForm: (state, { payload }: PayloadAction<AccessManagement>) => {
      state.accessManagementForm = payload;
    },
    deleteAccessManagement: (state, { payload }: PayloadAction<{ hdAccessId: string; patientId: string }>) => {
      state.loading = true;
    },
    discontinueAccessManagement: (state, { payload }: PayloadAction<{ hdAccessId: string; patientId: string }>) => {
      state.loading = true;
    },
    exportAccessManagement: (state, { payload }: PayloadAction<{ hdAccessId: string; patientId: string }>) => {
      state.isFileLoading = true;
    },
    exportAccessManagementFinish: (state) => {
      state.isFileLoading = false;
    },
  },
});

export const {
  clearAccessManagementSaveSuccessState,
  submitAccessManagement,
  accessManagementError,
  submitAccessManagementSuccess,
  getAccessManagements,
  getAccessManagementSuccess,
  clearAccessManagementFormData,
  addAccessManagementForm,
  deleteAccessManagement,
  discontinueAccessManagement,
  exportAccessManagement,
  exportAccessManagementFinish,
} = AccessManagementSlice.actions;

export const selectAccessManagementForm = () => useAppSelector((state) => state.accessManagement.accessManagementForm);
export const selectAccessManagementSubmitting = () => useAppSelector((state) => state.accessManagement.submitting);
export const selectAccessManagementLoading = () => useAppSelector((state) => state.accessManagement.loading);
export const selectAccessManagementSaveDataSuccess = () =>
  useAppSelector((state) => state.accessManagement.saveSuccess);
export const selectAccessManagement = () => useAppSelector((state) => state.accessManagement.accessManagement);
export const selectIsAccessManagementFileLoading = () =>
  useAppSelector((state) => state.accessManagement.isFileLoading);

const accessManagementReducer = AccessManagementSlice.reducer;
export default accessManagementReducer;
