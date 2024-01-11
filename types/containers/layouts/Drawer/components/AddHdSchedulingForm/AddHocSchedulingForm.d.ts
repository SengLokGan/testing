/// <reference types="react" />
import { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { HdSchedulingForm } from '@types';
import { UseFormSetValue } from 'react-hook-form';
type AddHocSchedulingFormProps = {
  control: Control<HdSchedulingForm>;
  watch: UseFormWatch<HdSchedulingForm>;
  trigger: UseFormTrigger<HdSchedulingForm>;
  isValid: boolean;
  setValue: UseFormSetValue<HdSchedulingForm>;
};
export declare const AddHocSchedulingForm: ({
  control,
  watch,
  trigger,
  isValid,
  setValue,
}: AddHocSchedulingFormProps) => JSX.Element;
export {};
