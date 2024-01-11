import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { ReactNode } from 'react';
export type FormNumberInputProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
  withoutDisableMax?: boolean;
}> &
  UseControllerProps<T>;
export declare const FormNumberInput: <T extends FieldValues>({
  label,
  required,
  minValue,
  maxValue,
  withoutDisableMax,
  sx,
  ...props
}: FormNumberInputProps<T>) => JSX.Element;
