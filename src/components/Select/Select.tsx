import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalizeFirstLetter } from '../../utils';
import TextField from '@mui/material/TextField';
import { ChangeEvent, Fragment } from 'react';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';
import uniqid from 'uniqid';

export type SelectOptionProps = {
  label: string;
  value: string;
  group?: string;
};

type SelectProps = WithSx<{
  value: string[] | null | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  options: SelectOptionProps[];
  capitalizedLabel?: boolean;
  name: string;
  label: string;
  multiple?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  error?: string;
  onBlur?: () => void;
}>;

export const Select = ({
  value,
  handleChange,
  required,
  options,
  capitalizedLabel = true,
  name,
  label,
  multiple,
  fullWidth,
  isDisabled,
  error,
  sx,
  onBlur,
}: SelectProps) => {
  const generateOptions = () => {
    if (options.length === 0) {
      return <CircularProgress size="20px" color="inherit" />;
    }

    if (options[0]?.group) {
      const optionsGroups = options.reduce((acc, option) => {
        if (acc[option.group!]) {
          acc[option.group!].push(option);
        } else {
          acc[option.group!] = [option];
        }
        return acc;
      }, {});

      return Object.keys(optionsGroups).map((group) => {
        return (
          <Fragment key={uniqid()}>
            <ListSubheader>{group}</ListSubheader>
            {optionsGroups[group].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {capitalizedLabel && option.label ? capitalizeFirstLetter(option.label) : option.label}
              </MenuItem>
            ))}
          </Fragment>
        );
      });
    }

    return options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {capitalizedLabel && option.label ? capitalizeFirstLetter(option.label) : option.label}
      </MenuItem>
    ));
  };

  return (
    <TextField
      select
      fullWidth={fullWidth}
      label={label}
      onChange={handleChange}
      value={value}
      disabled={isDisabled}
      inputProps={{ 'data-testid': `${name}SelectInput` }}
      helperText={error || null}
      error={!!error}
      variant="filled"
      SelectProps={{
        multiple,
        MenuProps: {
          sx: [options.length === 0 && { '& .MuiMenu-list': { display: 'flex', justifyContent: 'center' } }],
        },
      }}
      sx={convertSxToArray(sx)}
      required={required}
      onBlur={onBlur}
    >
      {generateOptions()}
    </TextField>
  );
};
