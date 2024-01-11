/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
type PatientStatusWalkInFormViewProps = {
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
};
export declare const PatientStatusWalkInFormView: ({
  control,
  isHistory,
  availableStatusOptions,
}: PatientStatusWalkInFormViewProps) => JSX.Element;
export {};
