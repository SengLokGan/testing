import type { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { PropsWithChildren } from 'react';
export type CardWithIconProps = WithSx<
  PropsWithChildren<{
    title: string;
    icon?: OverridableComponent<SvgIconTypeMap> | null;
    action?: OverridableComponent<any> | null;
    onIconClick?: () => void;
    onActionClick?: () => void;
    onAddContent?: () => void;
    addContentPermission?: boolean;
  }>
>;
export declare const CardWithIcon: ({
  icon: Icon,
  action: Action,
  title,
  onAddContent,
  addContentPermission,
  onIconClick,
  onActionClick,
  children,
  sx,
}: CardWithIconProps) => JSX.Element;
