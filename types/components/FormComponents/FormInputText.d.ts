import type { InputProps } from '@mui/material/Input';
import { ChangeEvent, ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { InputBaseComponentProps } from '@mui/material';
import { InputTextType } from '@enums';
export type FormInputTextProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  textType?: InputTextType;
  required?: boolean;
  transform?: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  adornment?: string;
  minRows?: number;
}> &
  UseControllerProps<T>;
export declare const FormInputText: <T extends FieldValues>({
  label,
  isDisabled,
  textType,
  InputProps,
  inputProps,
  helperText,
  hiddenLabel,
  multiline,
  fullWidth,
  required,
  transform,
  adornment,
  minRows,
  sx,
  ...props
}: FormInputTextProps<T>) => JSX.Element;
