import { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox } from '@mui/material';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';

export type FormInputCheckboxProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  isDisabled?: boolean;
  required?: boolean;
}> &
  UseControllerProps<T>;

export const FormInputCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  isDisabled = false,
  required,
  rules = {},
  sx = [],
}: FormInputCheckboxProps<T>) => {
  return (
    <FormControl
      component="fieldset"
      required={required}
      sx={[
        {
          alignItems: 'flex-start',
        },
        ...convertSxToArray(sx),
      ]}
    >
      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={onChange}
                onBlur={onBlur}
                checked={value}
                disabled={isDisabled}
                // @ts-ignore
                inputProps={{ 'data-testid': `${name}Checkbox` }}
                sx={{
                  py: 0,
                  '&:not(.Mui-disabled)': {
                    svg: {
                      color: (theme) => theme.palette.primary.main,
                    },
                  },
                }}
                inputRef={ref}
              />
            }
            label={label}
          />
        )}
      />
    </FormControl>
  );
};
