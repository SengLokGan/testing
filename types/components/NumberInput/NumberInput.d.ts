import { ReactNode, Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { WithSx } from '@types';
type NumberInputProps = WithSx<{
  onChange: (value: string) => void;
  onBlur: () => void;
  value: string;
  label?: string | ReactNode;
  required?: boolean;
  error?: FieldError;
  dataTestId?: string;
  fieldRef?: Ref<HTMLElement>;
  maxValue?: number;
  minValue?: number;
  withoutDisableMax?: boolean;
}>;
export declare const NumberInput: ({
  onChange,
  value,
  label,
  required,
  onBlur,
  error,
  dataTestId,
  fieldRef,
  maxValue,
  minValue,
  withoutDisableMax,
  sx,
}: NumberInputProps) => JSX.Element;
export {};
