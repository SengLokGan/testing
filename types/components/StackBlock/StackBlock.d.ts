/// <reference types="react" />
import { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { IconColors, UserPermissions } from '@enums';
type StackBlockProps = WithSx<{
  title?: string;
  iconColor?: IconColors;
  cards: {
    id: number;
    title: string;
    label?: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    link: string;
    permission?: UserPermissions;
    iconColor?: IconColors;
    active?: boolean;
  }[];
}>;
export declare const StackBlock: ({ title, cards, iconColor, sx }: StackBlockProps) => JSX.Element;
export {};
