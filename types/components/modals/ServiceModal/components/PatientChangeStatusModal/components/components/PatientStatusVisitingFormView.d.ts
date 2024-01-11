import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
import { Dispatch, SetStateAction } from 'react';
import { PatientStatuses } from '@enums/global';
import { Kin } from '@types';
type PatientStatusVisitingFormViewProps = {
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
  register: UseFormRegister<PatientStatusForm>;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  currentPatientStatus: PatientStatuses;
  kins: Kin[];
  gender?: string;
};
export declare const PatientStatusVisitingFormView: ({
  control,
  isHistory,
  availableStatusOptions,
  setFileLoadingCount,
  kins,
  register,
  currentPatientStatus,
  gender,
}: PatientStatusVisitingFormViewProps) => JSX.Element;
export {};
