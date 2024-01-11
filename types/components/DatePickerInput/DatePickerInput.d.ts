import { ReactNode, Ref } from 'react';
import { WithSx } from '@types';
type DatePickerInputProps = WithSx<{
  label: string | ReactNode;
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  error?: string | null;
  required?: boolean;
  fullWidth?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
  fieldRef?: Ref<HTMLElement>;
}>;
export declare const DatePickerInput: ({
  label,
  value,
  onChange,
  onBlur,
  name,
  minDate,
  maxDate,
  isDisabled,
  error,
  required,
  fullWidth,
  shouldDisableDate,
  fieldRef,
  sx,
}: DatePickerInputProps) => JSX.Element;
export {};
