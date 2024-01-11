import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type {
  HdPrescriptionForm,
  HdPrescriptionRequest,
  HdPrescriptionViewTable,
  HdSchedulingData,
  Shift,
  DiscontinueHdPrescriptionRequest,
  HdPrescriptionSliceState,
} from '@types';

export type AddHdPrescriptionPayload = {
  hdPrescription: HdPrescriptionRequest;
  id: string;
};

export type DeleteHdPrescriptionPayload = {
  patientId: string;
};

const initialState: HdPrescriptionSliceState = {
  prescriptionsLoaded: false,
  loading: false,
  submitting: false,
  saveSuccess: false,
  isFileLoading: false,
  error: undefined,
  hdPrescriptionForm: null,
  hdSchedulingForm: null,
  schedulingFormDirtyStatus: false,
  prescriptions: [],
  shiftDictionary: [],
};

export const hdPrescriptionsSlice = createSlice({
  name: 'hdPrescription',
  initialState,
  reducers: {
    getHdPrescriptionsList(state, payload: PayloadAction<string>) {
      state.prescriptionsLoaded = false;
      state.loading = true;
    },
    getHdPrescriptionsListSuccess: (state, { payload }: PayloadAction<HdPrescriptionViewTable>) => {
      state.prescriptions = payload.content;
      state.prescriptionsLoaded = true;
      state.loading = false;
      state.error = undefined;
    },
    addHdPrescriptionsError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
      state.submitting = false;
      state.saveSuccess = false;
    },
    addHdPrescription: (state, { payload }: PayloadAction<AddHdPrescriptionPayload>) => {
      state.submitting = true;
      state.loading = true;
      state.saveSuccess = false;
    },
    addHdSchedulingData: (state, { payload }: PayloadAction<HdSchedulingData | null>) => {
      state.hdSchedulingForm = payload;
    },
    addHdPrescriptionSuccess: (state) => {
      state.submitting = false;
      state.loading = false;
      state.saveSuccess = true;
    },
    clearHdPrescriptionSaveSuccessState: (state) => {
      state.saveSuccess = false;
      state.hdPrescriptionForm = null;
    },
    addHdPrescriptionFormData: (state, { payload }: PayloadAction<HdPrescriptionForm>) => {
      state.hdPrescriptionForm = payload;
    },
    clearHdPrescriptionFormData: (state) => {
      state.hdPrescriptionForm = null;
    },
    addHdPrescriptionError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.saveSuccess = false;
      state.submitting = false;
      state.error = payload;
    },
    deleteHdPrescription: (state, { payload }: PayloadAction<DeleteHdPrescriptionPayload>) => {
      state.loading = true;
    },
    deleteHdPrescriptionSuccess: (state) => {
      state.loading = false;
    },
    changeSchedulingFormStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.schedulingFormDirtyStatus = payload;
    },
    getShiftDictionary: () => {},
    getShiftDictionarySuccess: (state, { payload }: PayloadAction<Shift[]>) => {
      state.shiftDictionary = payload;
    },
    discontinueHdPrescription: (state, { payload }: PayloadAction<DiscontinueHdPrescriptionRequest>) => {
      state.submitting = true;
      state.saveSuccess = false;
    },
    discontinueHdPrescriptionSuccess: (state) => {
      state.submitting = false;
      state.saveSuccess = true;
    },
    exportHdPrescription: (state, { payload }: PayloadAction<string>) => {
      state.isFileLoading = true;
    },
    exportHdPrescriptionFinish: (state) => {
      state.isFileLoading = false;
    },
  },
});

export const {
  getHdPrescriptionsList,
  getHdPrescriptionsListSuccess,
  addHdPrescriptionsError,
  clearHdPrescriptionSaveSuccessState,
  addHdPrescription,
  addHdPrescriptionFormData,
  clearHdPrescriptionFormData,
  addHdPrescriptionError,
  addHdPrescriptionSuccess,
  addHdSchedulingData,
  deleteHdPrescription,
  deleteHdPrescriptionSuccess,
  changeSchedulingFormStatus,
  getShiftDictionary,
  getShiftDictionarySuccess,
  discontinueHdPrescription,
  discontinueHdPrescriptionSuccess,
  exportHdPrescription,
  exportHdPrescriptionFinish,
} = hdPrescriptionsSlice.actions;

export const selectHdPrescriptions = () => useAppSelector((state) => state.hdPrescriptions.prescriptions);
export const selectHdPrescriptionsLoading = () => useAppSelector((state) => state.hdPrescriptions.loading);
export const selectHdPrescriptionsLoaded = () => useAppSelector((state) => state.hdPrescriptions.prescriptionsLoaded);
export const selectHdPrescriptionSubmitting = () => useAppSelector((state) => state.hdPrescriptions.submitting);
export const selectHdPrescriptionForm = () => useAppSelector((state) => state.hdPrescriptions.hdPrescriptionForm);
export const selectHdSchedulingForm = () => useAppSelector((state) => state.hdPrescriptions.hdSchedulingForm);
export const selectHdPrescriptionSaveDataSuccess = () => useAppSelector((state) => state.hdPrescriptions.saveSuccess);
export const selectHdPrescriptionFileLoading = () => useAppSelector((state) => state.hdPrescriptions.isFileLoading);
export const selectHdSchedulingFormDirtyStatus = () =>
  useAppSelector((state) => state.hdPrescriptions.schedulingFormDirtyStatus);
export const selectShiftDictionary = () => useAppSelector((state) => state.hdPrescriptions.shiftDictionary);

const hdPrescriptionsReducer = hdPrescriptionsSlice.reducer;
export default hdPrescriptionsReducer;
