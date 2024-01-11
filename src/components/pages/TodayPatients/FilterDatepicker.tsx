import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { format } from 'date-fns';

interface FilterDatepickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const FilterDatepicker = ({ date, onChange }: FilterDatepickerProps) => {
  return (
    <DesktopDatePicker
      value={date}
      onChange={(newValue) => {
        newValue &&
          setTimeout(() => {
            onChange(newValue);
          }, 100);
      }}
      slots={{
        textField: (props: TextFieldProps) => {
          const { inputProps, InputProps, value } = props;
          return (
            <Box
              sx={[
                {
                  display: 'flex',
                  alignItems: 'center',
                  padding: (theme) => theme.spacing(1.25, 1.5, 1.25, 2),
                  background: 'rgba(0, 99, 153, 0.08)',
                  borderRadius: 1,
                },
                {
                  '& > input': {
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                  },
                },
              ]}
              ref={InputProps?.ref}
            >
              <Typography variant="labelL" ref={inputProps?.ref}>
                {format(value ? new Date(value as string) : new Date(), 'LLLL dd, yyyy')}
              </Typography>
              {InputProps?.endAdornment}
            </Box>
          );
        },
      }}
    />
  );
};
