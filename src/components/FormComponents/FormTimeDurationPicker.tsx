import React, { ReactNode, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { Controller, FieldValues, UseControllerProps, UseFormSetValue } from 'react-hook-form';
import { UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import TextField from '@mui/material/TextField';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { IconButton, InputAdornment, Popover } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { WithSx } from '@types';
import ErrorIcon from '@mui/icons-material/Error';
import { convertSxToArray } from '@utils/converters/mui';

type FormTimeDurationPickerProps<T extends FieldValues> = WithSx<{
  name: string;
  label: ReactNode;
  required?: boolean;
  setValue?: UseFormSetValue<any>;
  isDisabled?: boolean;
  watch: UseFormWatch<any>;
  trigger?: UseFormTrigger<any>;
  defaultMinutes?: number;
  fullWidth?: boolean;
}> &
  UseControllerProps<T>;

export const FormTimeDurationPicker = <T extends FieldValues>({
  label,
  required,
  isDisabled,
  sx = [],
  watch,
  trigger,
  fullWidth = true,
  defaultMinutes = 240,
  ...props
}: FormTimeDurationPickerProps<T>) => {
  const inputRef = useRef(null);
  const currentValue = watch(props.name) || defaultMinutes;
  const [state, setState] = useState<number>(currentValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currentValue) {
      trigger && trigger(props.name);
      setState(currentValue);
      (inputRef.current as any).value = dateToValidString(getDateByMinutes(currentValue));
    } else {
      trigger && trigger(props.name);
      setState(0);
      (inputRef.current as any).value = '00:00';
    }
  }, [currentValue]);

  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => {
        const onChangeProxy = debounce(({ target: { value } }) => {
          const date = getDateByMinutes(0);
          let [hours, minutes] = value.split(':');
          if (hours && minutes) {
            date.setHours(hours > 24 ? 0 : hours);
            date.setMinutes(minutes);
          }
          onChange(getMinutesByDate(date));
        }, 300);

        return (
          <>
            <InputMask
              mask="99:59"
              maskChar="0"
              ref={inputRef}
              defaultValue={dateToValidString(getDateByMinutes(state))}
              formatChars={{
                '5': '[0-5]',
                '9': '[0-9]',
              }}
              onBlur={onBlur}
              disabled={isDisabled}
              onChange={onChangeProxy as any}
            >
              {() => (
                <TextField
                  data-testid={`form-time-duration-picker-${props.name}`}
                  variant="filled"
                  helperText={error ? error.message : null}
                  error={!!error}
                  required={required}
                  label={label}
                  fullWidth={fullWidth}
                  disabled={isDisabled}
                  sx={[
                    error && {
                      '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)`, pr: 0 },
                      label: {
                        transform: ({ spacing }) => `translate(${spacing(2)}, ${spacing(1)}) scale(0.75)`,
                      },
                    },
                    {
                      '& .MuiInputBase-input': {
                        mb: 0,
                      },
                    },
                    ...convertSxToArray(sx),
                  ]}
                  inputProps={{
                    'data-testid': `${props.name}TimeDurationPicker`,
                    disabled: isDisabled,
                    className: isDisabled ? 'Mui-disabled' : '',
                  }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {error && (
                          <InputAdornment
                            position="end"
                            sx={{ position: 'absolute', right: ({ spacing }) => spacing(5) }}
                          >
                            <ErrorIcon sx={{ color: (theme) => theme.palette.error.main, pointerEvents: 'none' }} />
                          </InputAdornment>
                        )}
                        <InputAdornment position="end">
                          <IconButton
                            data-testid={`${props.name}TimeDurationPickerIconButton`}
                            disabled={isDisabled}
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                          >
                            <AccessTimeIcon />
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                  inputRef={ref}
                />
              )}
            </InputMask>

            <Popover
              data-testid={`popover-${props.name}-duration-timepicker`}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                'button.MuiIconButton-root:not(.MuiPickersArrowSwitcher-button)': {
                  display: 'none',
                },
                '.MuiPickersArrowSwitcher-spacer': {
                  display: 'none',
                },
              }}
            >
              <StaticTimePicker
                displayStaticWrapperAs="desktop"
                value={getDateByMinutes(currentValue)}
                onChange={(newValue) => {
                  onChange(newValue ? getMinutesByDate(newValue) : defaultMinutes);
                }}
              />
            </Popover>
          </>
        );
      }}
    />
  );
};

const dateToValidString = (val: Date) => {
  return format(val, val.getHours() ? 'hh:mm' : '00:mm');
};

const getDateByMinutes = (minutes: number) => {
  return new Date(0, 0, 0, 0, minutes);
};

const getMinutesByDate = (date: Date) => {
  return date.getHours() * 60 + date.getMinutes();
};
