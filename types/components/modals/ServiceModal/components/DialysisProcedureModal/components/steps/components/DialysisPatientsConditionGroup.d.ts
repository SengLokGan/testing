/// <reference types="react" />
import { Control, UseFormWatch, FieldValues } from 'react-hook-form';
type DialysisPatientsConditionGroupProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues, Object>;
  watch: UseFormWatch<TFormValues>;
};
export declare const DialysisPatientsConditionGroup: <TFormValues extends FieldValues>({
  control,
  watch,
}: DialysisPatientsConditionGroupProps<TFormValues>) => JSX.Element;
export {};
