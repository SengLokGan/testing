import { ReactNode } from 'react';
import { WithSx } from '@types';
type DataRowProps = WithSx<{
  title: ReactNode;
  titleColor?: string;
  value: ReactNode;
  additionalValue?: ReactNode;
  skipEmpty?: boolean;
  isCompact?: boolean;
}>;
export declare const DataRow: ({
  title,
  titleColor,
  isCompact,
  value,
  additionalValue,
  skipEmpty,
  sx,
}: DataRowProps) => JSX.Element | null;
export {};
