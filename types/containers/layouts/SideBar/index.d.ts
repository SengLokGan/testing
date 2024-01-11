/// <reference types="react" />
import { WithSx } from '@types';
import type { SidebarMenuProps } from './components/SidebarMenu';
export type SideBarProps = WithSx<SidebarMenuProps>;
export declare const SideBar: ({ items, sx }: SideBarProps) => JSX.Element;
