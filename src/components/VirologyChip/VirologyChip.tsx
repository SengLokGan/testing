import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Virus } from '@enums';
import { StyledVirologyChip } from './VirologyChip.styles';

type VirologyChipProps = {
  name: Virus;
};

export const VirologyChip = ({ name }: VirologyChipProps) => {
  const { t } = useTranslation('patient');
  return (
    <StyledVirologyChip
      icon={<CoronavirusOutlinedIcon />}
      label={<Typography variant="labelS">{t(`profile.${name}`)}</Typography>}
      variant="filled"
      size="small"
      name={name}
    />
  );
};
