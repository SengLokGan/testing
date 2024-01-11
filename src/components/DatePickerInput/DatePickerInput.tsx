import { ReactNode, useCallback, Ref } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import { WithSx } from '@types';
import ErrorIcon from '@mui/icons-material/Error';
import { convertSxToArray } from '@utils/converters/mui';

type DatePickerInputProps = WithSx<{
  label: string | ReactNode;
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  error?: string | null;
  required?: boolean;
  fullWidth?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
  fieldRef?: Ref<HTMLElement>;
}>;

export const DatePickerInput = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  minDate,
  maxDate,
  isDisabled,
  error,
  required,
  fullWidth,
  shouldDisableDate,
  fieldRef,
  sx = [],
}: DatePickerInputProps) => {
  const popperSxProps = {
    '& .MuiPickersDay-root': {
      fontSize: (theme) => theme.typography.fontSize,
      fontWeight: (theme) => theme.typography.fontWeightMedium,
      color: (theme) => theme.palette.text.primary,
      '&:hover': { background: 'rgba(0, 99, 153, 0.08)' },
    },
    '& .MuiPickersDay-today': {
      backgroundColor: (theme) => theme.palette.primary.light,
      border: 'unset !important',
    },
    '& .Mui-selected': {
      backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
    },
    '& .Mui-disabled': {
      color: (theme) => `${theme.palette.neutral[60]} !important`,
    },
  };

  const getOpenPickerIcon = useCallback(
    (props) => (
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
        <CalendarMonth {...props} />
      </>
    ),
    [error],
  );
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy"
      onClose={onBlur}
      data-testid={`${name}DatePicker`}
      minDate={minDate}
      disabled={isDisabled}
      maxDate={maxDate}
      shouldDisableDate={shouldDisableDate}
      slots={{
        openPickerIcon: getOpenPickerIcon,
      }}
      slotProps={{
        popper: { sx: popperSxProps },
        textField: {
          variant: 'filled',
          helperText: error || null,
          error: !!error,
          sx: [
            {
              '& .MuiInputAdornment-root .MuiIconButton-root': { mr: 0 },
              '& .MuiInputBase-input': { pr: 0 },
              label: {
                pointerEvents: 'none',
              },
            },
            error && {
              '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` },
            },
            ...convertSxToArray(sx),
          ],
          required,
          onBlur,
          fullWidth,
          inputProps: {
            'data-testid': `${name}DatePicker`,
            placeholder: 'DD/MM/YYYY',
            ref: fieldRef,
          },
        },
      }}
    />
  );
};
