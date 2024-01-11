import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import React, { ReactNode, SyntheticEvent } from 'react';
import { debounce } from '@mui/material';
import TextField from '@mui/material/TextField';
import { StyledFormAutocomplete } from './Form.styles';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
import { WithSx } from '@types';
import { capitalizeFirstLetter } from '@utils';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorIcon from '@mui/icons-material/Error';
import { convertSxToArray } from '@utils/converters/mui';
import Box from '@mui/material/Box';

export interface FormAutocompleteOption {
  label: string;
  value: string | number;
  group?: string;
}

export type FormAutocompleteProps<T extends FieldValues> = WithSx<{
  popupIcon?: boolean;
  options: FormAutocompleteOption[] | string[];
  label?: string | ReactNode;
  isDisabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  fieldProps?: any;
  loading?: boolean;
  capitalizedLabel?: boolean;
  groupBy?: (option: AutocompleteFreeSoloOptionType) => string;
  rules?: { [key: string]: (data: { value: string; label: string }) => boolean | string | undefined };
  multiline?: boolean;
}> &
  Omit<UseControllerProps<T>, 'rules'>;

export const FormAutocomplete = <T extends FieldValues>({
  popupIcon,
  options,
  label,
  isDisabled,
  fullWidth = true,
  loading = false,
  required,
  placeholder,
  capitalizedLabel = true,
  fieldProps,
  groupBy,
  multiline = false,
  sx = [],
  rules = {},
  ...props
}: FormAutocompleteProps<T>) => {
  const formattedOptions = options.map((option) => {
    if (typeof option === 'string') return { label: option, value: option };
    return option ? option : { label: '', value: null };
  });

  return (
    <Controller
      rules={{ validate: rules }}
      {...props}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        const onAutocompleteChange = (
          event: SyntheticEvent<Element, Event>,
          value: string | AutocompleteFreeSoloOptionType | null,
        ) => {
          onChange(value);
        };

        const onAutocompleteInput = debounce((event: any, value: any) => {
          const result = formattedOptions.find((option) => option.label.toLowerCase() === value.toLowerCase());
          if (result) onChange(result);
        }, 300);

        const getOptionLabel = (option: { label: string; value: null | string | number }): string => {
          if (!option.label) return '';
          const value = option.label || option.value || '';
          return capitalizedLabel ? capitalizeFirstLetter(value.toString()) : value.toString();
        };

        return (
          <Box sx={{ width: fullWidth ? 1 : 'auto' }}>
            <StyledFormAutocomplete
              options={formattedOptions}
              value={value}
              onChange={onAutocompleteChange}
              onInputChange={onAutocompleteInput}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
              loading={loading}
              groupBy={groupBy}
              forcePopupIcon={popupIcon}
              fullWidth={fullWidth}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  hiddenLabel
                  variant="filled"
                  required={required}
                  disabled={isDisabled}
                  placeholder={placeholder}
                  error={!!error}
                  multiline={multiline}
                  helperText={error ? error.message : null}
                  inputProps={{
                    ...params.inputProps,
                    'data-testid': `${props.name}FormAutocomplete`,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: error && (
                      <InputAdornment
                        position="end"
                        sx={{
                          position: 'absolute',
                          right: ({ spacing }) => spacing(4),
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        <ErrorIcon sx={{ color: (theme) => theme.palette.error.main, pointerEvents: 'none' }} />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={ref}
                  sx={{
                    pointerEvents: isDisabled ? 'none' : 'initial',
                  }}
                />
              )}
              {...fieldProps}
              sx={[
                !isDisabled &&
                  error && {
                    '& .MuiAutocomplete-inputRoot': { backgroundColor: `rgba(186, 27, 27, .08)`, pr: 0 },
                  },
                {
                  flex: 1,
                  pointerEvents: isDisabled ? 'none' : 'initial',
                  '& .MuiAutocomplete-inputRoot': {
                    p: ({ spacing }) => `${spacing(2.375, 4, 0, 1.5)} !important`,
                  },
                  '& input': {
                    p: ({ spacing }) => `${spacing(0.875, 0.5, 0.875, 0.5)} !important`,
                  },
                },
                ...convertSxToArray(sx),
              ]}
            />
          </Box>
        );
      }}
    />
  );
};
