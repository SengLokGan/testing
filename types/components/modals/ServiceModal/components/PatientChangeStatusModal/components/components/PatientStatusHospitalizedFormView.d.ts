import { Control, UseFormSetValue } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
import { PatientHospitalizationReason } from '@enums';
import { Dispatch, SetStateAction } from 'react';
type PatientStatusHospitalizedFormViewProps = {
  setValue: UseFormSetValue<PatientStatusForm>;
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  reason: PatientHospitalizationReason | undefined;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
};
export declare const PatientStatusHospitalizedFormView: ({
  control,
  setValue,
  reason,
  isHistory,
  availableStatusOptions,
  setFileLoadingCount,
}: PatientStatusHospitalizedFormViewProps) => JSX.Element;
export {};
