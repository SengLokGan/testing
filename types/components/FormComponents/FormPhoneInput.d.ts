/// <reference types="react" />
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { WithSx } from '@types';
export type FormPhoneInputProps<T extends FieldValues> = WithSx<{
  phoneCode: string;
  codeName: any;
  register: UseFormRegister<T>;
}> &
  UseControllerProps<T>;
export declare const FormPhoneInput: <T extends FieldValues>({
  phoneCode,
  codeName,
  register,
  sx,
  ...props
}: FormPhoneInputProps<T>) => JSX.Element;
