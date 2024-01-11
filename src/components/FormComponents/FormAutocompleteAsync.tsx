import { WithSx } from '@types';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  AutocompleteAsync,
  AutocompleteAsyncOptionType,
} from '@components/autocompletes/AutocompleteAsync/AutocompleteAsync';

export type FormAutocompleteAsyncProps<T extends FieldValues> = WithSx<{
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  getOptionsUrl: string;
  fullWidth?: boolean;
  capitalizedLabel?: boolean;
  rules?: { [key: string]: (data: { value: string; label: string }) => boolean | string | undefined };
  optionsTransform?: (options: any) => AutocompleteAsyncOptionType[];
  onOptionsUpdated?: (options: any) => any;
}> &
  Omit<UseControllerProps<T>, 'rules'>;

export const FormAutocompleteAsync = <T extends FieldValues>({
  label,
  required,
  isDisabled,
  getOptionsUrl,
  onOptionsUpdated,
  fullWidth = true,
  capitalizedLabel,
  sx,
  rules = {},
  optionsTransform,
  ...props
}: FormAutocompleteAsyncProps<T>) => {
  return (
    <Controller
      {...props}
      rules={{ validate: rules }}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <AutocompleteAsync
            fullWidth={fullWidth}
            value={value}
            label={label}
            required={required}
            isDisabled={isDisabled}
            getOptionsUrl={getOptionsUrl}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            optionsTransform={optionsTransform}
            onOptionsUpdated={onOptionsUpdated}
            name={props.name}
            sx={sx}
            capitalizedLabel={capitalizedLabel}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
