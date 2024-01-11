/// <reference types="react" />
import type { WithSx } from '@types';
type BaseProgressBarProps = WithSx<{
  current: number;
  label: string;
  finished?: boolean;
}>;
export declare const BaseProgressBar: ({ current, label, finished, sx }: BaseProgressBarProps) => JSX.Element;
export {};
