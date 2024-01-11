import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
import { WithSx } from '@types';
import { InputBaseComponentProps } from '@mui/material';
export type FormAutocompleteFreeSoloProps<T extends FieldValues> = WithSx<{
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  options: AutocompleteFreeSoloOptionType[];
  groupBy?: (option: AutocompleteFreeSoloOptionType) => string;
  renderOptionCallback?: (props: any, option: any) => ReactElement;
  changeTransformCallback?: (
    value: string | AutocompleteFreeSoloOptionType | null,
    options: AutocompleteFreeSoloOptionType[],
    event: SyntheticEvent<Element, Event>,
  ) => string | AutocompleteFreeSoloOptionType | null;
  capitalizedLabel?: boolean;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  inputProps?: InputBaseComponentProps;
  rules?: {
    [key: string]: (data: { value: string; label: string }) => boolean | string | undefined;
  };
  adornment?: string;
  transform?: (value: { label: string; value: string }) => {
    label: string;
    value: string;
  };
}> &
  Omit<UseControllerProps<T>, 'rules'>;
export declare const FormAutocompleteFreeSolo: <T extends FieldValues>({
  label,
  required,
  isDisabled,
  options,
  groupBy,
  sx,
  InputProps,
  inputProps,
  capitalizedLabel,
  changeTransformCallback,
  renderOptionCallback,
  rules,
  adornment,
  transform,
  ...props
}: FormAutocompleteFreeSoloProps<T>) => JSX.Element;
