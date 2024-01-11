import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import React, { ReactNode } from 'react';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { WithSx } from '@types';
import { StyledFormAutocomplete } from './Form.styles';
import { convertSxToArray } from '@utils/converters/mui';

export type FormAutocompleteMultipleProps<T extends FieldValues> = WithSx<{
  options: string[];
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  freeSolo?: boolean;
  rules?: any;
  popupIcon?: boolean;
}> &
  Omit<UseControllerProps<T>, 'rules'>;

export const FormAutocompleteMultiple = <T extends FieldValues>({
  options,
  label,
  isDisabled,
  fullWidth = true,
  required,
  placeholder,
  freeSolo,
  popupIcon,
  sx = [],
  rules = {},
  ...props
}: FormAutocompleteMultipleProps<T>) => {
  return (
    <Controller
      rules={{ validate: rules }}
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <StyledFormAutocomplete
          multiple
          freeSolo={freeSolo}
          options={options}
          value={value}
          disabled={isDisabled}
          ChipProps={{ deleteIcon: <CloseOutlinedIcon /> }}
          forcePopupIcon={popupIcon}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              hiddenLabel
              variant="filled"
              required={required}
              fullWidth={fullWidth}
              disabled={isDisabled}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : null}
              inputRef={ref}
            />
          )}
          onChange={(event, values) => onChange(values)}
          onBlur={onBlur}
          sx={[{}, ...convertSxToArray(sx)]}
        />
      )}
    />
  );
};
