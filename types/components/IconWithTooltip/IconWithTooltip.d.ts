import { WithSx } from '@types';
import { PropsWithChildren } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
type IconWithTooltipProps = PropsWithChildren<
  WithSx<{
    title?: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    iconColor: string;
  }>
>;
export declare const IconWithTooltip: ({ title, icon: Icon, iconColor, sx }: IconWithTooltipProps) => JSX.Element;
export {};
