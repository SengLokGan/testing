import type { InputProps } from '@mui/material/Input';
import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { InputTextType } from '@enums';
export type FormMaskedInputTextProps<T extends FieldValues> = WithSx<{
  mask: string;
  maskChar?: string | null;
  formatChars?: {
    [key: string]: string;
  };
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  InputProps?: InputProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  textType?: InputTextType;
  required?: boolean;
  transform?: (string: any) => string;
  adornment?: string;
  minRows?: number;
}> &
  UseControllerProps<T>;
export declare const FormMaskedInputText: <T extends FieldValues>({
  mask,
  maskChar,
  formatChars,
  label,
  isDisabled,
  textType,
  helperText,
  hiddenLabel,
  multiline,
  fullWidth,
  required,
  transform,
  minRows,
  adornment,
  sx,
  InputProps,
  ...props
}: FormMaskedInputTextProps<T>) => JSX.Element;
