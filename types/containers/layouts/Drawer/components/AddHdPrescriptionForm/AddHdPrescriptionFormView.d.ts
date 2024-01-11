/// <reference types="react" />
import { Control, UseFormTrigger } from 'react-hook-form/dist/types/form';
import { HdPrescriptionForm } from '@types';
type AddHdPrescriptionFormViewProps = {
  control: Control<HdPrescriptionForm>;
  trigger: UseFormTrigger<HdPrescriptionForm>;
  showEmptySchedulingWarning: boolean;
};
export declare const AddHdPrescriptionFormView: ({
  control,
  trigger,
  showEmptySchedulingWarning,
}: AddHdPrescriptionFormViewProps) => JSX.Element;
export {};
