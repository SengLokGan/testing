import Chip, { ChipProps } from '@mui/material/Chip';
import { Virus } from '@enums';
import { styled } from '@mui/material/styles';

interface StyledVirologyChipProps extends ChipProps {
  name: Virus;
}

const getBgColor = (name: Virus) => {
  if (name === Virus.Hbsag) return '#FFD6FF';
  if (name === Virus.Anti_Hcv) return '#FFD9E5';
  return '#FFDAD2';
};

const getColor = (name: Virus) => {
  if (name === Virus.Hbsag) return '#9036A2';
  if (name === Virus.Anti_Hcv) return '#AD236C';
  return '#9C432E';
};

export const StyledVirologyChip = styled(Chip)<StyledVirologyChipProps>(({ theme, name }) => ({
  backgroundColor: getBgColor(name),
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    fontSize: theme.typography.labelL.fontSize,
    color: getColor(name),
  },
}));
