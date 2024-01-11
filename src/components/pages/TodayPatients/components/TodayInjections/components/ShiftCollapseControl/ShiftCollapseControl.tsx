import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

type ShiftCollapseControlProps = {
  isOpened: boolean;
  shiftId: number;
  shiftName: string;
  onClick: (shiftId: number) => void;
};

export const ShiftCollapseControl = ({ isOpened, shiftId, shiftName, onClick }: ShiftCollapseControlProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={(theme) => ({
        width: 1,
        p: 2,
        cursor: 'pointer',
        backgroundColor: isOpened ? 'rgba(0, 99, 153, 0.08)' : theme.palette.surface.default,
      })}
      onClick={() => onClick(shiftId)}
    >
      <IconButton
        sx={{
          mr: 2,
          width: 40,
          height: 40,
          backgroundColor: isOpened ? 'rgba(0, 99, 153, 0.16)' : 'transparent',
          '&:hover': { backgroundColor: 'transparent' },
        }}
      >
        <ChevronRightIcon
          sx={{
            transform: isOpened ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
            transition: '.3s',
          }}
        />
      </IconButton>
      <Typography
        variant="headerM"
        sx={(theme) => ({
          color: isOpened ? theme.palette.primary.main : theme.palette.text.primary,
        })}
      >
        {shiftName}
      </Typography>
    </Stack>
  );
};
