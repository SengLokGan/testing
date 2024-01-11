import { WithSx } from '@types';
import IconButton from '@mui/material/IconButton';
import { convertSxToArray } from '@utils/converters';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';
import { alpha, Backdrop, Stack } from '@mui/material';
import { Chip } from '@components/Chip/Chip';
import { ChipColors, ChipVariants } from '@enums';

type GlobalAddButtonWithChipsProps = WithSx<{
  onChipClick: (value: any) => void;
  chips: { label: string; value?: string }[];
  disabled?: boolean;
}>;

export const GlobalAddButtonWithChips = ({
  onChipClick,
  chips,
  disabled = false,
  sx = [],
}: GlobalAddButtonWithChipsProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Backdrop
        data-testid="globalAddButtonBackDropId"
        sx={{ bgcolor: 'rgba(0, 0, 0, .2)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isActive}
        onClick={() => setIsActive(false)}
      >
        {!!chips.length && (
          <Stack
            direction="column"
            spacing={1}
            alignItems="flex-end"
            sx={[
              (theme) => ({
                position: 'fixed',
                right: theme.spacing(3),
                bottom: theme.spacing(12),
              }),
            ]}
          >
            {chips.map(({ label, value }) => (
              <Chip
                onClick={() => onChipClick(value ? value : label)}
                key={label}
                label={label}
                variant={ChipVariants.fill}
                color={ChipColors.primary}
              />
            ))}
          </Stack>
        )}
      </Backdrop>
      <IconButton
        data-testid="globalAddButtonId"
        onClick={() => setIsActive((prevState) => !prevState)}
        disabled={disabled}
        sx={[
          (theme) => ({
            p: 2,
            bgcolor: isActive ? theme.palette.text.black : theme.palette.primary.main,
            position: 'fixed',
            right: theme.spacing(3),
            bottom: theme.spacing(3.125),
            boxShadow: '0 3px 6px 1px rgba(0, 51, 81, 0.2)',
            zIndex: theme.zIndex.modal,
            transition: 'background-color, .3s',
            transform: `${isActive ? 'rotate(45deg)' : 'rotate(0deg)'}`,
            '& .MuiSvgIcon-root': {
              color: disabled ? theme.palette.neutral[60] : '#ffffff',
            },
            '&.Mui-disabled': {
              bgcolor: alpha(theme.palette.neutral.dark, 0.08),
            },
            '&:hover': {
              bgcolor: disabled
                ? theme.palette.neutral[60]
                : isActive
                ? theme.palette.text.black
                : theme.palette.primary[50],
            },
          }),
          ...convertSxToArray(sx),
        ]}
      >
        <AddOutlinedIcon />
      </IconButton>
    </>
  );
};
