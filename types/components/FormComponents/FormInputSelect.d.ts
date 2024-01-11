import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
export type OptionProps = {
  label: string | ReactNode;
  value: string | number;
  disabled?: boolean;
};
export type FormInputSelectProps<T extends FieldValues> = WithSx<{
  options: OptionProps[];
  label: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  multiple?: boolean;
  capitalizedLabel?: boolean;
  clearable?: boolean;
  emptyBody?: string | ReactNode;
}> &
  UseControllerProps<T>;
export declare const FormInputSelect: <T extends FieldValues>({
  options,
  label,
  isDisabled,
  fullWidth,
  required,
  multiple,
  sx,
  clearable,
  capitalizedLabel,
  emptyBody,
  ...props
}: FormInputSelectProps<T>) => JSX.Element;
