import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { AllergyIcon } from '@assets/icons';

type AllergyChipItemProps = {
  name: string;
};
export const AllergyChipItem = ({ name }: AllergyChipItemProps) => {
  return (
    <Chip
      icon={<AllergyIcon sx={{ fill: (theme) => theme.palette.error.main }} />}
      label={
        <Typography variant="labelS" sx={(theme) => ({ textTransform: 'capitalize', color: theme.palette.error.dark })}>
          {name}
        </Typography>
      }
      variant="outlined"
      size="small"
      sx={(theme) => ({
        borderColor: theme.palette.error[90],
        mb: 0.5,
        '& .MuiChip-icon': {
          fontSize: theme.typography.labelL.fontSize,
          color: theme.palette.error.main,
        },
      })}
    />
  );
};
