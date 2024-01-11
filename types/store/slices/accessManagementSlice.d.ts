import { PayloadAction } from '@reduxjs/toolkit';
import type { AccessManagementSliceState, AccessManagement } from '@types';
export type submitAccessManagementPayload = {
  accessManagement: AccessManagement;
  patientId: string;
  hdAccessId?: string;
};
export declare const AccessManagementSlice: import('@reduxjs/toolkit').Slice<
  AccessManagementSliceState,
  {
    clearAccessManagementSaveSuccessState: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
    ) => void;
    submitAccessManagement: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      payload: PayloadAction<submitAccessManagementPayload>,
    ) => void;
    accessManagementError: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    submitAccessManagementSuccess: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      payload: PayloadAction<submitAccessManagementPayload>,
    ) => void;
    getAccessManagements: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      payload: PayloadAction<string>,
    ) => void;
    getAccessManagementSuccess: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      { payload }: PayloadAction<AccessManagement[]>,
    ) => void;
    clearAccessManagementFormData: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
    ) => void;
    addAccessManagementForm: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      { payload }: PayloadAction<AccessManagement>,
    ) => void;
    deleteAccessManagement: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      {
        payload,
      }: PayloadAction<{
        hdAccessId: string;
        patientId: string;
      }>,
    ) => void;
    discontinueAccessManagement: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      {
        payload,
      }: PayloadAction<{
        hdAccessId: string;
        patientId: string;
      }>,
    ) => void;
    exportAccessManagement: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
      {
        payload,
      }: PayloadAction<{
        hdAccessId: string;
        patientId: string;
      }>,
    ) => void;
    exportAccessManagementFinish: (
      state: import('immer/dist/internal').WritableDraft<AccessManagementSliceState>,
    ) => void;
  },
  'accessManagement'
>;
export declare const clearAccessManagementSaveSuccessState: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'accessManagement/clearAccessManagementSaveSuccessState'>,
  submitAccessManagement: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    submitAccessManagementPayload,
    'accessManagement/submitAccessManagement'
  >,
  accessManagementError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'accessManagement/accessManagementError'
  >,
  submitAccessManagementSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    submitAccessManagementPayload,
    'accessManagement/submitAccessManagementSuccess'
  >,
  getAccessManagements: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'accessManagement/getAccessManagements'
  >,
  getAccessManagementSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AccessManagement[],
    'accessManagement/getAccessManagementSuccess'
  >,
  clearAccessManagementFormData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'accessManagement/clearAccessManagementFormData'>,
  addAccessManagementForm: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AccessManagement,
    'accessManagement/addAccessManagementForm'
  >,
  deleteAccessManagement: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      hdAccessId: string;
      patientId: string;
    },
    'accessManagement/deleteAccessManagement'
  >,
  discontinueAccessManagement: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      hdAccessId: string;
      patientId: string;
    },
    'accessManagement/discontinueAccessManagement'
  >,
  exportAccessManagement: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      hdAccessId: string;
      patientId: string;
    },
    'accessManagement/exportAccessManagement'
  >,
  exportAccessManagementFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'accessManagement/exportAccessManagementFinish'>;
export declare const selectAccessManagementForm: () => any;
export declare const selectAccessManagementSubmitting: () => any;
export declare const selectAccessManagementLoading: () => any;
export declare const selectAccessManagementSaveDataSuccess: () => any;
export declare const selectAccessManagement: () => any;
export declare const selectIsAccessManagementFileLoading: () => any;
declare const accessManagementReducer: import('redux').Reducer<AccessManagementSliceState, import('redux').AnyAction>;
export default accessManagementReducer;
