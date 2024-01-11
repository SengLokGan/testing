/// <reference types="react" />
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
export type ItemProps = {
  id: string;
  name: string;
  isOpen: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
  link: string;
  permission: string;
  active?: boolean;
};
export type MenuItemProps = {
  onClose: () => void;
  item: ItemProps;
};
export declare const MenuItem: ({ item, onClose }: MenuItemProps) => JSX.Element | null;
