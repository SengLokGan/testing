import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ReactNode } from 'react';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
import { WithSx } from '@types';
export interface FormAutocompleteOption {
  label: string;
  value: string | number;
  group?: string;
}
export type FormAutocompleteProps<T extends FieldValues> = WithSx<{
  popupIcon?: boolean;
  options: FormAutocompleteOption[] | string[];
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  fieldProps?: any;
  loading?: boolean;
  capitalizedLabel?: boolean;
  groupBy?: (option: AutocompleteFreeSoloOptionType) => string;
  rules?: {
    [key: string]: (data: { value: string; label: string }) => boolean | string | undefined;
  };
  multiline?: boolean;
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocomplete: <T extends FieldValues>({
  popupIcon,
  options,
  label,
  isDisabled,
  fullWidth,
  loading,
  required,
  placeholder,
  capitalizedLabel,
  fieldProps,
  groupBy,
  multiline,
  sx,
  rules,
  ...props
}: FormAutocompleteProps<T>) => JSX.Element;
