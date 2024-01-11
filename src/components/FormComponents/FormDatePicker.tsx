import { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';

type FormDatePickerProps<T extends FieldValues> = WithSx<{
  label: string | ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
}> &
  UseControllerProps<T>;

export const FormDatePicker = <T extends FieldValues>({
  label,
  required,
  fullWidth = true,
  sx,
  minDate,
  maxDate,
  name,
  isDisabled,
  shouldDisableDate,
  ...props
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <DatePickerInput
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            minDate={minDate}
            maxDate={maxDate}
            isDisabled={isDisabled}
            error={error?.message}
            required={required}
            fullWidth={fullWidth}
            sx={sx}
            shouldDisableDate={shouldDisableDate}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
