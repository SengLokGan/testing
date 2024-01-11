/// <reference types="react" />
import { WithSx } from '@types';
type Options = {
  id: string;
  name: string;
};
type CustomSelectProps = WithSx<{
  label: string;
  options: Options[];
  currentValue?: string;
  handleSelect: (value: string) => void;
  disabled?: boolean;
}>;
declare const CustomSelect: ({
  options,
  currentValue,
  label,
  handleSelect,
  disabled,
  sx,
}: CustomSelectProps) => JSX.Element;
export default CustomSelect;
