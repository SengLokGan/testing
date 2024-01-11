import { ReactNode, Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { WithSx } from '@types';
type AutocompleteBasicOption = {
  label: string;
  value: string | number;
  group?: string;
};
type AutocompleteBasicProps = WithSx<{
  name: string;
  options: AutocompleteBasicOption[] | string[];
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  value: AutocompleteBasicOption;
  onChange: (value: any) => void;
  onBlur?: () => void;
  required?: boolean;
  capitalizedLabel?: boolean;
  loading?: boolean;
  groupBy?: (option: AutocompleteBasicOption) => string;
  error?: FieldError;
  fieldRef?: Ref<HTMLElement>;
}>;
export declare const AutocompleteBasic: ({
  name,
  options,
  label,
  isDisabled,
  fullWidth,
  value,
  required,
  onChange,
  onBlur,
  capitalizedLabel,
  loading,
  error,
  fieldRef,
  sx,
}: AutocompleteBasicProps) => JSX.Element;
export {};
