import React from 'react';
import { PhoneInput } from '@src/components';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { WithSx } from '@types';

export type FormPhoneInputProps<T extends FieldValues> = WithSx<{
  phoneCode: string;
  codeName: any;
  register: UseFormRegister<T>;
}> &
  UseControllerProps<T>;

export const FormPhoneInput = <T extends FieldValues>({
  phoneCode,
  codeName,
  register,
  sx = [],
  ...props
}: FormPhoneInputProps<T>) => {
  const { onChange: onChangeCode } = register(codeName);

  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <PhoneInput
          sx={sx}
          code={phoneCode}
          number={value}
          onBlur={onBlur}
          error={error?.message}
          onChangeCode={onChangeCode}
          codeName={codeName}
          onChange={onChange}
          dataTestId={`${props.name}PhoneInput`}
          fieldRef={ref}
        />
      )}
    />
  );
};
