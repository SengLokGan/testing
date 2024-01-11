import { ChangeEvent } from 'react';
import { WithSx } from '@types';
export type SelectOptionProps = {
  label: string;
  value: string;
  group?: string;
};
type SelectProps = WithSx<{
  value: string[] | null | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  options: SelectOptionProps[];
  capitalizedLabel?: boolean;
  name: string;
  label: string;
  multiple?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  error?: string;
  onBlur?: () => void;
}>;
export declare const Select: ({
  value,
  handleChange,
  required,
  options,
  capitalizedLabel,
  name,
  label,
  multiple,
  fullWidth,
  isDisabled,
  error,
  sx,
  onBlur,
}: SelectProps) => JSX.Element;
export {};
