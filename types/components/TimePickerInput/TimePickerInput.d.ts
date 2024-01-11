import { ReactNode, Ref } from 'react';
import { WithSx } from '@types';
type TimePickerInputProps = WithSx<{
  label: string | ReactNode;
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  name: string;
  ampm?: boolean;
  isDisabled?: boolean;
  error?: string | null;
  required?: boolean;
  fullWidth?: boolean;
  maxTime?: Date;
  minTime?: Date;
  ref?: Ref<HTMLElement>;
}>;
export declare const TimePickerInput: ({
  label,
  value,
  onChange,
  onBlur,
  name,
  ampm,
  isDisabled,
  error,
  required,
  fullWidth,
  maxTime,
  minTime,
  ref,
  sx,
}: TimePickerInputProps) => JSX.Element;
export {};
