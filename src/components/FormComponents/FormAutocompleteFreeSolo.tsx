import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  AutocompleteFreeSolo,
  AutocompleteFreeSoloOptionType,
} from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
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
  rules?: { [key: string]: (data: { value: string; label: string }) => boolean | string | undefined };
  adornment?: string;
  transform?: (value: { label: string; value: string }) => { label: string; value: string };
}> &
  Omit<UseControllerProps<T>, 'rules'>;

export const FormAutocompleteFreeSolo = <T extends FieldValues>({
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
  rules = {},
  adornment,
  transform,
  ...props
}: FormAutocompleteFreeSoloProps<T>) => {
  return (
    <Controller
      {...props}
      rules={{ validate: rules }}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        const handleChange = (event) => {
          if (transform) {
            const transformedValue = transform(event);
            onChange(transformedValue);
          } else {
            onChange(event);
          }
        };
        return (
          <AutocompleteFreeSolo
            value={value || ''}
            label={label}
            name={props.name}
            required={required}
            isDisabled={isDisabled}
            onChange={handleChange}
            renderOptionCallback={renderOptionCallback}
            onBlur={onBlur}
            error={error}
            changeTransformCallback={changeTransformCallback}
            options={options}
            groupBy={groupBy}
            sx={sx}
            InputProps={InputProps}
            inputProps={inputProps}
            capitalizedLabel={capitalizedLabel}
            adornment={adornment}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
