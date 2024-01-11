import { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

type RadioButtonProps = {
  label: string;
  value: string | boolean;
  disabled?: boolean;
};

export type FormInputRadioProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode;
  options: RadioButtonProps[];
  orientation?: 'column' | 'row';
  labelOrientation?: 'column' | 'row';
  customRadioLabelRender?: (value: string, label: string) => ReactNode;
  isDisabled?: boolean;
  labelSx?: SxProps<Theme>;
}> &
  UseControllerProps<T>;

export const FormInputRadio = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  customRadioLabelRender,
  isDisabled,
  orientation = 'column',
  sx = [],
  labelSx = [],
}: FormInputRadioProps<T>) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        key={`radio-${singleOption.value}-key`}
        value={singleOption.value}
        sx={[
          {
            '& .MuiFormControlLabel-label': {
              width: 1,
            },
          },
          ...convertSxToArray(labelSx),
        ]}
        label={
          customRadioLabelRender && typeof singleOption.value === 'string' ? (
            customRadioLabelRender(singleOption.value, singleOption.label)
          ) : (
            <Typography
              variant="labelL"
              sx={(theme) => ({
                color: singleOption?.disabled || isDisabled ? theme.palette.neutral[60] : theme.palette.text.primary,
                maxWidth: 'content',
              })}
            >
              {singleOption.label}
            </Typography>
          )
        }
        disabled={singleOption?.disabled || isDisabled}
        control={
          <Radio
            sx={(theme) => ({
              '& svg': {
                color: singleOption?.disabled || isDisabled ? theme.palette.neutral[60] : theme.palette.primary.main,
              },
            })}
            inputProps={{ 'aria-label': `${singleOption.value}RadioButton` }}
          />
        }
        data-testid={`${singleOption.value}RadioButton`}
      />
    ));
  };

  return (
    <FormControl
      component="fieldset"
      sx={[
        {
          alignItems: 'flex-start',
        },
        ...convertSxToArray(sx),
      ]}
    >
      {label && (
        <FormLabel
          component="legend"
          sx={{ mb: 2, '&, &.Mui-focused': { color: (theme) => theme.palette.text.primary } }}
        >
          {typeof label === 'string' ? (
            <Typography variant="headerM" data-testid={`${label}RadioGroupLabel`}>
              {label}
            </Typography>
          ) : (
            label
          )}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <RadioGroup
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            sx={{ flexDirection: orientation }}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
