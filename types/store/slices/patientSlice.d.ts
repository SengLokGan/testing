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
import { PayloadAction } from '@reduxjs/toolkit';
import { PatientStatuses } from '@enums';
import { NavigateFunction } from 'react-router-dom';
export type CreatePatientPayload = {
  patient: WalkInPatient | Patient;
  status: PatientStatuses;
  messages: {
    error: string;
    success: string;
  };
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
export declare const patientSlice: import('@reduxjs/toolkit').Slice<
  PatientSliceState,
  {
    addPatientError: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    clearPatientSaveSuccessState: (state: import('immer/dist/internal').WritableDraft<PatientSliceState>) => void;
    clearPatientData: () => PatientSliceState;
    createNewPatient: (
      state: any,
      action: {
        payload: CreatePatientPayload;
        type: string;
      },
    ) => void;
    createNewPatientSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      {
        payload,
      }: PayloadAction<{
        patient: WalkInPatient | Patient;
      }>,
    ) => void;
    deletePatient: (
      state: any,
      action: {
        payload: {
          id: string;
          navigate: NavigateFunction;
        };
        type: string;
      },
    ) => void;
    deletePatientSuccess: () => PatientSliceState;
    changeMainInfo: (
      state: any,
      action: {
        payload: ChangeMainInfoPayload;
        type: string;
      },
    ) => void;
    changeMainInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<ChangeMainInfoPayload>,
    ) => void;
    changeFamilyInfo: (
      state: any,
      action: {
        payload: ChangeFamilyInfoPayload;
        type: string;
      },
    ) => void;
    changeFamilyInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<FamilyInfo>,
    ) => void;
    changeDocuments: (
      state: any,
      action: {
        payload: ChangeDocumentsPayload;
        type: string;
      },
    ) => void;
    changeDocumentsSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<FileDocument[]>,
    ) => void;
    changeClinicalInfo: (
      state: any,
      action: {
        payload: ChangeClinicalInfoPayload;
        type: string;
      },
    ) => void;
    changeClinicalInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<ChangeClinicalInfoSuccessPayload>,
    ) => void;
    changeTreatmentInfo: (
      state: any,
      action: {
        payload: ChangeTreatmentInfoPayload;
        type: string;
      },
    ) => void;
    changeTreatmentInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<ChangeTreatmentInfoSuccessPayload>,
    ) => void;
    getPatientDemographics: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getPatientDemographicsSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<Patient>,
    ) => void;
    getPatientClinicalInfo: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getPatientClinicalInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<ClinicalInfoResponse | null>,
    ) => void;
    getPatientAccessManagement: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getTreatmentInfo: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getTreatmentInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<TreatmentInfo>,
    ) => void;
    getBillingInfo: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getBillingInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<BillingInformation>,
    ) => void;
    getDialysisProcessInfo: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getDialysisProcessInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<DialysisProcessInfoRequest>,
    ) => void;
    getPatientIsolationStatus: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getPatientIsolationStatusSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<PatientIsolationDetectResponse | null | undefined>,
    ) => void;
    getPatientStatusHistory: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<number | string>,
    ) => void;
    getPatientStatusHistorySuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<PatientStatus[]>,
    ) => void;
    changePatientStatus: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<PatientStatusChangeRequest>,
    ) => void;
    changePatientStatusSuccess: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<PatientChangeStatusHistoryResponse>,
    ) => void;
    checkHasTodayEncounter: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    setHasTodayEncounter: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    setIsServiceEncountered: (
      state: import('immer/dist/internal').WritableDraft<PatientSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
  },
  'patient'
