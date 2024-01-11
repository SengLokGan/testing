/// <reference types="react" />
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { ViewPermissions } from '@enums';
export type MenuItemProps = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  path: string;
  basePath?: string;
  viewPermissions?: ViewPermissions[];
};
export type SidebarMenuItemProps = {
  item: MenuItemProps;
  userId?: string;
};
export declare const SidebarMenuItem: ({ userId, item }: SidebarMenuItemProps) => JSX.Element;
