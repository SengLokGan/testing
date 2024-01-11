import { PropsWithChildren } from 'react';
import type { BoxProps } from '@mui/material/Box';
import { WithSx } from '@types';
type MainContentContainerProps = WithSx<
  PropsWithChildren<{
    fullHeight?: boolean;
    component?: BoxProps['component'];
    testId?: string;
  }>
>;
export declare const MainContentContainer: ({
  children,
  fullHeight,
  component,
  testId,
  sx,
}: MainContentContainerProps) => JSX.Element;
export {};
