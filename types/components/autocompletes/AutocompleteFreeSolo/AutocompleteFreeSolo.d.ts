import { FieldError } from 'react-hook-form/dist/types';
import { SyntheticEvent, ReactNode, Ref, ReactElement } from 'react';
import { WithSx } from '@types';
import { InputBaseComponentProps } from '@mui/material';
export interface AutocompleteFreeSoloOptionType {
  value: string;
  label: string;
  group?: string;
  [key: string]: any;
}
type AutocompleteFreeSoloProps = WithSx<{
  error?: FieldError;
  label?: string;
  required?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  options: AutocompleteFreeSoloOptionType[];
  value:
    | string
    | {
        value: string;
        label: string;
      };
  name: string;
  groupBy?: (option: AutocompleteFreeSoloOptionType) => string;
  capitalizedLabel?: boolean;
  changeTransformCallback?: (
    value: string | AutocompleteFreeSoloOptionType | null,
    options: AutocompleteFreeSoloOptionType[],
    event: SyntheticEvent<Element, Event>,
  ) => string | AutocompleteFreeSoloOptionType | null;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  inputProps?: InputBaseComponentProps;
  fieldRef?: Ref<any>;
  renderOptionCallback?: (props: any, option: any) => ReactElement;
  adornment?: string;
}>;
export declare const AutocompleteFreeSolo: ({
  label,
  options,
  error,
  required,
  onChange,
  onBlur,
  isDisabled,
  value,
  name,
  groupBy,
  InputProps,
  inputProps,
  changeTransformCallback,
  sx,
  fieldRef,
  capitalizedLabel,
  renderOptionCallback,
  adornment,
}: AutocompleteFreeSoloProps) => JSX.Element;
export {};
