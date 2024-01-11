import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent, ReactNode, Ref } from 'react';
import { InputTextType } from '@enums';
import type { InputProps } from '@mui/material/Input';
import { WithSx } from '@types';
import ErrorIcon from '@mui/icons-material/Error';
import { convertSxToArray } from '@utils';
import { InputBaseComponentProps } from '@mui/material';

type InputTextProps = WithSx<{
  error?: string;
  helperText?: string | null;
  textType?: InputTextType;
  name: string;
  isDisabled?: boolean;
  transform?: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  minRows?: number;
  value: string;
  onBlur?: () => void;
  adornment?: string;
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  hiddenLabel?: boolean;
  multiline?: boolean;
  fullWidth?: boolean;
  label?: string | ReactNode;
  required?: boolean;
  fieldRef?: Ref<HTMLElement>;
}>;

export const InputText = ({
  error,
  helperText = null,
  textType = InputTextType.Normal,
  name,
  isDisabled,
  transform,
  onChange,
  minRows,
  value,
  onBlur,
  adornment,
  InputProps,
  inputProps,
  hiddenLabel = false,
  multiline = false,
  fullWidth = true,
  label,
  required,
  fieldRef,
  sx = [],
}: InputTextProps) => {
  const setTextTransform = () => {
    if (textType === InputTextType.Uppercase) return 'uppercase';
    if (textType === InputTextType.Capitalize) return 'capitalize';
    return 'unset';
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    transform ? onChange(transform(event)) : onChange(event);
  };
  return (
    <TextField
      helperText={error || helperText}
      error={!!error}
      inputProps={{
        style: { textTransform: setTextTransform() },
        'data-testid': `${name}TextInput`,
        ...inputProps,
      }}
      disabled={isDisabled}
      onChange={change}
      minRows={minRows}
      onBlur={() => {
        onChange({
          target: { value: value && value?.trim ? value.trim() : value },
        } as ChangeEvent<HTMLInputElement>);
        onBlur && onBlur();
      }}
      value={value}
      InputProps={{
        endAdornment: error && (
          <InputAdornment
            position="end"
            sx={{
              position: 'absolute',
              right: ({ spacing }) => spacing(1),
              top: '50%',
            }}
          >
            <ErrorIcon
              sx={{
                color: (theme) => theme.palette.error.main,
                pointerEvents: 'none',
              }}
            />
          </InputAdornment>
        ),
        ...(adornment
          ? {
              startAdornment: (
                <InputAdornment position="start" sx={{ pointerEvents: 'none', pl: 0.5 }}>
                  {adornment}
                </InputAdornment>
              ),
            }
          : {}),
        ...InputProps,
      }}
      hiddenLabel={hiddenLabel}
      multiline={multiline}
      fullWidth={fullWidth}
      label={label}
      variant="filled"
      required={required}
      inputRef={fieldRef}
      sx={[
        !!adornment && { '& input': { pl: 0 } },
        { '& .MuiInputBase-multiline': { px: 2 }, '& textarea': { px: 0 } },
        !!error && {
          '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` },
        },
        ...convertSxToArray(sx),
      ]}
    />
  );
};
