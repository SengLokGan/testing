import { StyledStatusMenuItem } from '@components/pages/TodayPatients/components/StatusMenuItem/StatusMenuItem.styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';
import React from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

type StatusMenuItemProps = WithSx<
  PropsWithChildren<{
    value: any;
    badge?: ReactNode;
    isSelected?: boolean;
    onClick: (payload: any) => void;
  }>
>;

export const StatusMenuItem = ({
  children,
  isSelected = false,
  value,
  badge,
  sx = [],
  onClick,
}: StatusMenuItemProps) => {
  return (
    <StyledStatusMenuItem
      selected={isSelected}
      value={value}
      onClick={() => onClick(value)}
      sx={[{}, ...convertSxToArray(sx)]}
    >
      <>
        {children}
        {badge && (
          <Box
            data-testid="statusMenuItemBadge"
            sx={({ palette, spacing }) => ({
              bgcolor: palette.primary.main,
              borderRadius: spacing(12.5),
              padding: spacing(0, 0.75),
              ml: 1,
            })}
          >
            <Typography
              data-testid="textToggleButtonBadgeText"
              variant="labelM"
              sx={{ color: ({ palette }) => palette.text.white }}
            >
              {badge}
            </Typography>
          </Box>
        )}
      </>
    </StyledStatusMenuItem>
  );
};
