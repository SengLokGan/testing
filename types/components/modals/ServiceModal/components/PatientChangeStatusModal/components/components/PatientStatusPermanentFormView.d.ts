import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';
import type { Kin, PatientStatusForm } from '@types';
import { Dispatch, SetStateAction } from 'react';
import { PatientStatuses } from '@enums/global';
type PatientStatusPermanentFormViewProps = {
  control: Control<PatientStatusForm>;
  gender?: string;
  isHistory: boolean;
  register: UseFormRegister<PatientStatusForm>;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  currentPatientStatus: PatientStatuses;
  kins: Kin[];
};
export declare const PatientStatusPermanentFormView: ({
  control,
  isHistory,
  availableStatusOptions,
  setFileLoadingCount,
  gender,
  kins,
  register,
  currentPatientStatus,
}: PatientStatusPermanentFormViewProps) => JSX.Element;
export {};
