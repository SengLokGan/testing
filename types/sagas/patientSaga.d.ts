import type { PayloadAction } from '@reduxjs/toolkit';
import { ChangeClinicalInfoPayload, ChangeTreatmentInfoPayload } from '@store/slices/patientSlice';
import { ServiceModalName, SnackType } from '@enums';
import type { AxiosResponse } from 'axios';
import type {
  ClinicalInfoResponse,
  DialysisProcessInfoRequest,
  Patient,
  PatientChangeStatusHistoryResponse,
  PatientIsolationDetectResponse,
  PatientStatus,
  PatientStatusChangeRequest,
  TreatmentInfo,
} from '@types';
export declare function changePatientClinicalInfoSaga({
  payload: { id, clinicalInfo, method },
}: PayloadAction<ChangeClinicalInfoPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/changeClinicalInfoSuccess';
      payload: {
        clinicalInfo: {
          medicalHistory: string | undefined;
          diagnosis?: string | undefined;
          treatment?: import('@enums').Treatment | undefined;
          bloodType?: string | undefined;
          allergy: import('@types').Allergy;
          virology?: import('@types').VirologyStatus | undefined;
        };
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<ClinicalInfoResponse, any>
>;
export declare function changeTreatmentInfoSaga({
  payload: { id, treatmentInfo },
}: PayloadAction<ChangeTreatmentInfoPayload>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/changeTreatmentInfoSuccess';
      payload: {
        treatmentInfo: TreatmentInfo;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<TreatmentInfo, any>
>;
export declare function getPatientDemographicsSaga({ payload: id }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/getPatientDemographicsSuccess';
      payload: Patient;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<Patient, any>
>;
export declare function getPatientClinicalInfoSaga({ payload: id }: PayloadAction<string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/getPatientClinicalInfoSuccess';
      payload: {
        medicalHistory: string | undefined;
        diagnosis?: string | undefined;
        treatment?: import('@enums').Treatment | undefined;
        bloodType?: string | undefined;
        allergy: import('@types').Allergy;
        virology?: import('@types').VirologyStatus | undefined;
      } | null;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<ClinicalInfoResponse, any>
>;
export declare function getTreatmentInfoSaga({ payload: id }: PayloadAction<string | number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/getTreatmentInfoSuccess';
      payload: TreatmentInfo | null;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<TreatmentInfo, any>
>;
export declare function getDialysisProcessInfoSaga({ payload: id }: PayloadAction<string | number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/setIsServiceEncountered';
      payload: boolean;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/getDialysisProcessInfoSuccess';
      payload: DialysisProcessInfoRequest;
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<DialysisProcessInfoRequest, any>
>;
export declare function getPatientIsolationStatusSaga({
  payload: patientId,
}: PayloadAction<string | number>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: PatientIsolationDetectResponse | null | undefined;
      type: 'patient/getPatientIsolationStatusSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<PatientIsolationDetectResponse | null | undefined, any>
>;
export declare function getPatientStatusHistorySaga({ payload }: PayloadAction<number | string>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: PatientIsolationDetectResponse | null | undefined;
      type: 'patient/getPatientIsolationStatusSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: PatientStatus[];
      type: 'patient/getPatientStatusHistorySuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: Error;
    }>,
  void,
  AxiosResponse<PatientStatus[], any>
>;
export declare function changePatientStatusSaga({
  payload: { patientId, isHistory, statusId, ...payload },
}: PayloadAction<PatientStatusChangeRequest>): Generator<
  | import('redux-saga/effects').CallEffect<unknown>
  | import('redux-saga/effects').PutEffect<{
      payload: ServiceModalName;
      type: 'modal/removeServiceModal';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: string;
      type: 'patient/getPatientDemographics';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: string | number;
      type: 'patient/getPatientStatusHistory';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: PatientChangeStatusHistoryResponse;
      type: 'patient/changePatientStatusSuccess';
    }>
  | import('redux-saga/effects').PutEffect<{
      payload: import('@types').SnackState & {
        noDuplicates?: boolean | undefined;
        clear?: boolean | undefined;
      };
      type: 'snack/addSnack';
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'snack/addSnack';
      payload: {
        type: SnackType;
        message: string;
      };
    }>
  | import('redux-saga/effects').PutEffect<{
      type: 'patient/addPatientError';
      payload: any;
    }>,
  void,
  AxiosResponse<PatientChangeStatusHistoryResponse, any>
>;
export declare function patientSagaWatcher(): Generator<import('redux-saga/effects').ForkEffect<never>, void, unknown>;
