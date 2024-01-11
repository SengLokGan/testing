import { Ref } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { WithSx } from '@types';
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
export declare const PhoneInput: ({
  sx,
  code,
  number,
  onChange,
  onBlur,
  error,
  onChangeCode,
  codeName,
  dataTestId,
  fieldRef,
}: FormPhoneInputProps) => JSX.Element;
export {};
