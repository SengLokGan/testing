import { ReactNode, SyntheticEvent } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import type { AutocompleteFreeSoloAsyncOptionType } from '@types';
import { UseFormTrigger } from 'react-hook-form/dist/types/form';
import { InputTextType } from '@enums';
export type FormAutocompleteFreeSoloAsyncProps<T extends FieldValues> = WithSx<{
  getOptionsUrl: string;
  trigger: UseFormTrigger<any>;
  textType?: InputTextType;
  required?: boolean;
  isDisabled?: boolean;
  label?: string;
  groupBy?: (option: AutocompleteFreeSoloAsyncOptionType) => string;
  changeTransformCallback?: (
    value: string | AutocompleteFreeSoloAsyncOptionType | null,
    options: AutocompleteFreeSoloAsyncOptionType[],
    event: SyntheticEvent<Element, Event>,
  ) => string | AutocompleteFreeSoloAsyncOptionType | null;
  capitalizedLabel?: boolean;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  rules?: {
    [key: string]: (data: { value: string; label: string }) => boolean | string | undefined;
  };
  optionsTransform?: (options: any) => any;
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocompleteFreeSoloAsync: <T extends FieldValues>({
  label,
  getOptionsUrl,
  required,
  isDisabled,
  groupBy,
  textType,
  trigger,
  sx,
  InputProps,
  changeTransformCallback,
  optionsTransform,
  rules,
  capitalizedLabel,
  ...props
}: FormAutocompleteFreeSoloAsyncProps<T>) => JSX.Element;
