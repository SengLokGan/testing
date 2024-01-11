import { PropsWithChildren } from 'react';
import { WithSx } from '@types';
export type DrawerHeaderProps = PropsWithChildren<
  WithSx<{
    collapsable?: boolean;
    onShow?: () => void;
    onCollapse?: () => void;
    onClose?: () => void;
  }>
>;
declare const DrawerHeader: ({
  children,
  sx,
  collapsable,
  onShow,
  onClose,
  onCollapse,
  ...props
}: DrawerHeaderProps) => JSX.Element;
export default DrawerHeader;
