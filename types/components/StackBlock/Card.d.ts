/// <reference types="react" />
import { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { IconColors } from '@enums';
type ReportCardProps = WithSx<{
  title: string;
  label?: string;
  iconColor: IconColors;
  icon: OverridableComponent<SvgIconTypeMap>;
}>;
export declare const Card: ({ title, label, icon: Icon, iconColor, sx }: ReportCardProps) => JSX.Element;
export {};
