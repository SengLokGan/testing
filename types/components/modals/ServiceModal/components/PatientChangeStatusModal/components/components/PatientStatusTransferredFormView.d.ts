/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PatientStatusForm } from '@types';
type PatientStatusTemporaryTransferredFormViewProps = {
  control: Control<PatientStatusForm>;
  isHistory: boolean;
  availableStatusOptions: {
    label: string;
    value: string;
  }[];
};
export declare const PatientStatusTemporaryTransferredFormView: ({
  control,
  isHistory,
  availableStatusOptions,
}: PatientStatusTemporaryTransferredFormViewProps) => JSX.Element;
export {};
