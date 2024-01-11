import { WithSx } from '@types';
import { PropsWithChildren } from 'react';
import { convertSxToArray } from '@utils/converters/mui';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import Tooltip from '@mui/material/Tooltip';

type IconWithTooltipProps = PropsWithChildren<
  WithSx<{
    title?: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    iconColor: string;
  }>
>;
export const IconWithTooltip = ({ title = '', icon: Icon, iconColor, sx = [] }: IconWithTooltipProps) => {
  return (
    <Tooltip title={title} sx={[iconColor && { color: iconColor }, ...convertSxToArray(sx)]} enterTouchDelay={0}>
      <Icon fontSize="small" />
    </Tooltip>
  );
};
