/// <reference types="react" />
import { WithSx } from '@types';
import { ItemProps } from './MenuItem';
export type MenuProps = WithSx<{
  onClose: () => void;
  items: ItemProps[];
}>;
export declare const Menu: ({ items, onClose, sx }: MenuProps) => JSX.Element;
