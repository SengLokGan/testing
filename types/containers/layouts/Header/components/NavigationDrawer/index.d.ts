/// <reference types="react" />
import type { DrawerProps } from '@mui/material/Drawer';
import type { MenuProps } from './components/Menu';
import { WithSx } from '@types';
export type NavigationDrawerProps = WithSx<{
  isOpen: DrawerProps['open'];
}> &
  MenuProps;
export declare const NavigationDrawer: ({ isOpen, onClose, items, sx }: NavigationDrawerProps) => JSX.Element;
