import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ReactNode, Ref } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';
import { maxNumValue, minNumValue } from '@constants';

type NumberInputProps = WithSx<{
  onChange: (value: string) => void;
  onBlur: () => void;
  value: string;
  label?: string | ReactNode;
  required?: boolean;
  error?: FieldError;
  dataTestId?: string;
  fieldRef?: Ref<HTMLElement>;
  maxValue?: number;
  minValue?: number;
  withoutDisableMax?: boolean;
}>;

export const NumberInput = ({
  onChange,
  value,
  label,
  required,
  onBlur,
  error,
  dataTestId,
  fieldRef,
  maxValue,
  minValue,
  withoutDisableMax = false,
  sx = [],
}: NumberInputProps) => {
  const onTextFieldChange = ({ target: { value: newValue } }) => {
    const clearValue = newValue ? newValue.match(/\d/g).join('') : '';
    onChange(clearValue);
  };

  const increase = () => onChange(`${+value + 1}`);

  const decrease = () => {
    const decreaseValue = Number(value) - 1;
    decreaseValue >= 0 && onChange(`${decreaseValue}`);
  };

  return (
    <Stack direction="row" sx={convertSxToArray(sx)}>
      <Button
        onClick={decrease}
        variant={'outlined'}
        sx={(theme) => ({
          width: theme.spacing(5),
          minWidth: theme.spacing(5),
          height: theme.spacing(5),
          fontSize: theme.typography.headerM.fontSize,
          mt: 1,
          mr: 2,
        })}
        disabled={Number(value) < (minValue ? minValue + 1 : minNumValue)}
        onBlur={onBlur}
      >
        -
      </Button>
      <TextField
        variant="filled"
        label={label}
        required={required}
        onChange={onTextFieldChange}
        value={value}
        onBlur={() => {
          value.length === 0 && onChange('0');
          onBlur();
        }}
        helperText={error ? error.message : null}
        error={!!error}
        inputProps={{ 'data-testid': dataTestId, inputMode: 'numeric' }}
        inputRef={fieldRef}
      />
      <Button
        onClick={increase}
        variant={'outlined'}
        sx={(theme) => ({
          width: theme.spacing(5),
          minWidth: theme.spacing(5),
          height: theme.spacing(5),
          fontSize: theme.typography.headerM.fontSize,
          mt: 1,
          ml: 2,
        })}
        disabled={!withoutDisableMax && Number(value) > (maxValue ? maxValue - 1 : maxNumValue)}
        onBlur={onBlur}
      >
        +
      </Button>
    </Stack>
  );
};
