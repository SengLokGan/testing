import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import {
  VaccinationAlreadyAdministeredRequest,
  VaccinationForm,
  VaccinationResponse,
  VaccinationSliceState,
  VaccinationToAdministerRequest,
} from '@types';
import { VaccinationDrawerType, VaccinationStatus } from '@enums';
import { ERROR_CODES } from '@constants/global';

const initialState: VaccinationSliceState = {
  loading: false,
  submitting: false,
  saveSuccess: false,
  isFileLoading: false,
  errors: [],
  vaccinationForm: null,
  vaccinations: [],
};

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

export const vaccinationSlice = createSlice({
  name: 'vaccination',
  initialState,
  reducers: {
    getVaccinationsList(state, payload: PayloadAction<string>) {
      state.loading = true;
    },
    getVaccinationsListSuccess: (state, { payload }: PayloadAction<VaccinationResponse[]>) => {
      state.vaccinations = payload;
      state.loading = false;
      state.errors = [];
    },
    addVaccination: (state, { payload }: PayloadAction<AddVaccinationPayload>) => {
      state.submitting = true;
      state.saveSuccess = false;
    },
    addVaccinationSuccess: (state) => {
      state.submitting = false;
      state.saveSuccess = true;
      state.errors = [];
    },
    addVaccinationError: (state, { payload }: PayloadAction<Error>) => {
      state.submitting = false;
      state.saveSuccess = false;
      state.loading = false;
      state.errors = [...state.errors, payload];
    },
    editVaccination: (state, { payload }: PayloadAction<EditVaccinationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    editVaccinationSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
      state.vaccinationForm = null;
      state.errors = [];
    },
    addVaccinationFormData: (state, { payload }: PayloadAction<VaccinationForm>) => {
      state.vaccinationForm = payload;
    },
    clearVaccinationFormData: (state) => {
      state.vaccinationForm = null;
    },
    clearVaccinationSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
    deleteVaccination: (state, { payload }: PayloadAction<DeleteVaccinationPayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    deleteVaccinationSuccess: (state, { payload }: PayloadAction<DeleteVaccinationPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.vaccinationForm = null;
      state.errors = [];
    },
    exportVaccination: (state, { payload }: PayloadAction<string>) => {
      state.isFileLoading = true;
    },
    exportVaccinationFinish: (state) => {
      state.isFileLoading = false;
      state.errors = [];
    },
  },
});

export const {
  getVaccinationsList,
  getVaccinationsListSuccess,
  addVaccination,
  addVaccinationSuccess,
  addVaccinationError,
  addVaccinationFormData,
  clearVaccinationFormData,
  clearVaccinationSaveSuccess,
  editVaccination,
  editVaccinationSuccess,
  deleteVaccination,
  deleteVaccinationSuccess,
  exportVaccination,
  exportVaccinationFinish,
} = vaccinationSlice.actions;

export const selectVaccinations = () => useAppSelector((state) => state.vaccination.vaccinations);
export const selectVaccinationsLoading = () => useAppSelector((state) => state.vaccination.loading);
export const selectVaccinationSubmitting = () => useAppSelector((state) => state.vaccination.submitting);

export const selectVaccinationSaveDataSuccess = () => useAppSelector((state) => state.vaccination.saveSuccess);
export const selectVaccinationForm = () => useAppSelector((state) => state.vaccination.vaccinationForm);
export const selectIsVaccinationFileLoading = () => useAppSelector((state) => state.vaccination.isFileLoading);
export const selectVaccinationS3AntivirusErrors = () =>
  useAppSelector((state) => {
    return state.vaccination.errors
      .filter((error) => error?.code === ERROR_CODES.S3_FILE_IS_NOT_FOUND)
      .map((error) => error.rejectedValue);
  });

const vaccinationReducer = vaccinationSlice.reducer;
export default vaccinationReducer;
