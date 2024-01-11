/// <reference types="react" />
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form';
type DialysisPAccessConditionGroupProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues, Object>;
  watch: UseFormWatch<TFormValues>;
};
export declare const DialysisAccessConditionGroup: <TFormValues extends FieldValues>({
  control,
  watch,
}: DialysisPAccessConditionGroupProps<TFormValues>) => JSX.Element;
export {};
