import { PayloadAction } from '@reduxjs/toolkit';
import { MedicationDrawerType, MedicationStatus } from '@enums';
import type {
  MedicationForm,
  MedicationResponse,
  MedicationRequest,
  DiscontinueMedicationRequest,
  MedicationSliceState,
} from '@types';
export type AddMedicationPayload = {
  medication: MedicationRequest;
  id: string;
};
export type ChangeMedicationPayload = {
  addMedicationData: AddMedicationPayload;
  discontinueMedicationData: DiscontinueMedicationRequest;
};
export type EditMedicationPayload = {
  medication: MedicationRequest;
  id: string;
  medicationId: string;
  type?: MedicationDrawerType;
};
export type DeleteMedicationPayload = {
  id: string;
  medicationId: string;
};
export declare const medicationSlice: import('@reduxjs/toolkit').Slice<
  MedicationSliceState,
  {
    getMedicationsList(
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      payload: PayloadAction<string>,
    ): void;
    getMedicationsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<MedicationResponse[]>,
    ) => void;
    getMedicationsListError: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    deleteMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<DeleteMedicationPayload>,
    ) => void;
    deleteMedicationSuccess: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<DeleteMedicationPayload>,
    ) => void;
    deleteMedicationError: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    editMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<EditMedicationPayload>,
    ) => void;
    editMedicationSuccess: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
    changeMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<ChangeMedicationPayload>,
    ) => void;
    changeMedicationError: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    changeMedicationSuccess: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
    addMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<AddMedicationPayload>,
    ) => void;
    addMedicationSuccess: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
    addMedicationError: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    clearMedicationSaveSuccessState: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
    addMedicationFormData: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<MedicationForm>,
    ) => void;
    clearMedicationFormData: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
    discontinueMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<DiscontinueMedicationRequest>,
    ) => void;
    discontinueMedicationSuccess: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    discontinueMedicationError: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    exportMedication: (
      state: import('immer/dist/internal').WritableDraft<MedicationSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    exportMedicationFinish: (state: import('immer/dist/internal').WritableDraft<MedicationSliceState>) => void;
  },
  'medications'
>;
export declare const getMedicationsList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'medications/getMedicationsList'
  >,
  getMedicationsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    MedicationResponse[],
    'medications/getMedicationsListSuccess'
  >,
  getMedicationsListError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'medications/getMedicationsListError'
  >,
  addMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<AddMedicationPayload, 'medications/addMedication'>,
  addMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/addMedicationSuccess'>,
  addMedicationError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'medications/addMedicationError'>,
  clearMedicationSaveSuccessState: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/clearMedicationSaveSuccessState'>,
  addMedicationFormData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    MedicationForm,
    'medications/addMedicationFormData'
  >,
  editMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    EditMedicationPayload,
    'medications/editMedication'
  >,
  editMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/editMedicationSuccess'>,
  changeMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeMedicationPayload,
    'medications/changeMedication'
  >,
  changeMedicationError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'medications/changeMedicationError'
  >,
  changeMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/changeMedicationSuccess'>,
  clearMedicationFormData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/clearMedicationFormData'>,
  deleteMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteMedicationPayload,
    'medications/deleteMedicationSuccess'
  >,
  deleteMedicationError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'medications/deleteMedicationError'
  >,
  deleteMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteMedicationPayload,
    'medications/deleteMedication'
  >,
  discontinueMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DiscontinueMedicationRequest,
    'medications/discontinueMedication'
  >,
  discontinueMedicationError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'medications/discontinueMedicationError'
  >,
  discontinueMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'medications/discontinueMedicationSuccess'
  >,
  exportMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'medications/exportMedication'>,
  exportMedicationFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'medications/exportMedicationFinish'>;
export declare const selectMedications: () => any;
export declare const selectMedicationsLoading: () => any;
export declare const selectMedicationSaveDataSuccess: () => any;
export declare const selectMedicationForm: () => any;
export declare const selectSelectedMedicationStatus: () => MedicationStatus | null;
export declare const selectMedicationFileLoading: () => any;
declare const medicationsReducer: import('redux').Reducer<MedicationSliceState, import('redux').AnyAction>;
export default medicationsReducer;
