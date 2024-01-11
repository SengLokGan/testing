import { ChangeEvent, ReactNode, Ref } from 'react';
import { InputTextType } from '@enums';
import type { InputProps } from '@mui/material/Input';
import { WithSx } from '@types';
import { InputBaseComponentProps } from '@mui/material';
type InputTextProps = WithSx<{
  error?: string;
  helperText?: string | null;
  textType?: InputTextType;
  name: string;
  isDisabled?: boolean;
  transform?: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  minRows?: number;
  value: string;
  onBlur?: () => void;
  adornment?: string;
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  fullWidth?: boolean;
  label?: string | ReactNode;
  required?: boolean;
  fieldRef?: Ref<HTMLElement>;
}>;
export declare const InputText: ({
  error,
  helperText,
  textType,
  name,
  isDisabled,
  transform,
  onChange,
  minRows,
  value,
  onBlur,
  adornment,
  InputProps,
  inputProps,
  hiddenLabel,
  multiline,
  fullWidth,
  label,
  required,
  fieldRef,
  sx,
}: InputTextProps) => JSX.Element;
export {};
