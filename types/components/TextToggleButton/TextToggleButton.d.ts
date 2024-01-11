/// <reference types="react" />
import { WithSx } from '@types';
type TextToggleButtonProps = WithSx<{
  value: string;
  title: string;
  badge?: string | number;
  isSelected: boolean;
  onChange: () => void;
}>;
export declare const TextToggleButton: ({
  value,
  onChange,
  isSelected,
  title,
  badge,
  sx,
}: TextToggleButtonProps) => JSX.Element;
export {};
