import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { UseFormTrigger } from 'react-hook-form/dist/types/form';
export type FormAutocompleteFreeSoloAsyncMultipleProps<T extends FieldValues> = WithSx<{
  getOptionsUrl: string;
  trigger: UseFormTrigger<any>;
  required?: boolean;
  placeholderRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  capitalizedLabel?: boolean;
  placeholder?: string;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  rules?: any;
  optionsTransform?: (options: any) => any;
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocompleteFreeSoloAsyncMultiple: <T extends FieldValues>({
  label,
  getOptionsUrl,
  required,
  isDisabled,
  trigger,
  sx,
  InputProps,
  optionsTransform,
  rules,
  placeholder,
  placeholderRequired,
  ...props
}: FormAutocompleteFreeSoloAsyncMultipleProps<T>) => JSX.Element;
