import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ReactNode } from 'react';
import { WithSx } from '@types';
export type FormAutocompleteMultipleProps<T extends FieldValues> = WithSx<{
  options: string[];
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  freeSolo?: boolean;
  rules?: any;
  popupIcon?: boolean;
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocompleteMultiple: <T extends FieldValues>({
  options,
  label,
  isDisabled,
  fullWidth,
  required,
  placeholder,
  freeSolo,
  popupIcon,
  sx,
  rules,
  ...props
}: FormAutocompleteMultipleProps<T>) => JSX.Element;
