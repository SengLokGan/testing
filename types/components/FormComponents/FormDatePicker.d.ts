import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
type FormDatePickerProps<T extends FieldValues> = WithSx<{
  label: string | ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
}> &
  UseControllerProps<T>;
export declare const FormDatePicker: <T extends FieldValues>({
  label,
  required,
  fullWidth,
  sx,
  minDate,
  maxDate,
  name,
  isDisabled,
  shouldDisableDate,
  ...props
}: FormDatePickerProps<T>) => JSX.Element;
export {};
