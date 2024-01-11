import { Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { WithSx } from '@types';
export interface AutocompleteAsyncOptionType {
  id: string;
  label: string;
}
type AutocompleteAsyncProps = WithSx<{
  error?: FieldError;
  label?: string;
  required?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  getOptionsUrl: string;
  value?: AutocompleteAsyncOptionType | null;
  capitalizedLabel?: boolean;
  fullWidth?: boolean;
  name: string;
  optionsTransform?: (options: any) => AutocompleteAsyncOptionType[];
  onOptionsUpdated?: (options: any) => any;
  fieldRef?: Ref<HTMLElement>;
}>;
export declare const AutocompleteAsync: ({
  error,
  label,
  required,
  onChange,
  isDisabled,
  getOptionsUrl,
  onBlur,
  value,
  capitalizedLabel,
  fullWidth,
  sx,
  name,
  optionsTransform,
  onOptionsUpdated,
  fieldRef,
}: AutocompleteAsyncProps) => JSX.Element;
export {};
