import { ReactNode, SyntheticEvent } from 'react';
import { WithSx } from '@types';
export interface AutocompleteMultipleOptionType {
  value: string;
  label: string;
  group?: string;
}
type AutocompleteMultipleProps = WithSx<{
  label?: string | ReactNode;
  placeholder?: string;
  freeSolo?: boolean;
  options: AutocompleteMultipleOptionType[];
  value: AutocompleteMultipleOptionType[];
  required?: boolean;
  isDisabled?: boolean;
  error?: string;
  onChange: (event: SyntheticEvent<Element, Event> | {}, value: unknown) => void;
  groupBy?: (option: any) => string;
  fullWidth?: boolean;
  disabledOptions?: string[];
  name: string;
}>;
export declare const AutocompleteMultiple: ({
  label,
  placeholder,
  freeSolo,
  options,
  required,
  isDisabled,
  error,
  disabledOptions,
  onChange,
  value,
  groupBy,
  sx,
  fullWidth,
  name,
}: AutocompleteMultipleProps) => JSX.Element;
export {};
