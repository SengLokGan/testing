import { PropsWithChildren, ReactNode } from 'react';
import type { WithSx } from '@types';
import { DrawerStatus, DrawerAnchor } from '@enums';
export type DrawerProps = PropsWithChildren<
  WithSx<{
    title: string;
    collapsable?: boolean;
    status: DrawerStatus;
    nextStatus: DrawerStatus;
    anchor?: DrawerAnchor;
    onChangeStatus?: (status: DrawerStatus) => void;
    footerChildren?: ReactNode;
    index?: number;
  }>
>;
export declare const Drawer: ({
  status,
  title,
  sx,
  footerChildren,
  collapsable,
  anchor,
  onChangeStatus,
  nextStatus,
  children,
  index,
  ...props
}: DrawerProps) => JSX.Element;
