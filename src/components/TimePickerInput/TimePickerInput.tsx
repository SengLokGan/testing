import React, { ReactNode, Ref, useCallback } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils';

type TimePickerInputProps = WithSx<{
  label: string | ReactNode;
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  name: string;
  ampm?: boolean;
  isDisabled?: boolean;
  error?: string | null;
  required?: boolean;
  fullWidth?: boolean;
  maxTime?: Date;
  minTime?: Date;
  ref?: Ref<HTMLElement>;
}>;

export const TimePickerInput = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  ampm = true,
  isDisabled,
  error,
  required,
  fullWidth = true,
  maxTime,
  minTime,
  ref,
  sx = [],
}: TimePickerInputProps) => {
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
    [error],
  );

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
          helperText: error ? error : null,
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
            'data-testid': `${name}TimePicker`,
            ref,
          },
        },
      }}
    />
  );
};
