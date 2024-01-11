import React, { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { UseFormTrigger } from 'react-hook-form/dist/types/form';
import { AutocompleteFreeSoloAsyncMultiple } from '@components/autocompletes/AutocompleteFreeSoloAsyncMultiple/AutocompleteFreeSoloAsyncMultiple';

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

export const FormAutocompleteFreeSoloAsyncMultiple = <T extends FieldValues>({
  label,
  getOptionsUrl,
  required,
  isDisabled,
  trigger,
  sx,
  InputProps,
  optionsTransform,
  rules = {},
  placeholder,
  placeholderRequired,
  ...props
}: FormAutocompleteFreeSoloAsyncMultipleProps<T>) => {
  return (
    <Controller
      {...props}
      rules={{ validate: rules }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        const onChangeProxy = (...data) => {
          onChange(...data);
          trigger(props.name);
        };

        return (
          <AutocompleteFreeSoloAsyncMultiple
            getOptionsUrl={getOptionsUrl}
            optionsTransform={optionsTransform}
            value={value}
            label={label}
            name={props.name}
            required={required}
            isDisabled={isDisabled}
            onChange={onChangeProxy}
            placeholder={placeholderRequired ? `${placeholder}*` : placeholder}
            error={error}
            sx={sx}
            InputProps={InputProps}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
