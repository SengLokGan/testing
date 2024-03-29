import type {
  PatientIsolationDetectResponse,
  PatientSliceState,
  PatientStatus,
  PatientStatusChangeRequest,
  PatientChangeStatusHistoryResponse,
  BillingInformation,
  ClinicalInfoRequest,
  ClinicalInfoResponse,
  DialysisProcessInfoRequest,
  Patient,
  FamilyInfo,
  FileDocument,
  WalkInPatient,
  TreatmentInfo,
  TreatmentInfoRequest,
  FamilyForm,
  FormFile,
} from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientStatuses } from '@enums';
import { useAppSelector } from '@hooks/storeHooks';
import { ERROR_CODES } from '@constants/global';
import { NavigateFunction } from 'react-router-dom';

const initialState: PatientSliceState = {
  loading: false,
  errors: [],
  saveSuccess: false,
  patient: null,
  patientIsolation: undefined,
  statusesHistory: [],
  hasTodayEncounter: false,
  isServiceEncountered: false,
};

export type CreatePatientPayload = {
  patient: WalkInPatient | Patient;
  status: PatientStatuses;
  messages: { error: string; success: string };
};

export type ChangeClinicalInfoPayload = {
  clinicalInfo: ClinicalInfoRequest;
  id: string;
  method: 'post' | 'put';
};

export type ChangeClinicalInfoSuccessPayload = {
  clinicalInfo: ClinicalInfoResponse;
};

export type ChangeTreatmentInfoPayload = {
  treatmentInfo: TreatmentInfoRequest;
  id: string;
};

export type ChangeTreatmentInfoSuccessPayload = {
  treatmentInfo: TreatmentInfo;
};

export type ChangeMainInfoPayload = {
  patient: WalkInPatient | Patient;
  id: string;
  status: PatientStatuses;
};

export type ChangeFamilyInfoPayload = {
  familyInfo: FamilyForm;
  id: string;
  method: 'post' | 'put';
};

export type ChangeDocumentsPayload = {
  files: (FileDocument | FormFile)[];
  id: string;
};

function setLoading<T>() {
  return (state, action: PayloadAction<T>) => {
    state.loading = true;
    state.saveSuccess = false;
    state.errors = [];
  };
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    addPatientError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.saveSuccess = false;
      state.errors = [...state.errors, payload];
    },
    clearPatientSaveSuccessState: (state) => {
      state.saveSuccess = false;
    },
    clearPatientData: () => initialState,
    createNewPatient: setLoading<CreatePatientPayload>(),
    createNewPatientSuccess: (state, { payload }: PayloadAction<{ patient: WalkInPatient | Patient }>) => {
      state.saveSuccess = true;
      state.loading = false;
      state.patient = payload.patient;
      state.errors = [];
    },
    deletePatient: setLoading<{ id: string; navigate: NavigateFunction }>(),
    deletePatientSuccess: () => initialState,
    changeMainInfo: setLoading<ChangeMainInfoPayload>(),
    changeMainInfoSuccess: (state, { payload }: PayloadAction<ChangeMainInfoPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.errors = [];
      state.patient = {
        ...state.patient,
        ...payload,
      };
    },
    changeFamilyInfo: setLoading<ChangeFamilyInfoPayload>(),
    changeFamilyInfoSuccess: (state, { payload }: PayloadAction<FamilyInfo>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.errors = [];
      state.patient = {
        ...state.patient,
        family: payload,
      };
    },
    changeDocuments: setLoading<ChangeDocumentsPayload>(),
    changeDocumentsSuccess: (state, { payload }: PayloadAction<FileDocument[]>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.errors = [];
      state.patient = {
        ...state.patient,
        files: payload,
      };
    },
    changeClinicalInfo: setLoading<ChangeClinicalInfoPayload>(),
    changeClinicalInfoSuccess: (state, { payload }: PayloadAction<ChangeClinicalInfoSuccessPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.errors = [];
      state.patient = {
        ...state.patient,
        clinicalInfo: payload.clinicalInfo,
      };
    },
    changeTreatmentInfo: setLoading<ChangeTreatmentInfoPayload>(),
    changeTreatmentInfoSuccess: (state, { payload }: PayloadAction<ChangeTreatmentInfoSuccessPayload>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.errors = [];
      state.patient = {
        ...state.patient,
        treatmentInfo: payload.treatmentInfo,
      };
    },
    getPatientDemographics: setLoading<string>(),
    getPatientDemographicsSuccess: (state, { payload }: PayloadAction<Patient>) => {
      state.loading = false;
      state.errors = [];
      state.patient = {
        ...state.patient,
        ...payload,
      };
    },
    getPatientClinicalInfo: setLoading<string>(),
    getPatientClinicalInfoSuccess: (state, { payload }: PayloadAction<ClinicalInfoResponse | null>) => {
      state.loading = false;
      state.errors = [];
      state.patient = {
        ...state.patient,
        clinicalInfo: payload,
      };
    },
    getPatientAccessManagement: setLoading<string>(),
    getTreatmentInfo: setLoading<string>(),
    getTreatmentInfoSuccess: (state, { payload }: PayloadAction<TreatmentInfo>) => {
      state.loading = false;
      state.errors = [];
      state.patient = {
        ...state.patient,
        treatmentInfo: payload,
      };
    },
    getBillingInfo: setLoading<string>(),
    getBillingInfoSuccess: (state, { payload }: PayloadAction<BillingInformation>) => {
      state.loading = false;
      state.errors = [];
      state.patient = {
        ...state.patient,
        billingInformation: payload,
      };
    },
    getDialysisProcessInfo: setLoading<string>(),
    getDialysisProcessInfoSuccess: (state, { payload }: PayloadAction<DialysisProcessInfoRequest>) => {
      state.loading = false;
      state.errors = [];
      state.patient = {
        ...state.patient,
        dialysisProcessInfo: payload,
      };
    },
    getPatientIsolationStatus: (state, { payload }: PayloadAction<string>) => {},
    getPatientIsolationStatusSuccess: (
      state,
      { payload }: PayloadAction<PatientIsolationDetectResponse | null | undefined>,
    ) => {
      state.patientIsolation = payload;
    },
    getPatientStatusHistory: (state, { payload }: PayloadAction<number | string>) => {
      state.loading = true;
    },
    getPatientStatusHistorySuccess: (state, { payload }: PayloadAction<PatientStatus[]>) => {
      state.loading = false;
      state.errors = [];
      state.statusesHistory = payload;
    },
    changePatientStatus: (state, { payload }: PayloadAction<PatientStatusChangeRequest>) => {
      state.loading = true;
    },
    changePatientStatusSuccess: (state, { payload }: PayloadAction<PatientChangeStatusHistoryResponse>) => {
      state.loading = false;
      state.errors = [];
    },
    checkHasTodayEncounter: (state, { payload }: PayloadAction<string>) => {},
    setHasTodayEncounter: (state, { payload }: PayloadAction<boolean>) => {
      state.hasTodayEncounter = payload;
    },
    setIsServiceEncountered: (state, { payload }: PayloadAction<boolean>) => {
      state.isServiceEncountered = payload;
    },
  },
});

