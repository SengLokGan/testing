import type { WithSx } from '@types';
import type { PropsWithChildren, ReactNode } from 'react';
type StatusMenuItemProps = WithSx<
  PropsWithChildren<{
    value: any;
    badge?: ReactNode;
    isSelected?: boolean;
    onClick: (payload: any) => void;
  }>
>;
export declare const StatusMenuItem: ({
  children,
  isSelected,
  value,
  badge,
  sx,
  onClick,
}: StatusMenuItemProps) => JSX.Element;
export {};