>;
export declare const createNewPatient: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    CreatePatientPayload,
    'patient/createNewPatient'
  >,
  createNewPatientSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      patient: WalkInPatient | Patient;
    },
    'patient/createNewPatientSuccess'
  >,
  addPatientError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'patient/addPatientError'>,
  changeMainInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<ChangeMainInfoPayload, 'patient/changeMainInfo'>,
  changeMainInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeMainInfoPayload,
    'patient/changeMainInfoSuccess'
  >,
  changeFamilyInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeFamilyInfoPayload,
    'patient/changeFamilyInfo'
  >,
  changeFamilyInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    FamilyInfo,
    'patient/changeFamilyInfoSuccess'
  >,
  changeDocuments: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeDocumentsPayload,
    'patient/changeDocuments'
  >,
  changeDocumentsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    FileDocument[],
    'patient/changeDocumentsSuccess'
  >,
  changeClinicalInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeClinicalInfoPayload,
    'patient/changeClinicalInfo'
  >,
  changeClinicalInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeClinicalInfoSuccessPayload,
    'patient/changeClinicalInfoSuccess'
  >,
  getPatientDemographics: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/getPatientDemographics'>,
  getPatientDemographicsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Patient,
    'patient/getPatientDemographicsSuccess'
  >,
  getPatientClinicalInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/getPatientClinicalInfo'>,
  getPatientClinicalInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalInfoResponse | null,
    'patient/getPatientClinicalInfoSuccess'
  >,
  getTreatmentInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/getTreatmentInfo'>,
  getTreatmentInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    TreatmentInfo,
    'patient/getTreatmentInfoSuccess'
  >,
  getBillingInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/getBillingInfo'>,
  getBillingInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    BillingInformation,
    'patient/getBillingInfoSuccess'
  >,
  clearPatientSaveSuccessState: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patient/clearPatientSaveSuccessState'>,
  clearPatientData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patient/clearPatientData'>,
  deletePatient: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      id: string;
      navigate: NavigateFunction;
    },
    'patient/deletePatient'
  >,
  deletePatientSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'patient/deletePatientSuccess'>,
  changeTreatmentInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeTreatmentInfoSuccessPayload,
    'patient/changeTreatmentInfoSuccess'
  >,
  changeTreatmentInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeTreatmentInfoPayload,
    'patient/changeTreatmentInfo'
  >,
  getDialysisProcessInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/getDialysisProcessInfo'>,
  getDialysisProcessInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisProcessInfoRequest,
    'patient/getDialysisProcessInfoSuccess'
  >,
  getPatientIsolationStatus: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'patient/getPatientIsolationStatus'
  >,
  getPatientIsolationStatusSuccess: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    PatientIsolationDetectResponse | null | undefined,
    'patient/getPatientIsolationStatusSuccess'
  >,
  getPatientStatusHistory: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string | number,
    'patient/getPatientStatusHistory'
  >,
  getPatientStatusHistorySuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientStatus[],
    'patient/getPatientStatusHistorySuccess'
  >,
  changePatientStatus: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientStatusChangeRequest,
    'patient/changePatientStatus'
  >,
  changePatientStatusSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PatientChangeStatusHistoryResponse,
    'patient/changePatientStatusSuccess'
  >,
  checkHasTodayEncounter: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'patient/checkHasTodayEncounter'>,
  setHasTodayEncounter: import('@reduxjs/toolkit').ActionCreatorWithPayload<boolean, 'patient/setHasTodayEncounter'>,
  setIsServiceEncountered: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'patient/setIsServiceEncountered'
  >;
export declare const selectPatientState: () => any;
export declare const selectPatientSaveDataSuccess: () => any;
export declare const selectPatientLoading: () => any;
export declare const selectPatient: () => any;
export declare const selectPatientId: () => any;
export declare const selectPatientName: () => any;
export declare const selectPatientStatus: () => any;
export declare const selectPatientPhoto: () => any;
export declare const selectClinicalInfo: () => any;
export declare const selectPatientDocuments: () => any;
export declare const selectTreatmentInfo: () => any;
export declare const selectBillingInformation: () => any;
export declare const selectFamilyInformation: () => any;
export declare const selectDialysisProcessInfo: () => any;
export declare const selectPatientIsolationStatus: () => any;
export declare const selectIsPatientNotUniqueError: () => boolean;
export declare const selectS3AntivirusErrors: () => any;
export declare const selectPatientStatusesHistory: () => any;
export declare const selectHasTodayEncounter: () => any;
export declare const selectIsServiceEncountered: () => any;
declare const patientReducer: import('redux').Reducer<PatientSliceState, import('redux').AnyAction>;
export default patientReducer;
