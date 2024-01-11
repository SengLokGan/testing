/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form';
type DialysisBloodPressureTempGroupProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues, Object>;
};
export declare const DialysisBloodPressureTempGroup: <TFormValues extends FieldValues>({
  control,
}: DialysisBloodPressureTempGroupProps<TFormValues>) => JSX.Element;
export {};
