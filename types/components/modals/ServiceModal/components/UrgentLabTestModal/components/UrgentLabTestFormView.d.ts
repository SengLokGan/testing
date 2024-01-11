/// <reference types="react" />
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import type { UrgentLabTestForm } from '@types';
type UrgentLabTestFormViewProps = {
  control: Control<UrgentLabTestForm>;
  setValue: UseFormSetValue<UrgentLabTestForm>;
  watch: UseFormWatch<UrgentLabTestForm>;
  patientDisabled?: boolean;
};
export declare const UrgentLabTestFormView: ({
  control,
  watch,
  setValue,
  patientDisabled,
}: UrgentLabTestFormViewProps) => JSX.Element;
export {};
