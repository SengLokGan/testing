/// <reference types="react" />
import { WithSx } from '@types';
type GlobalAddButtonProps = WithSx<{
  onClick: () => void;
  isDisabled?: boolean;
}>;
export declare const GlobalAddButton: ({ onClick, isDisabled, sx }: GlobalAddButtonProps) => JSX.Element;
export {};
