import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { WithSx } from '@types';
import { Card } from './Card';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { IconColors, UserPermissions } from '@enums';
import { convertSxToArray } from '@utils/converters/mui';
import { Link } from 'react-router-dom';
import { selectUserPermissions } from '@store/slices';

type StackBlockProps = WithSx<{
  title?: string;
  iconColor?: IconColors;
  cards: {
    id: number;
    title: string;
    label?: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    link: string;
    permission?: UserPermissions;
    iconColor?: IconColors;
    active?: boolean;
  }[];
}>;

export const StackBlock = ({ title, cards, iconColor = IconColors.blue, sx = [] }: StackBlockProps) => {
  const userPermissions = selectUserPermissions();

  return (
    <Box sx={convertSxToArray(sx)}>
      {title && (
        <Typography sx={{ margin: ({ spacing }) => spacing(3, 0) }} variant="headerM">
          {title}
        </Typography>
      )}
      <Grid container spacing={2}>
        {!!cards.length &&
          cards.map((card) => {
            if (card.permission && !userPermissions.includes(card.permission)) return null;
            if (card?.active === false) return null;

            return (
              <Grid key={card.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Link to={card.link}>
                  <Card
                    title={card.title}
                    icon={card.icon}
                    iconColor={card.iconColor || iconColor}
                    label={card.label}
                    sx={{ transition: '.3s', '&:hover': { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16);' }, height: 1 }}
                  />
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
