/// <reference types="react" />
import { WithSx } from '@types';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { AutocompleteAsyncOptionType } from '@components/autocompletes/AutocompleteAsync/AutocompleteAsync';
export type FormAutocompleteAsyncProps<T extends FieldValues> = WithSx<{
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  getOptionsUrl: string;
  fullWidth?: boolean;
  capitalizedLabel?: boolean;
  rules?: {
    [key: string]: (data: { value: string; label: string }) => boolean | string | undefined;
  };
  optionsTransform?: (options: any) => AutocompleteAsyncOptionType[];
  onOptionsUpdated?: (options: any) => any;
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocompleteAsync: <T extends FieldValues>({
  label,
  required,
  isDisabled,
  getOptionsUrl,
  onOptionsUpdated,
  fullWidth,
  capitalizedLabel,
  sx,
  rules,
  optionsTransform,
  ...props
}: FormAutocompleteAsyncProps<T>) => JSX.Element;
