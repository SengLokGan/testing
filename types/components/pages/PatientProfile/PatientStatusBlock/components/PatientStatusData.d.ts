/// <reference types="react" />
import type { PatientStatus } from '@types';
type PatientStatusDataProps = {
  patientId: string | number;
  patientStatusData: PatientStatus;
  isCurrentStatus: boolean;
  isFirstStatus: boolean;
  onChangePatientStatus: (patientStatusData: PatientStatus) => void;
};
export declare const PatientStatusData: ({
  patientId,
  patientStatusData,
  isCurrentStatus,
  isFirstStatus,
  onChangePatientStatus,
}: PatientStatusDataProps) => JSX.Element;
export {};
