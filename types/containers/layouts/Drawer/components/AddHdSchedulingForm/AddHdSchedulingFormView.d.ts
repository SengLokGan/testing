/// <reference types="react" />
import { UseFormClearErrors, UseFormGetFieldState, UseFormSetValue } from 'react-hook-form';
import { Control, UseFormSetError, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { HdSchedulingForm } from '@types';
type AddHdSchedulingFormViewProps = {
  control: Control<HdSchedulingForm>;
  watch: UseFormWatch<HdSchedulingForm>;
  setValue: UseFormSetValue<HdSchedulingForm>;
  setError: UseFormSetError<HdSchedulingForm>;
  clearErrors: UseFormClearErrors<HdSchedulingForm>;
  trigger: UseFormTrigger<HdSchedulingForm>;
  defaultValues: HdSchedulingForm;
  getFieldState: UseFormGetFieldState<HdSchedulingForm>;
};
export declare const AddHdSchedulingFormView: ({
  control,
  watch,
  setValue,
  setError,
  clearErrors,
  trigger,
  defaultValues,
  getFieldState,
}: AddHdSchedulingFormViewProps) => JSX.Element;
export {};
