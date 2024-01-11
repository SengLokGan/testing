import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { TreatmentInfo } from '@types';
import { useTranslation } from 'react-i18next';
import { treatmentInfoFields } from '@constants';
import Stack from '@mui/material/Stack';
import { StyledPatientRowStack } from '@components';
import Typography from '@mui/material/Typography';
import { getPersonNameWithDeletedSyfix, getTimeFromDate } from '@utils';

type TreatmentInfoProps = {
  treatmentInfo: TreatmentInfo;
};

export const TreatmentInfoView = ({ treatmentInfo }: TreatmentInfoProps) => {
  const { t } = useTranslation('patient');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const showFieldValue = (field: string) => {
    switch (field) {
      case 'comments':
        return (
          <Typography variant="labelM" sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {treatmentInfo?.comments?.length ? treatmentInfo.comments?.replace(/\\n/g, '\n') : '—'}
          </Typography>
        );
      case 'ambulant':
        return <Typography variant="labelM">{t(treatmentInfo?.isAmbulant ? 'profile.yes' : 'profile.no')}</Typography>;
      case 'personInCharge':
      case 'nephrologist':
        return <Typography variant="labelM">{treatmentInfo?.[field]?.name}</Typography>;
      case 'primaryNurse':
        return <Typography variant="labelM">{getPersonNameWithDeletedSyfix(treatmentInfo?.[field]) || '—'}</Typography>;
      case 'firstDialysis':
        return <Typography variant="labelM">{getTimeFromDate(treatmentInfo?.firstDialysis, 'd') ?? '—'}</Typography>;
      case 'firstCenterDialysis':
        return (
          <Typography variant="labelM">{getTimeFromDate(treatmentInfo?.firstCenterDialysis, 'd') ?? '—'}</Typography>
        );
      case 'referralInfo':
        return (
          <Typography variant="labelM">
            {treatmentInfo?.referralInfo?.status
              ? `${treatmentInfo?.referralInfo?.clinic}, ${treatmentInfo?.referralInfo?.doctor?.name}`
              : t('profile.no')}
          </Typography>
        );
      default:
        return (
          <Typography variant="labelM" sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {treatmentInfo?.[field] ? treatmentInfo?.[field] : '—'}
          </Typography>
        );
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      {treatmentInfoFields.map((field) => (
        <StyledPatientRowStack
          direction="row"
          spacing={2}
          key={field}
          sx={[
            isXs && {
              flexWrap: 'wrap',
              '& > :first-child': { flexBasis: '100%', textAlign: 'start' },
              '& > :last-child': { flexBasis: '100%', ml: 0 },
            },
          ]}
        >
          <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
          {showFieldValue(field)}
        </StyledPatientRowStack>
      ))}
    </Stack>
  );
};
