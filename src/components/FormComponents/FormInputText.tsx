import type { InputProps } from '@mui/material/Input';
import React, { ChangeEvent, ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { InputText } from '@components';
import { InputBaseComponentProps } from '@mui/material';
import { InputTextType } from '@enums';

export type FormInputTextProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  textType?: InputTextType;
  required?: boolean;
  transform?: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  adornment?: string;
  minRows?: number;
}> &
  UseControllerProps<T>;

export const FormInputText = <T extends FieldValues>({
  label,
  isDisabled,
  textType,
  InputProps,
  inputProps,
  helperText,
  hiddenLabel,
  multiline,
  fullWidth,
  required,
  transform,
  adornment,
  minRows,
  sx,
  ...props
}: FormInputTextProps<T>) => {
  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <InputText
            error={error?.message}
            helperText={helperText}
            textType={textType}
            name={props.name}
            isDisabled={isDisabled}
            transform={transform}
            onChange={onChange}
            minRows={minRows}
            onBlur={onBlur}
            adornment={adornment}
            InputProps={InputProps}
            inputProps={inputProps}
            value={value || ''}
            hiddenLabel={hiddenLabel}
            multiline={multiline}
            fullWidth={fullWidth}
            label={label}
            required={required}
            sx={sx}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
