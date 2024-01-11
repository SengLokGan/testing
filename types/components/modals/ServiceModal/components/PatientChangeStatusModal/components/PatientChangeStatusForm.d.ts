/// <reference types="react" />
import { PatientStatuses } from '@enums';
import { FileDocument, PatientStatusForm } from '@types';
interface PatientChangeStatusDefaultFormValues {
  createdAt: string;
  files: FileDocument[];
  status: PatientStatuses;
  statusId: number;
  updatedAt: string;
}
type PatientChangeStatusFormProps = {
  patientId: string | number;
  statusId: number | string | null;
  isHistory: boolean;
  defaultFormValues?: Partial<PatientStatusForm> & Partial<PatientChangeStatusDefaultFormValues>;
  currentPatientStatus: PatientStatuses;
  availableStatuses: PatientStatuses[];
  onCancel: () => void;
};
export declare const PatientChangeStatusForm: ({
  patientId,
  isHistory,
  statusId,
  currentPatientStatus,
  defaultFormValues,
  availableStatuses,
  onCancel,
}: PatientChangeStatusFormProps) => JSX.Element;
export {};
