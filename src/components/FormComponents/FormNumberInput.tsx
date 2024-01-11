import { NumberInput } from '@src/components';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { ReactNode } from 'react';

export type FormNumberInputProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
  withoutDisableMax?: boolean;
}> &
  UseControllerProps<T>;

export const FormNumberInput = <T extends FieldValues>({
  label,
  required,
  minValue,
  maxValue,
  withoutDisableMax,
  sx,
  ...props
}: FormNumberInputProps<T>) => {
  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <NumberInput
          onChange={onChange}
          value={value}
          label={label}
          required={required}
          onBlur={onBlur}
          error={error}
          dataTestId={`${props.name}NumberInput`}
          fieldRef={ref}
          minValue={minValue}
          maxValue={maxValue}
          withoutDisableMax={withoutDisableMax}
          sx={sx}
        />
      )}
    />
  );
};
