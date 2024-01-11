import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import type { InputProps } from '@mui/material/Input';
import React, { ChangeEvent, ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import InputAdornment from '@mui/material/InputAdornment';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';
import { InputTextType } from '@enums';

export type FormMaskedInputTextProps<T extends FieldValues> = WithSx<{
  mask: string;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string | null;
  InputProps?: InputProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  textType?: InputTextType;
  required?: boolean;
  transform?: (string) => string;
  adornment?: string;
  minRows?: number;
}> &
  UseControllerProps<T>;

export const FormMaskedInputText = <T extends FieldValues>({
  mask,
  maskChar,
  formatChars,
  label,
  isDisabled,
  textType = InputTextType.Normal,
  helperText = null,
  hiddenLabel = false,
  multiline = false,
  fullWidth = true,
  required,
  transform,
  minRows,
  adornment,
  sx = [],
  InputProps,
  ...props
}: FormMaskedInputTextProps<T>) => {
  const setTextTransform = () => {
    if (textType === InputTextType.Uppercase) return 'uppercase';
    if (textType === InputTextType.Capitalize) return 'capitalize';
    return 'unset';
  };

  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        const onChangeProxy = (event: ChangeEvent<HTMLInputElement>) => {
          transform ? onChange(transform(event)) : onChange(event);
        };
        return (
          <InputMask
            mask={mask}
            maskChar={maskChar}
            value={value}
            formatChars={formatChars}
            onBlur={onBlur}
            disabled={isDisabled}
            onChange={onChangeProxy}
          >
            {() => (
              <TextField
                variant="filled"
                helperText={error ? error.message : helperText}
                error={!!error}
                required={required}
                label={label}
                fullWidth={fullWidth}
                hiddenLabel={hiddenLabel}
                multiline={multiline}
                minRows={minRows}
                disabled={isDisabled}
                sx={[
                  {
                    '& .MuiInputBase-input': {
                      mb: 0,
                    },
                  },
                  !!error && {
                    '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` },
                  },
                  ...convertSxToArray(sx),
                ]}
                InputProps={{
                  endAdornment: <>{error && <ErrorIcon sx={{ color: (theme) => theme.palette.error.main }} />}</>,
                  ...(adornment
                    ? {
                        startAdornment: (
                          <InputAdornment position="start" sx={{ pointerEvents: 'none', pl: 0.5 }}>
                            {adornment}
                          </InputAdornment>
                        ),
                      }
                    : {}),
                }}
                inputProps={{
                  ...(InputProps?.inputProps ? InputProps.inputProps : {}),
                  disabled: isDisabled,
                  className: isDisabled ? 'Mui-disabled' : '',
                  style: { textTransform: setTextTransform() },
                  'data-testid': `${props.name}TextInput`,
                }}
                inputRef={ref}
              />
            )}
          </InputMask>
        );
      }}
    />
  );
};
