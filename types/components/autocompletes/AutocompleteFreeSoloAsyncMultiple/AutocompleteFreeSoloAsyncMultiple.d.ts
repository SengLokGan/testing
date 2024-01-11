import { ReactNode, Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { WithSx } from '@types';
type AutocompleteFreeSoloProps = WithSx<{
  error?: FieldError;
  label?: string;
  required?: boolean;
  onChange: (value: any) => void;
  isDisabled?: boolean;
  value: {
    value: string;
    label: string;
  };
  name: string;
  capitalizedLabel?: boolean;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  getOptionsUrl: string;
  optionsTransform?: (options: any) => any;
  placeholder?: string;
  fieldRef?: Ref<any>;
}>;
export declare const AutocompleteFreeSoloAsyncMultiple: ({
  label,
  error,
  required,
  onChange,
  isDisabled,
  getOptionsUrl,
  value,
  name,
  placeholder,
  optionsTransform,
  sx,
  fieldRef,
}: AutocompleteFreeSoloProps) => JSX.Element;
export {};
