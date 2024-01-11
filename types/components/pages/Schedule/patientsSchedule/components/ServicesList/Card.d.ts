import type { WithSx } from '@types';
import { PropsWithChildren } from 'react';
export type CardProps = WithSx<
  PropsWithChildren<{
    isActive: boolean;
  }>
>;
export declare const Card: ({ children, isActive, sx }: CardProps) => JSX.Element;
