import { PropsWithChildren } from 'react';
import { WithSx } from '@src/types';
type AdministrationLayoutProps = WithSx<
  PropsWithChildren<{
    navigateBackIcon?: boolean;
  }>
>;
export declare const AdministrationLayout: ({
  children,
  navigateBackIcon,
  sx,
}: AdministrationLayoutProps) => JSX.Element;
export {};
