/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
type PatientStatusDefaultFormViewProps = {
  control: Control<PatientStatusForm>;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
};
export declare const PatientStatusDefaultFormView: ({
  control,
  availableStatusOptions,
}: PatientStatusDefaultFormViewProps) => JSX.Element;
export {};
