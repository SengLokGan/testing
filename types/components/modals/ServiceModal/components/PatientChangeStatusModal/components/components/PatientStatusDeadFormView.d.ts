import { Control } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
import { Dispatch, SetStateAction } from 'react';
type PatientStatusDeadFormViewProps = {
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
};
export declare const PatientStatusDeadFormView: ({
  control,
  isHistory,
  availableStatusOptions,
  setFileLoadingCount,
}: PatientStatusDeadFormViewProps) => JSX.Element;
export {};
