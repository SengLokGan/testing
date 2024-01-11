import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { NeedleSize } from '@enums';
import { getCodeValueFromCatalog } from '@utils';

type NeedleSizeRadioLabelProps = {
  label: string;
};

export const NeedleSizeRadioLabel = ({ label }: NeedleSizeRadioLabelProps) => {
  const { t } = useTranslation('patient');

  let labelSubText = '';
  let color = '';
  switch (label) {
    case NeedleSize.Gauge17:
      labelSubText = t('modal.300MlMin');
      color = '#F47820';
      break;
    case NeedleSize.Gauge16:
      labelSubText = t('modal.300350MlMin');
      color = '#7CC78F';
      break;
    case NeedleSize.Gauge15:
      labelSubText = t('modal.350450MlMin');
      color = '#E0C222';
      break;
    case NeedleSize.Gauge14:
      labelSubText = t('modal.450MlMin');
      color = '#6A6EB3';
      break;
  }

  return (
    <Box sx={{ display: 'flex', width: 1, justifyContent: 'space-between' }}>
      <Typography variant="labelL">{getCodeValueFromCatalog('needleSizes', label)}</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="paragraphM">{labelSubText}</Typography>
        <Box sx={(theme) => ({ width: theme.spacing(2), height: theme.spacing(2), bgcolor: color })} />
      </Stack>
    </Box>
  );
};
