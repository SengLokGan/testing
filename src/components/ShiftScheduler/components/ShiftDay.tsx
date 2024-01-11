import { PropsWithChildren, useCallback } from 'react';
import { DaysOfWeek } from '@enums';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type ShiftDayProps = PropsWithChildren<{
  name: string;
  shiftId: number;
  shiftName: string;
  day: DaysOfWeek;
  available: boolean;
  selected: boolean;
  onClick: (shiftId: number, shiftName: string, day: DaysOfWeek) => void;
  onHover: (shiftId: number | null, day: DaysOfWeek | null) => void;
}>;

const ShiftDay = ({
  name,
  available,
  shiftId,
  shiftName,
  day,
  selected,
  onHover,
  onClick,
  children,
}: ShiftDayProps) => {
  const onClickProxy = useCallback(() => {
    onClick(shiftId, shiftName, day);
  }, []);

  const onMouseEnterProxy = useCallback(() => {
    onHover(shiftId, day);
  }, []);

  const onMouseLeaveProxy = useCallback(() => {
    onHover(null, null);
  }, []);

  return (
    <Button
      data-testid={`shiftSchedulerDay-${name}`}
      onClick={onClickProxy}
      onMouseEnter={onMouseEnterProxy}
      onMouseLeave={onMouseLeaveProxy}
      sx={[
        ({ palette, spacing }) => ({
          position: 'relative',
          width: '1',
          maxWidth: spacing(5),
          minWidth: spacing(5),
          height: spacing(5),
          '.MuiSvgIcon-root': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: selected && available ? 1 : 0,
            transition: '.3s',
            fill: palette.text.white,
          },
          '.MuiTypography': {
            opacity: selected && available ? 0 : 1,
            transition: '.3s',
          },
          '&:hover': {
            background: palette.primary.main,
            '.MuiSvgIcon-root': {
              opacity: 1,
            },
            '.MuiTypography': {
              opacity: 0,
            },
          },
        }),
        available && {
          background: (theme) => theme.palette.primary[selected ? 'main' : 'light'],
          borderRadius: (theme) => theme.spacing(40),
        },
        !available && {
          pointerEvents: 'none',
        },
      ]}
      disabled={!available}
    >
      <Typography className="shiftDay" variant="labelM" sx={[available && { fontWeight: 'bold' }]}>
        {children}
      </Typography>
      <CheckBoxIcon />
    </Button>
  );
};

export default ShiftDay;
