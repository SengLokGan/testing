/// <reference types="react" />
import { WithSx } from '@types';
type GlobalAddButtonWithChipsProps = WithSx<{
  onChipClick: (value: any) => void;
  chips: {
    label: string;
    value?: string;
  }[];
  disabled?: boolean;
}>;
export declare const GlobalAddButtonWithChips: ({
  onChipClick,
  chips,
  disabled,
  sx,
}: GlobalAddButtonWithChipsProps) => JSX.Element;
export {};
