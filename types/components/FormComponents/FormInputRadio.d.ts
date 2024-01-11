import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { WithSx } from '@types';
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
export declare const FormInputRadio: <T extends FieldValues>({
  name,
  control,
  label,
  options,
  customRadioLabelRender,
  isDisabled,
  orientation,
  sx,
  labelSx,
}: FormInputRadioProps<T>) => JSX.Element;
export {};