export const {
  createNewPatient,
  createNewPatientSuccess,
  addPatientError,
  changeMainInfo,
  changeMainInfoSuccess,
  changeFamilyInfo,
  changeFamilyInfoSuccess,
  changeDocuments,
  changeDocumentsSuccess,
  changeClinicalInfo,
  changeClinicalInfoSuccess,
  getPatientDemographics,
  getPatientDemographicsSuccess,
  getPatientClinicalInfo,
  getPatientClinicalInfoSuccess,
  getTreatmentInfo,
  getTreatmentInfoSuccess,
  getBillingInfo,
  getBillingInfoSuccess,
  clearPatientSaveSuccessState,
  clearPatientData,
  deletePatient,
  deletePatientSuccess,
  changeTreatmentInfoSuccess,
  changeTreatmentInfo,
  getDialysisProcessInfo,
  getDialysisProcessInfoSuccess,
  getPatientIsolationStatus,
  getPatientIsolationStatusSuccess,
  getPatientStatusHistory,
  getPatientStatusHistorySuccess,
  changePatientStatus,
  changePatientStatusSuccess,
  checkHasTodayEncounter,
  setHasTodayEncounter,
  setIsServiceEncountered,
} = patientSlice.actions;

export const selectPatientState = () => useAppSelector((state) => state.patient);
export const selectPatientSaveDataSuccess = () => useAppSelector((state) => state.patient.saveSuccess);
export const selectPatientLoading = () => useAppSelector((state) => state.patient.loading);
export const selectPatient = () => useAppSelector((state) => state.patient.patient);
export const selectPatientId = () => useAppSelector((state) => state.patient.patient?.id);
export const selectPatientName = () => useAppSelector((state) => state.patient.patient?.name);
export const selectPatientStatus = () => useAppSelector((state) => state.patient.patient?.status);
export const selectPatientPhoto = () => useAppSelector((state) => state.patient.patient?.photoPath);
export const selectClinicalInfo = () => useAppSelector((state) => state.patient.patient?.clinicalInfo);
export const selectPatientDocuments = () => useAppSelector((state) => state.patient.patient?.files);
export const selectTreatmentInfo = () => useAppSelector((state) => state.patient.patient?.treatmentInfo);
export const selectBillingInformation = () => useAppSelector((state) => state.patient.patient?.billingInformation);
export const selectFamilyInformation = () => useAppSelector((state) => state.patient.patient?.family);
export const selectDialysisProcessInfo = () => useAppSelector((state) => state.patient.patient?.dialysisProcessInfo);
export const selectPatientIsolationStatus = () => useAppSelector((state) => state.patient.patientIsolation);
export const selectIsPatientNotUniqueError = () =>
  useAppSelector((state) => {
    return Boolean(state.patient.errors.find((error) => error?.code === ERROR_CODES.PATIENT_IS_NOT_UNIQUE));
  });
export const selectS3AntivirusErrors = () =>
  useAppSelector((state) => {
    return state.patient.errors
      .filter((error) => error?.code === ERROR_CODES.S3_FILE_IS_NOT_FOUND)
      .map((error) => error.rejectedValue);
  });
export const selectPatientStatusesHistory = () => useAppSelector((state) => state.patient.statusesHistory);
export const selectHasTodayEncounter = () => useAppSelector((state) => state.patient.hasTodayEncounter);
export const selectIsServiceEncountered = () => useAppSelector((state) => state.patient.isServiceEncountered);

const patientReducer = patientSlice.reducer;
export default patientReducer;
