import React, { ReactNode, useCallback } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { WithSx } from '@types';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { convertSxToArray } from '@utils/converters/mui';

type FormTimePickerProps<T extends FieldValues> = WithSx<{
  label: string | ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  isDisabled?: boolean;
  ampm?: boolean;
  maxTime?: Date;
  minTime?: Date;
}> &
  UseControllerProps<T>;

export const FormTimePicker = <T extends FieldValues>({
  label,
  required,
  fullWidth = true,
  sx = [],
  name,
  ampm = true,
  isDisabled,
  maxTime,
  minTime,
  ...props
}: FormTimePickerProps<T>) => {
  const getOpenPickerIcon = useCallback(
    (props, error) => (
      <>
        {Boolean(error) && (
          <ErrorIcon
            sx={(theme) => ({
              position: 'absolute',
              right: theme.spacing(5),
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.palette.error.main,
              pointerEvents: 'none',
            })}
          />
        )}
        <AccessTimeIcon {...props} />
      </>
    ),
    [],
  );
  return (
    <Controller
      name={name}
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <TimePicker
            label={label}
            value={value}
            onChange={onChange}
            ampm={ampm}
            views={['hours', 'minutes']}
            onClose={onBlur}
            maxTime={maxTime}
            minTime={minTime}
            disabled={isDisabled}
            slots={{
              openPickerIcon: (props) => getOpenPickerIcon(props, error),
            }}
            slotProps={{
              popper: {
                sx: {
                  '.MuiPickersArrowSwitcher-spacer': {
                    display: 'none',
                  },
                },
              },
              textField: {
                variant: 'filled',
                helperText: error ? error.message : null,
                error: !!error,
                sx: [
                  {
                    '& .MuiInputBase-input': { pr: 0, textTransform: 'uppercase' },
                    '& .MuiInputAdornment-root .MuiIconButton-root': { mr: 0 },
                  },
                  !!error && { '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` } },
                  ...convertSxToArray(sx),
                ],
                required,
                onBlur,
                fullWidth,
                inputProps: {
                  'data-testid': `${name}FormTimePicker`,
                  ref,
                },
              },
            }}
          />
        );
      }}
    />
  );
};
