/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
type PatientStatusDischargedFormViewProps = {
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
};
export declare const PatientStatusDischargedFormView: ({
  control,
  isHistory,
  availableStatusOptions,
}: PatientStatusDischargedFormViewProps) => JSX.Element;
export {};
