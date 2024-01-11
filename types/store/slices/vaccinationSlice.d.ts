import { PayloadAction } from '@reduxjs/toolkit';
import {
  VaccinationAlreadyAdministeredRequest,
  VaccinationForm,
  VaccinationResponse,
  VaccinationSliceState,
  VaccinationToAdministerRequest,
} from '@types';
import { VaccinationDrawerType, VaccinationStatus } from '@enums';
export type AddVaccinationPayload = {
  id: string;
  vaccination: VaccinationToAdministerRequest | VaccinationAlreadyAdministeredRequest;
};
export type DeleteVaccinationPayload = {
  id: string;
  vaccinationId: number;
  status: VaccinationStatus;
};
export type EditVaccinationPayload = {
  vaccination: VaccinationToAdministerRequest | VaccinationAlreadyAdministeredRequest;
  id: string;
  vaccinationId: string;
  type?: VaccinationDrawerType;
};
export declare const vaccinationSlice: import('@reduxjs/toolkit').Slice<
  VaccinationSliceState,
  {
    getVaccinationsList(
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      payload: PayloadAction<string>,
    ): void;
    getVaccinationsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<VaccinationResponse[]>,
    ) => void;
    addVaccination: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<AddVaccinationPayload>,
    ) => void;
    addVaccinationSuccess: (state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>) => void;
    addVaccinationError: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    editVaccination: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<EditVaccinationPayload>,
    ) => void;
    editVaccinationSuccess: (state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>) => void;
    addVaccinationFormData: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<VaccinationForm>,
    ) => void;
    clearVaccinationFormData: (state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>) => void;
    clearVaccinationSaveSuccess: (state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>) => void;
    deleteVaccination: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<DeleteVaccinationPayload>,
    ) => void;
    deleteVaccinationSuccess: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<DeleteVaccinationPayload>,
    ) => void;
    exportVaccination: (
      state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    exportVaccinationFinish: (state: import('immer/dist/internal').WritableDraft<VaccinationSliceState>) => void;
  },
  'vaccination'
>;
export declare const getVaccinationsList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'vaccination/getVaccinationsList'
  >,
  getVaccinationsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VaccinationResponse[],
    'vaccination/getVaccinationsListSuccess'
  >,
  addVaccination: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AddVaccinationPayload,
    'vaccination/addVaccination'
  >,
  addVaccinationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vaccination/addVaccinationSuccess'>,
  addVaccinationError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'vaccination/addVaccinationError'>,
  addVaccinationFormData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    VaccinationForm,
    'vaccination/addVaccinationFormData'
  >,
  clearVaccinationFormData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vaccination/clearVaccinationFormData'>,
  clearVaccinationSaveSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vaccination/clearVaccinationSaveSuccess'>,
  editVaccination: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    EditVaccinationPayload,
    'vaccination/editVaccination'
  >,
  editVaccinationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vaccination/editVaccinationSuccess'>,
  deleteVaccination: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteVaccinationPayload,
    'vaccination/deleteVaccination'
  >,
  deleteVaccinationSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteVaccinationPayload,
    'vaccination/deleteVaccinationSuccess'
  >,
  exportVaccination: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'vaccination/exportVaccination'>,
  exportVaccinationFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'vaccination/exportVaccinationFinish'>;
export declare const selectVaccinations: () => any;
export declare const selectVaccinationsLoading: () => any;
export declare const selectVaccinationSubmitting: () => any;
export declare const selectVaccinationSaveDataSuccess: () => any;
export declare const selectVaccinationForm: () => any;
export declare const selectIsVaccinationFileLoading: () => any;
export declare const selectVaccinationS3AntivirusErrors: () => any;
declare const vaccinationReducer: import('redux').Reducer<VaccinationSliceState, import('redux').AnyAction>;
export default vaccinationReducer;
