import React, { ReactNode, useMemo } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import uniqId from 'uniqid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorIcon from '@mui/icons-material/Error';
import { WithSx } from '@types';
import { capitalizeFirstLetter } from '@utils';
import { convertSxToArray } from '@utils/converters/mui';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '@src/styles/theme';

export type OptionProps = {
  label: string | ReactNode;
  value: string | number;
  disabled?: boolean;
};

export type FormInputSelectProps<T extends FieldValues> = WithSx<{
  options: OptionProps[];
  label: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  multiple?: boolean;
  capitalizedLabel?: boolean;
  clearable?: boolean;
  emptyBody?: string | ReactNode;
}> &
  UseControllerProps<T>;

export const FormInputSelect = <T extends FieldValues>({
  options,
  label,
  isDisabled,
  fullWidth = true,
  required,
  multiple,
  sx = [],
  clearable = false,
  capitalizedLabel = true,
  emptyBody,
  ...props
}: FormInputSelectProps<T>) => {
  const generateSingleOptions = useMemo(() => {
    if (options.length === 0) {
      return emptyBody || <CircularProgress size="20px" color="inherit" />;
    }
    return options.map((option) => (
      <MenuItem key={uniqId()} value={option.value} disabled={option?.disabled}>
        {capitalizedLabel && option.label ? capitalizeFirstLetter(option.label as string) : option.label}
      </MenuItem>
    ));
  }, [options]);

  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        const hasValue = Boolean(value);
        const showClearButton = clearable && hasValue;

        const onBlurProxy = () => {
          if (error?.type !== 'custom') onBlur();
        };

        return (
          <TextField
            select
            fullWidth={fullWidth}
            label={label}
            onChange={onChange}
            value={options.length === 0 || !options.map(({ value }) => value).includes(value) ? '' : value}
            disabled={isDisabled}
            inputProps={{ 'data-testid': `${props.name}SelectInput` }}
            helperText={error ? error.message : null}
            error={!!error}
            variant="filled"
            InputProps={{
              endAdornment: (
                <>
                  {error && (
                    <InputAdornment
                      position="end"
                      sx={{ position: 'absolute', right: ({ spacing }) => spacing(showClearButton ? 8 : 4) }}
                    >
                      <ErrorIcon sx={{ color: (theme) => theme.palette.error.main, pointerEvents: 'none' }} />
                    </InputAdornment>
                  )}
                  {showClearButton && (
                    <InputAdornment
                      sx={{
                        position: 'absolute',
                        right: (theme) => theme.spacing(4),
                        top: '50%',
                      }}
                      position="end"
                    >
                      <IconButton sx={{ p: 0.5 }} onClick={() => onChange('')}>
                        <ClearIcon sx={{ fontSize: '1.25rem' }} />
                      </IconButton>
                    </InputAdornment>
                  )}
                </>
              ),
            }}
            SelectProps={{
              multiple,
              MenuProps: {
                PaperProps: {
                  sx: {
                    [theme.breakpoints.down('sm')]: {
                      maxHeight: `${theme.spacing(37.5)} !important`,
                    },
                  },
                },
                sx: [
                  options.length === 0 && {
                    '& .MuiMenu-list': {
                      display: 'flex',
                      justifyContent: 'center',
                    },
                  },
                ],
              },
            }}
            sx={[
              error && {
                '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)`, pr: 0 },
              },
              {
                '.MuiInputBase-formControl': {
                  pr: 0,
                },
              },
              ...convertSxToArray(sx),
            ]}
            required={required}
            onBlur={onBlurProxy}
            inputRef={ref}
          >
            {!required && <MenuItem value="">&nbsp;</MenuItem>}
            {generateSingleOptions}
          </TextField>
        );
      }}
    />
  );
};
