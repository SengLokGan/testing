import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
type FormTimePickerProps<T extends FieldValues> = WithSx<{
  label: string | ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  isDisabled?: boolean;
  ampm?: boolean;
  maxTime?: Date;
  minTime?: Date;
}> &
  UseControllerProps<T>;
export declare const FormTimePicker: <T extends FieldValues>({
  label,
  required,
  fullWidth,
  sx,
  name,
  ampm,
  isDisabled,
  maxTime,
  minTime,
  ...props
}: FormTimePickerProps<T>) => JSX.Element;
export {};
