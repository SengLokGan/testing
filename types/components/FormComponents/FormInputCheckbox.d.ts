import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
export type FormInputCheckboxProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  isDisabled?: boolean;
  required?: boolean;
}> &
  UseControllerProps<T>;
export declare const FormInputCheckbox: <T extends FieldValues>({
  name,
  control,
  label,
  isDisabled,
  required,
  rules,
  sx,
}: FormInputCheckboxProps<T>) => JSX.Element;
