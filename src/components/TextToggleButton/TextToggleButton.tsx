import React from 'react';
import Typography from '@mui/material/Typography';
import { WithSx } from '@types';
import { StyledToggleButton } from './TextToggleButton.styles';
import Box from '@mui/material/Box';
import { convertSxToArray } from '@utils/converters/mui';

type TextToggleButtonProps = WithSx<{
  value: string;
  title: string;
  badge?: string | number;
  isSelected: boolean;
  onChange: () => void;
}>;

export const TextToggleButton = ({ value, onChange, isSelected, title, badge, sx = [] }: TextToggleButtonProps) => {
  return (
    <StyledToggleButton
      value={value}
      selected={isSelected}
      onChange={onChange}
      sx={convertSxToArray(sx)}
      data-testid={`${value}TextToggleButton`}
    >
      <Typography
        data-testid="textToggleButtonTitle"
        variant="labelM"
        sx={({ palette }) => ({
          color: isSelected ? palette.text.white : palette.primary.main,
        })}
      >
        {title}
      </Typography>
      {badge && (
        <Box
          data-testid="textToggleButtonBadge"
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
    </StyledToggleButton>
  );
};
