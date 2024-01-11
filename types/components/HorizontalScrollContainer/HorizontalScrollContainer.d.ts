import type { WithSx } from '@types';
import type { PropsWithChildren } from 'react';
type HorizontalScrollContainerProps = WithSx<
  PropsWithChildren<{
    nowrap?: boolean;
  }>
>;
export declare const HorizontalScrollContainer: ({
  nowrap,
  sx,
  children,
}: HorizontalScrollContainerProps) => JSX.Element;
export {};
