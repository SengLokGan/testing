/// <reference types="react" />
import { ChipColors, ChipVariants } from '@enums';
import type { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
type ChipProps = WithSx<{
  label: string;
  badge?: string | null;
  variant?: ChipVariants;
  color?: ChipColors;
  onClick?: () => void;
  LeftIcon?: OverridableComponent<SvgIconTypeMap> | null;
  RightIcon?: OverridableComponent<SvgIconTypeMap> | null;
  leftIconColor?: string;
  rightIconColor?: string;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  dataTestId?: string;
  className?: string;
}>;
export declare const Chip: ({
  label,
  badge,
  variant,
  color,
  className,
  onClick,
  LeftIcon,
  RightIcon,
  leftIconColor,
  rightIconColor,
  onLeftIconClick,
  onRightIconClick,
  dataTestId,
  sx,
}: ChipProps) => JSX.Element;
export {};
