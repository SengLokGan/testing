import { ReactNode } from 'react';
import { FieldValues, UseControllerProps, UseFormSetValue } from 'react-hook-form';
import { UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { WithSx } from '@types';
type FormTimeDurationPickerProps<T extends FieldValues> = WithSx<{
  name: string;
  label: ReactNode;
  required?: boolean;
  setValue?: UseFormSetValue<any>;
  isDisabled?: boolean;
  watch: UseFormWatch<any>;
  trigger?: UseFormTrigger<any>;
  defaultMinutes?: number;
  fullWidth?: boolean;
}> &
  UseControllerProps<T>;
export declare const FormTimeDurationPicker: <T extends FieldValues>({
  label,
  required,
  isDisabled,
  sx,
  watch,
  trigger,
  fullWidth,
  defaultMinutes,
  ...props
}: FormTimeDurationPickerProps<T>) => JSX.Element;
export {};
