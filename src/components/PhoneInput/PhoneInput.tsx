import { Ref } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { StyledFlagSelect, StyledPhoneInput } from './StyledPhoneInput.styles';
import InputAdornment from '@mui/material/InputAdornment';
import Phone from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { phoneInputCodeOptions } from '@constants';
import ErrorIcon from '@mui/icons-material/Error';
import { ChangeHandler } from 'react-hook-form';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';

type FormPhoneInputProps = WithSx<{
  code: string;
  number: string;
  onChange: (value: string) => void;
  onChangeCode: ChangeHandler;
  codeName: string;
  onBlur: () => void;
  error?: string;
  dataTestId?: string;
  fieldRef?: Ref<HTMLElement>;
}>;

export const PhoneInput = ({
  sx = [],
  code,
  number,
  onChange,
  onBlur,
  error,
  onChangeCode,
  codeName,
  dataTestId,
  fieldRef,
}: FormPhoneInputProps) => {
  const onChangePhone = ({ target: { value } }) => {
    const clearValue = value.match(/\d/g);
    onChange(clearValue ? clearValue.join('') : '');
  };
  const renderOptions = () => {
    return phoneInputCodeOptions.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value} sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2}>
            <Typography>{option.label}</Typography>
            <Typography>{option.country()}</Typography>
          </Stack>
          <Typography sx={{ pl: 2 }}>{option.value}</Typography>
        </MenuItem>
      );
    });
  };

  return (
    <StyledPhoneInput
      value={number}
      variant="filled"
      onChange={onChangePhone}
      hiddenLabel
      onBlur={onBlur}
      helperText={error}
      error={!!error}
      sx={[
        {},
        !!error && {
          '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` },
        },
        ...convertSxToArray(sx),
      ]}
      inputProps={{ 'data-testid': dataTestId, inputMode: 'numeric' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ mr: 0 }}>
            <Phone sx={(theme) => ({ color: theme.palette.icon.main })} />
            <StyledFlagSelect
              value={code || ''}
              variant="standard"
              onChange={onChangeCode}
              name={codeName}
              renderValue={(code) => phoneInputCodeOptions.find((option) => option.value === code)?.label}
              inputProps={{ 'data-testid': codeName }}
            >
              {renderOptions()}
            </StyledFlagSelect>
            <Typography>{code}</Typography>
          </InputAdornment>
        ),
        endAdornment: <>{error && <ErrorIcon sx={(theme) => ({ color: theme.palette.error.main })} />}</>,
      }}
      inputRef={fieldRef}
    />
  );
};
