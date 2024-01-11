/// <reference types="react" />
import { WithSx } from '@types';
import { MenuItemProps } from './SidebarMenuItem';
export type SidebarMenuProps = WithSx<{
  items: MenuItemProps[];
}>;
export declare const SidebarMenu: ({ items, sx }: SidebarMenuProps) => JSX.Element;
