import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { MedicationDrawerType, MedicationStatus } from '@enums';
import type {
  MedicationForm,
  MedicationResponse,
  MedicationRequest,
  DiscontinueMedicationRequest,
  MedicationSliceState,
} from '@types';

const initialState: MedicationSliceState = {
  loading: false,
  saveSuccess: false,
  isFileLoading: false,
  error: undefined,
  medicationForm: null,
  medications: [],
};

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

export const medicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    getMedicationsList(state, payload: PayloadAction<string>) {
      state.loading = true;
    },
    getMedicationsListSuccess: (state, { payload }: PayloadAction<MedicationResponse[]>) => {
      state.medications = payload;
      state.loading = false;
      state.error = null;
    },
    getMedicationsListError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    deleteMedication: (state, { payload }: PayloadAction<DeleteMedicationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    deleteMedicationSuccess: (state, { payload }: PayloadAction<DeleteMedicationPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.medicationForm = null;
    },
    deleteMedicationError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
      state.saveSuccess = false;
    },
    editMedication: (state, { payload }: PayloadAction<EditMedicationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    editMedicationSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
      state.medicationForm = null;
    },
    changeMedication: (state, { payload }: PayloadAction<ChangeMedicationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    changeMedicationError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.saveSuccess = false;
    },
    changeMedicationSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
      state.medicationForm = initialState.medicationForm;
    },
    addMedication: (state, { payload }: PayloadAction<AddMedicationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    addMedicationSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
    },
    addMedicationError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
      state.saveSuccess = false;
    },
    clearMedicationSaveSuccessState: (state) => {
      state.saveSuccess = false;
    },
    addMedicationFormData: (state, { payload }: PayloadAction<MedicationForm>) => {
      state.medicationForm = payload;
    },
    clearMedicationFormData: (state) => {
      state.medicationForm = null;
    },
    discontinueMedication: (state, { payload }: PayloadAction<DiscontinueMedicationRequest>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    discontinueMedicationSuccess: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.saveSuccess = true;
    },
    discontinueMedicationError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
      state.saveSuccess = false;
    },
    exportMedication: (state, { payload }: PayloadAction<string>) => {
      state.isFileLoading = true;
    },
    exportMedicationFinish: (state) => {
      state.isFileLoading = false;
    },
  },
});

export const {
  getMedicationsList,
  getMedicationsListSuccess,
  getMedicationsListError,
  addMedication,
  addMedicationSuccess,
  addMedicationError,
  clearMedicationSaveSuccessState,
  addMedicationFormData,
  editMedication,
  editMedicationSuccess,
  changeMedication,
  changeMedicationError,
  changeMedicationSuccess,
  clearMedicationFormData,
  deleteMedicationSuccess,
  deleteMedicationError,
  deleteMedication,
  discontinueMedication,
  discontinueMedicationError,
  discontinueMedicationSuccess,
  exportMedication,
  exportMedicationFinish,
} = medicationSlice.actions;

export const selectMedications = () => useAppSelector((state) => state.medications.medications);
export const selectMedicationsLoading = () => useAppSelector((state) => state.medications.loading);
export const selectMedicationSaveDataSuccess = () => useAppSelector((state) => state.medications.saveSuccess);
export const selectMedicationForm = () => useAppSelector((state) => state.medications.medicationForm);
export const selectSelectedMedicationStatus = (): MedicationStatus | null =>
  useAppSelector((state) => {
    const {
      medications: { medications: allMedications, medicationForm },
    } = state;
    const status = allMedications.find((medication) => medicationForm?.id === medication?.id)?.status;
    return status || null;
  });
export const selectMedicationFileLoading = () => useAppSelector((state) => state.medications.isFileLoading);

const medicationsReducer = medicationSlice.reducer;
export default medicationsReducer;
