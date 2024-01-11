import { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { IconColors } from '@enums';
import { convertSxToArray } from '@utils/converters/mui';

type ReportCardProps = WithSx<{
  title: string;
  label?: string;
  iconColor: IconColors;
  icon: OverridableComponent<SvgIconTypeMap>;
}>;

export const Card = ({ title, label, icon: Icon, iconColor, sx = [] }: ReportCardProps) => {
  const getAvatarBgColor = (palette) => {
    switch (iconColor) {
      case IconColors.blue:
        return palette.primary.light;
      case IconColors.yellow:
        return '#E9EA3A';
      case IconColors.green:
        return '#83FAAE';
    }
  };

  const getIconColor = (palette) => {
    switch (iconColor) {
      case IconColors.blue:
        return palette.primary.main;
      case IconColors.yellow:
        return '#616200';
      case IconColors.green:
        return '#006D3C';
    }
  };
  return (
    <Paper
      sx={[
        ({ spacing }) => ({
          p: spacing(2),
          minHeight: spacing(14),
          minWidth: spacing(31.5),
          '&:hover': {
            cursor: 'pointer',
          },
        }),
        ...convertSxToArray(sx),
      ]}
    >
      <Stack height={1} direction="column" justifyContent="space-between" spacing={0.5}>
        <Avatar sx={{ bgcolor: ({ palette }) => getAvatarBgColor(palette), mb: 2 }}>
          <Icon sx={{ color: ({ palette }) => getIconColor(palette) }} />
        </Avatar>
        <Typography variant="headerS">{title}</Typography>
        {label && <Typography variant="labelM">{label}</Typography>}
      </Stack>
    </Paper>
  );
};
