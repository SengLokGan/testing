import { WithSx } from '@types';
import { PropsWithChildren } from 'react';
type InfoCardProps = PropsWithChildren<
  WithSx<{
    title?: string | null;
  }>
>;
export declare const InfoCard: ({ title, children, sx }: InfoCardProps) => JSX.Element;
export {};
