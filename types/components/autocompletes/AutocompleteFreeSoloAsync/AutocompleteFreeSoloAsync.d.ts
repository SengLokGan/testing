import { ReactElement, ReactNode, SyntheticEvent, Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import type { AutocompleteFreeSoloAsyncOptionType, WithSx } from '@types';
import { InputTextType } from '@enums';
type AutocompleteFreeSoloProps = WithSx<{
  error?: FieldError;
  label?: string;
  required?: boolean;
  onChange: (value: any) => void;
  textType?: InputTextType;
  onBlur?: () => void;
  isDisabled?: boolean;
  value: {
    value: string;
    label: string;
  };
  name: string;
  groupBy?: (option: AutocompleteFreeSoloAsyncOptionType) => string;
  capitalizedLabel?: boolean;
  renderOptionCallback?: (props: any, option: any) => ReactElement;
  changeTransformCallback?: (
    value: string | AutocompleteFreeSoloAsyncOptionType | null,
    options: AutocompleteFreeSoloAsyncOptionType[],
    event: SyntheticEvent<Element, Event>,
  ) => string | AutocompleteFreeSoloAsyncOptionType | null;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  getOptionsUrl: string;
  optionsTransform?: (options: any) => any;
  fieldRef?: Ref<any>;
}>;
export declare const AutocompleteFreeSoloAsync: ({
  label,
  error,
  textType,
  required,
  onChange,
  isDisabled,
  getOptionsUrl,
  value,
  name,
  groupBy,
  InputProps,
  optionsTransform,
  renderOptionCallback,
  sx,
  capitalizedLabel,
  fieldRef,
}: AutocompleteFreeSoloProps) => JSX.Element;
export {};
