import uniqid from 'uniqid';
import React, { ReactNode, SyntheticEvent, useCallback } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
import { AutocompleteFreeSoloAsync } from '@components/autocompletes/AutocompleteFreeSoloAsync/AutocompleteFreeSoloAsync';
import type { AutocompleteFreeSoloAsyncOptionType } from '@types';
import { UseFormTrigger } from 'react-hook-form/dist/types/form';
import { InputTextType } from '@enums';

export type FormAutocompleteFreeSoloAsyncProps<T extends FieldValues> = WithSx<{
  getOptionsUrl: string;
  trigger: UseFormTrigger<any>;
  textType?: InputTextType;
  required?: boolean;
  isDisabled?: boolean;
  label?: string;
  groupBy?: (option: AutocompleteFreeSoloAsyncOptionType) => string;
  changeTransformCallback?: (
    value: string | AutocompleteFreeSoloAsyncOptionType | null,
    options: AutocompleteFreeSoloAsyncOptionType[],
    event: SyntheticEvent<Element, Event>,
  ) => string | AutocompleteFreeSoloAsyncOptionType | null;
  capitalizedLabel?: boolean;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  rules?: { [key: string]: (data: { value: string; label: string }) => boolean | string | undefined };
  optionsTransform?: (options: any) => any;
}> &
  Omit<UseControllerProps<T>, 'rules'>;

export const FormAutocompleteFreeSoloAsync = <T extends FieldValues>({
  label,
  getOptionsUrl,
  required,
  isDisabled,
  groupBy,
  textType,
  trigger,
  sx,
  InputProps,
  changeTransformCallback,
  optionsTransform,
  rules = {},
  capitalizedLabel,
  ...props
}: FormAutocompleteFreeSoloAsyncProps<T>) => {
  const renderOptionCallback = useCallback((props, option) => {
    return (
      <li {...props} key={uniqid()} data-testid={'autocompleteFreeSoloAsyncOption'}>
        {option.label || option.id}
      </li>
    );
  }, []);

  return (
    <Controller
      {...props}
      rules={{ validate: rules }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        const onChangeProxy = (...data) => {
          onChange(...data);
          trigger(props.name);
        };

        return (
          <AutocompleteFreeSoloAsync
            getOptionsUrl={getOptionsUrl}
            optionsTransform={optionsTransform}
            value={getAutocompleteFreeSoloAsyncOptionType(value)}
            label={label}
            name={props.name}
            textType={textType}
            required={required}
            isDisabled={isDisabled}
            onChange={onChangeProxy}
            error={error}
            changeTransformCallback={changeTransformCallback}
            groupBy={groupBy}
            sx={sx}
            InputProps={InputProps}
            capitalizedLabel={capitalizedLabel}
            renderOptionCallback={renderOptionCallback}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};

const getAutocompleteFreeSoloAsyncOptionType = (value) => {
  return typeof value === 'string' ? { label: value, value } : value;
};
